# type: ignore

import pandas as pd
from io import StringIO

def get_file_type(df):
    if 'UPN' in df.columns:
        return 'Header'
    elif 'DECOM' in df.columns:
        return 'Episodes'

files = {}

for file_name, file in uploaded_files.to_py().items():
    csv_file = StringIO(file)
    df = pd.read_csv(csv_file)

    files[get_file_type(df)] = df
    
js_files = {k: [t._asdict() for t in df.itertuples(index=True)] for k, df in files.items()}
js_files