# Easy IPCA
    Portal para consulta simplificada do valor mensal do "Índice Nacional de Preços ao Consumidor Amplo", em um determinado período de tempo.

## Requisitos do projeto

    - Concluídos:

        - Buscar dados da API de IPCA do Banco Central do Brasil.
        - Salvar valores retornados em um banco de dados.
        - Recuperar os valores somados em JSON.
        - Disponibilizar um endpoint que recebe como parâmetros data inicial e final e formato (JSON e Excel) e retorne relatório referente ao intervalo selecionado.
        - Exibir os dados solicitados no período solicitado pelo usuário.
        - Permitir que o usuário escolha e altere os valores da pesquisa.
        - Não realizar pesquisa caso o intervalo seja maior que 1 ano


    Pendentes:

        - Disponibilar tabela para download no formatos JSON e XLSX.

## PIPELINE

## API IPCA BCB

    - Foram criados 2 endpoints:
        - /ipca_bcb
            - GET: Retorna relatório referente a um intervalo de tempo.
            - PUT: Atualiza o banco de dados com os dados da API do BCB.
        
        - /ipca_bcb/total
            - GET: Retorna a soma total da base completa fornecida pela API do BCB.

## Deployment

### Create database (PowerShell)
    Primeiramente, instale o módulo PSSQLite no POwerShell.
    ```
        Install-Module -Name PSSQLite
    ```

    Criando o banco de dados
    ```
        $database = "easy_ipca.db"
        New-SQLiteConnection -DataSource $database
    ```
    
    Criando Tabela
    ```
        $Query_create_table = "CREATE TABLE IPCA_BACEN (CHAVE VARCHAR(8) PRIMARY KEY, DATA DATE, VALOR FLOAT)"
        $Query_create_index = "CREATE INDEX [INDEX_CHAVE] ON 'IPCA_BACEN' ([CHAVE])"
        $DataSource = "/mnt/c/Users/gabri/Repositorio_local/Projetos/easy_IPCA/API_IPCA_BCB/easy_ipca.db"
        Invoke-SqliteQuery -Query $Query_create_table -DataSource $DataSource
        Invoke-SqliteQuery -Query $Query_create_index -DataSource $DataSource
    ```
