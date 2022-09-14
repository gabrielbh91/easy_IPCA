from datetime import datetime
from dateutil.relativedelta import relativedelta

from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel

import database_methods

app = FastAPI()


@app.post("/IPCA_BACEN")
async def get_ipca_accumulated(
  data_inicial: str = Query(description='Informar data no pradão dd/mm/aaaa.'),
  data_final: str = Query(description='Informar data no pradão dd/mm/aaaa.')
  ):
  
  try: start_date = datetime.strptime(data_inicial,'%d/%m/%Y').date()
  except ValueError: raise HTTPException(status_code=404, detail="data_inicial inválida!")
  
  try: end_date = datetime.strptime(data_final,'%d/%m/%Y').date()
  except ValueError: raise HTTPException(status_code=404, detail="data_final inválida!")

  if not relativedelta(start_date,end_date).years == 0: # Intervalo de no máximo 1 ano.
    raise HTTPException(status_code=404, detail="Intervalo Inválido! Favor informar o intervalo máximo de 1 ano.")
  
  accumulated_value = database_methods.get_accumulated_value_IPCA(start_date, end_date)
  
  return f"No intervalo entre {start_date.strftime('%Y-%m-%d')} e {end_date.strftime('%Y-%m-%d')}. O valor acumulado do IPCA foi de {accumulated_value}%."

@app.put("/IPCA_BACEN")
async def update_ipca_bsb():
    df_ipca_bc = database_methods.get_ipca_bacen()
    database_methods.updata_database(df_ipca_bc)
    data_ultima_atualizacao = df_ipca_bc.data.max()
    data_ultima_atualizacao = datetime.strptime(data_ultima_atualizacao,'%Y-%m-%d').strftime('%d/%m/%Y')
    return f"Última atualização do IPCA feita pelo BCB foi em: {data_ultima_atualizacao}"



