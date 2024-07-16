import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

import chart from "chart.js/auto";
import Display from "../Display/Display";
import { useLocation } from "react-router-dom";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   bar
// } from "chart.js";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   bar
// );

export default function Chart() {
  const [transactions, settransactions] = useState([]);
  const [customers, setcustomers] = useState([]);
  const location = useLocation();
  async function getData() {
    await axios
      .get("/data.json")
      .then(
        (response) => (
          settransactions(response.data?.transactions),
          setcustomers(response?.data.customers)
        )
      )
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, []);

  const data = {
    // labels: customers.map((ele) => ele.name),
    labels: location.state.user.map((ele) => ele.date),
    datasets: [
      // { data:
      {
        label: location.state.name,
        data:location.state.user.map((ele) => ele.amount),
        fill: true,
        type: "bar",
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Chart",
      },
    },
    scales: {
      // x: {
      //   type: "category",
      //   title: {
      //     display: true,
      //     // text: "Month",
      //   },
      // },
      y: {
        // type: "linear",
        beginAtZero: true,
        // title: {
        //   display: true,
        //   text: "Value",
        // },
      },
    },
  };

  return (
    <>
      <div className="w-50 mx-auto">
        <h2 className="mx-auto">User Chart</h2>
        <Line data={data} options={options} />
      </div>
    </>
  );
}
