import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

import { useContext } from "react";

import LeadContext from "../../context/LeadContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart2 = () => {
  const { allLeads } = useContext(LeadContext);

  const statusCount = allLeads?.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;

    return acc;
  }, {});

  const labels = Object.keys(statusCount || {});

  const values = Object.values(statusCount || {});

  const data = {
    labels,

    datasets: [
      {
        label: "Lead Status Distribution",

        data: values,

        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],

        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],

        borderWidth: 2,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart2;