# type: ignore

from collections import defaultdict
from dataclasses import dataclass, asdict
import pandas as pd
from io import StringIO
from typing import Dict, List

@dataclass
class Error:
    code: str
    description: str
    affected_fields: List[str]

def get_file_type(df):
    if 'UPN' in df.columns:
        return 'Header'
    elif 'DECOM' in df.columns:
        return 'Episodes'

def read_csvs_from_text(raw_files: Dict[str, str]):
    files = {}
    for file_name, file in raw_files.items():
        csv_file = StringIO(file)
        df = pd.read_csv(csv_file)

        files[get_file_type(df)] = df

    return files

dfs = read_csvs_from_text(raw_files=uploaded_files.to_py())
    
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

tested_errors = [fake_error]
validated = [f(dfs) for f in tested_errors]

# Passed to JS
error_definitions = [asdict(e) for e, _ in validated]

errors = {file_name: defaultdict(list) for file_name in dfs}
for error, error_incidences in validated:
    for file_name, locations in error_incidences.items():
        for location in locations:
            errors[file_name][location].append(error.code)
