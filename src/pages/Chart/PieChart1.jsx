import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useContext } from "react";
import LeadContext from "../../context/LeadContext";
import useFetch from "../../useFetch";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart1 = () => {
  const { data: leadStatusClose } = useFetch(
    `http://localhost:3001/report/last-week`,
  );

  const closedLeads = leadStatusClose?.data?.length || 0;
  const totalLeads = 7;
  const remainingLeads = totalLeads - closedLeads;

  const data = {
    labels: ["Closed Leads", "In PipeLine"],
    datasets: [
      {
        label: "Lead Report",
        data: [closedLeads, remainingLeads],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
        borderWidth: 2,
      },
    ],
  };
  return <Pie data={data} />;
};

export default PieChart1;
