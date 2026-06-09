import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useFetch from "../../useFetch";
import { useContext } from "react";
import LeadContext from "../../context/LeadContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {},
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export const VerticalChart = () => {
  const { data: leadClosed } = useFetch(
    "https://crm-backend-tawny.vercel.app/leads/status-count",
  );
  
  const { allLeads } = useContext(LeadContext);
  console.log(allLeads)
  const filteredLeads = allLeads?.filter((lead) => lead.status === "Closed") || []
  const displayLeads = filteredLeads?.map((lead) => lead.salesAgent?.name || "No Agent Assigned");
  const data = {
    labels: displayLeads,
    datasets: [
      {
        label: "Lead Status",
        data: filteredLeads.map(() => 1),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(53, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default VerticalChart;
