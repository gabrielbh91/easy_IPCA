# challenge_mcs
 Desafio MCS Markup


# Deployment

## Create database (PowerShell)
    Primeiramente, instale o módulo PSSQLite no POwerShell.
        PS> Install-Module -Name PSSQLite

    Criando o banco de dados
        $database = "easy_ipca.db"
        New-SQLiteConnection -DataSource $database
    
    Criando Tabela
        $Query_create_table = "CREATE TABLE IPCA_BACEN (CHAVE VARCHAR(8) PRIMARY KEY, DATA DATE, VALOR FLOAT)"
        $Query_create_index = "CREATE INDEX [INDEX_CHAVE] ON 'IPCA_BACEN' ([CHAVE])"
        $DataSource = "/mnt/c/Users/gabri/Repositorio_local/Projetos/easy_IPCA/API_IPCA_BCB/easy_ipca.db"
        Invoke-SqliteQuery -Query $Query_create_table -DataSource $DataSource
        Invoke-SqliteQuery -Query $Query_create_index -DataSource $DataSource