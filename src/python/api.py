# type: ignore

import xml.etree.ElementTree as ET
import pandas as pd
import numpy as np
from collections import defaultdict
from dataclasses import dataclass, asdict
from io import StringIO
from typing import Dict, List

@dataclass
class Error:
    code: str
    description: str
    affected_fields: List[str]

class UploadException(Exception):
    pass

def get_file_type(df):
    if 'UPN' in df.columns:
        return 'Header'
    elif 'DECOM' in df.columns:
        return 'Episodes'
    elif 'DUC' in df.columns:
        return 'UASC'
    elif 'REVIEW' in df.columns:
        return 'Reviews'

def read_csvs_from_text(raw_files: List):
    files = {}
    for file_data in raw_files:
        csv_file = StringIO(file_data["fileText"])
        df = pd.read_csv(csv_file)

        files[get_file_type(df)] = df

    return files

def read_xml_from_text(xml_string):
    header = ['CHILD', 'SEX', 'DOB', 'ETHNIC', 'UPN', 'MOTHER', 'MC_DOB']
    episodes = ['CHILD', 'DECOM', 'RNE', 'LS', 'CIN', 'PLACE', 'PLACE_PROVIDER', 'DEC', 'REC', 'REASON_PLACE_CHANGE', 'HOME_POST', 'PL_POST', 'URN']
    uasc = ['CHILD', 'SEX', 'DOB', 'DUC']

    header_df = []
    episodes_df = []
    uasc_df = []

    def read_data(table):
        # The CHILDID tag needs to be renamed to CHILD to match the CSV
        return  {
            (node.tag if node.tag != 'CHILDID' else 'CHILD'): node.text 
            for node in table.iter() if len(node) == 0
        }

    for child in ET.fromstring(xml_string):
        all_data = read_data(child)
        header_df.append(pd.Series({k: all_data.get(k, None) for k in header}))
        if all_data.get('DUC', None) is not None:
            uasc_df.append(pd.Series({k: all_data.get(k, None) for k in uasc}))
        for table in child:
            if table.tag == 'EPISODE':
                data = read_data(table)
                episodes_df.append(pd.Series({k: {**all_data, **data}.get(k, None) for k in episodes}))

    return {
        'Header': pd.DataFrame(header_df),
        'Episodes': pd.DataFrame(episodes_df),
        'UASC': pd.DataFrame(uasc_df),
    }

def read_from_text(raw_files):
    if len(raw_files) == 0:
        raise UploadException('No files uploaded!')

    extensions = list(set([f["name"][-3:].lower() for f in raw_files]))
    if len(extensions) != 1:
        raise UploadException(f'Mix of CSV and XML files found ({extensions})! Please reupload.')
    else:
        if extensions[0] == 'csv':
            return read_csvs_from_text(raw_files)
        elif extensions[0] == 'xml':
            if len(raw_files) != 1:
                raise UploadError('Only reading from a single XML file is supported.')
            return read_xml_from_text(raw_files[0]['fileText'])
        else:
            raise UploadException(f'Unknown file type {extensions[0]} found.')

dfs = read_from_text(raw_files=uploaded_files.to_py())
    
js_files = {k: [t._asdict() for t in df.itertuples(index=True)] for k, df in dfs.items()}

def fake_error(dfs):
    error = Error(
        code='1003',
        description='A fake error that fires if the child was born prior to 2006',
        affected_fields=['DOB'],
    )

    header = dfs['Header']
    mask = pd.to_datetime(header['DOB'], format='%d/%m/%Y').dt.year <= 2006
    
    return error, {'Header': header.index[mask].values}

def fake_error2(dfs):
    error = Error(
        code='2020',
        description='A fake error that fires if the child has a postcode containing F.',
        affected_fields=['HOME_POST'],
    )

    df = dfs['Episodes']
    mask = df['HOME_POST'].str.contains('F')
    
    return error, {'Episodes': df.index[mask].values}

tested_errors = [fake_error, fake_error2]
validated = [f(dfs) for f in tested_errors]

# Passed to JS
error_definitions = {e.code: asdict(e) for e, _ in validated}

errors = {file_name: defaultdict(list) for file_name in dfs}
for error, error_incidences in validated:
    for file_name, locations in error_incidences.items():
        for location in locations:
            errors[file_name][int(location)].append(error.code)
