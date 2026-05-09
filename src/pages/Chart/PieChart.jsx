import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useContext } from "react";
import LeadContext from "../../context/LeadContext";
import useFetch from "../../useFetch";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { leadsStatus } = useContext(LeadContext);

  const data = {
    labels: leadsStatus?.map((item) => item._id),
    datasets: [
      {
        label: "Lead Status",
        data: leadsStatus?.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(211, 95, 95)",
          "rgb(33, 160, 245)",
          "rgb(234, 169, 6)",
          "rgb(7, 251, 251)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default PieChart;