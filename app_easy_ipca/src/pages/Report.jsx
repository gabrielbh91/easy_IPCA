import { useSearchParams } from "react-router-dom"

import ReportPage from "../components/ReportPage"


const Report = () => {

    const [searchParams] = useSearchParams();

    const startDate = searchParams.get("startdate")
    const endDate = searchParams.get("enddate")

    let reportValidation = true
    let titleReport = new String

    if ( !(startDate && endDate)){
        titleReport = 'Favor preencher todos os campos!'
        reportValidation = false
    
    }
    else if (new Date(startDate) > new Date(endDate)){
        titleReport = 'A data inicial precisa ser menor que a final!'
        reportValidation = false
    }
    else titleReport = `Relatório referente ao perído entre ${startDate} e ${endDate}`

    const showReport = reportValidation ? <ReportPage startDate={startDate} endDate={endDate}/> : ''

    return(
        <div className="report-ipca">
            <h4 className="title">{titleReport}</h4>
            <div id = "output_report">
                {showReport}
            </div>
            
        </div>
    )

}
export default Report;