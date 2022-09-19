import { useSearchParams } from "react-router-dom"

import ReportPage from "../components/ReportPage"


const Report = () => {

    function getMonthDifference(startDate, endDate) {
        return (
          endDate.getMonth() -
          startDate.getMonth() +
          12 * (endDate.getFullYear() - startDate.getFullYear())
        )
      }

    const [searchParams] = useSearchParams();

    const startDate = searchParams.get("startdate")
    const endDate = searchParams.get("enddate")

    let reportValidation = true
    let titleReport = new String

    // Erro: Campos pendentes
    if ( !(startDate && endDate)){
        titleReport = 'Favor preencher todos os campos!'
        reportValidation = false
    
    }
    // Erro: Data inicial maior que final
    else if (new Date(startDate) > new Date(endDate)){
        titleReport = 'A data inicial precisa ser menor que a final!'
        reportValidation = false
    }
    // Erro: Período maior de 1 ano
    else if (getMonthDifference(new Date(startDate),new Date(endDate)) >= 12){
        titleReport = 'O intervalo precisa ser de no máximo 1 ano.'
        reportValidation = false

    }
    else titleReport = `Relatório referente ao período entre ${startDate} e ${endDate}`

    const showReport = reportValidation ? <ReportPage startDate={startDate} endDate={endDate}/> : ''

    return(
        <div className="report-ipca">
            <h4 className="title" ><font color={reportValidation ? "":"#B22222"}>{titleReport}</font></h4>
            <div id = "output_report">
                {showReport}
            </div>
        </div>
    )

}
export default Report;