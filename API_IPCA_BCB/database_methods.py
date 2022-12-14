from ast import literal_eval

from datetime import datetime

from sqlalchemy import create_engine
from os.path import dirname,realpath,join

import json
import pandas as pd
import requests


DB_PATH = join(realpath(dirname(__file__)),'easy_ipca.db')
TABLE_NAME = 'IPCA_BACEN'

def get_interval_value_ipca(start_date, end_date):
    start_date = start_date.strftime('%Y-%m-%d')
    end_date = end_date.strftime('%Y-%m-%d')

    query = f"""
    SELECT DATA, VALOR FROM {TABLE_NAME} WHERE DATE(data) BETWEEN DATE('{start_date}') AND DATE('{end_date}');
    """

    engine = create_engine('sqlite:///%s' % DB_PATH, echo=False)
    df_ipca = pd.read_sql_query(query,con=engine)

    # Formatando campo data
    df_ipca['data'] = df_ipca.data.apply(lambda data : data[:7])

    # Inserindo index
    df_ipca['index'] = df_ipca.index.values + 1

    return df_ipca 


def get_ipca_bacen():
    output_ipca_bc = requests.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json&dataInicial=01/01/2000&dataFinal=31/12/2100')
    data_ipca_bc = literal_eval(output_ipca_bc.content.decode('UTF-8'))
    json_ipca_bc = json.dumps(data_ipca_bc, indent=4, sort_keys=True)
    df_ipca_bc = pd.read_json(json_ipca_bc)
    # Inserindo a campo chave
    df_ipca_bc['chave'] = df_ipca_bc.data.apply(lambda data : datetime.strptime(data,'%d/%m/%Y').strftime('%Y%m%d'))
    # Formatando Data
    df_ipca_bc['data'] = df_ipca_bc.data.apply(lambda data : datetime.strptime(data,'%d/%m/%Y').strftime('%Y-%m-%d'))
    return  df_ipca_bc
    
def get_total_ipca_bacen():
    query = f"""
    select SUM(valor) AS TOTAL_ACUMULADO from  {TABLE_NAME};
    """

    engine = create_engine('sqlite:///%s' % DB_PATH, echo=False)
    df_ipca = pd.read_sql_query(query,con=engine)

    return round(df_ipca.iloc[0,0],2)

def updata_database(df_ipca_bc):
    engine = create_engine('sqlite:///%s' % DB_PATH, echo=False)
    df_ipca_bc.to_sql(TABLE_NAME, con=engine, if_exists='replace',index=False)