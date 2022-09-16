from datetime import datetime
from dateutil.relativedelta import relativedelta

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

import base64
import database_methods
import json
import matplotlib.pyplot as plt
from os import remove
import pandas as pd


origins = [
    "http://localhost",
    "http://localhost:5173",
]


class Item(BaseModel):
    name: str
    price: float

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ipca_bcb")
async def get_ipca_accumulated(
  data_inicial: str = Query(description='Informar data no pradão dd/mm/aaaa.'),
  data_final: str = Query(description='Informar data no pradão dd/mm/aaaa.'),
  format : str = Query('json',description='Os formatos disponíveis são: json, xlsx e lineplot')
  ):
  
  try: start_date = datetime.strptime(data_inicial,'%d/%m/%Y').date()
  except ValueError: raise HTTPException(status_code=404, detail="data_inicial inválida!")
  
  try: end_date = datetime.strptime(data_final,'%d/%m/%Y').date()
  except ValueError: raise HTTPException(status_code=404, detail="data_final inválida!")

  if not relativedelta(start_date,end_date).years == 0: # Intervalo de no máximo 1 ano.
    raise HTTPException(status_code=404, detail="Intervalo Inválido! Favor informar o intervalo máximo de 1 ano.")
  
  df_ipca = database_methods.get_interval_value_ipca(start_date, end_date)
  
  if format == 'json':

    # Formatando campo data
    df_ipca['data'] = df_ipca.data.apply(lambda data : data[:7])


    total = df_ipca.valor.sum()
    row = pd.Series({'data':'Total Acumulado','valor':total})
    df_ipca.loc[df_ipca.shape[0]] = row
    ipca_data_json =  df_ipca.to_json(orient="records")
    ipca_data_json = json.dumps(json.loads(ipca_data_json))
    output = ipca_data_json


  elif format == 'xlsx':
  
    output = 'futuramente será um arquivo xlsx'
  

  return output


@app.put("/ipca_bcb")
async def update_ipca_bsb():
    df_ipca_bc = database_methods.get_ipca_bacen()
    database_methods.updata_database(df_ipca_bc)
    data_ultima_atualizacao = df_ipca_bc.data.max()
    data_ultima_atualizacao = datetime.strptime(data_ultima_atualizacao,'%Y-%m-%d').strftime('%d/%m/%Y')
    return f"Última atualização do IPCA feita pelo BCB foi em: {data_ultima_atualizacao}"



