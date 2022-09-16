
import "./ReportPage.css"

const ReportPage = ({reports}) => {
    return (     
    <form id="report_table">
    <table border="2">
        <caption>Ídice IPCA por Mês</caption>
        <thead>
            <tr>
                <th>Mês</th>
                <th>Ídice</th>
            </tr>
        </thead>
        {reports && reports.map((row) => <tr><td>{row.data}</td><td>{row.valor}</td></tr>)}
    </table>
    </form>
    )
}

export default ReportPage