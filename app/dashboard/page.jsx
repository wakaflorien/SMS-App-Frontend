"use client";
import { useState } from "react";
import ApexChart from "../components/Charts/ApexChart";
import Card from "../components/Cards/Cards";

export default function DashboardPage() {
  const state = {
    series: [
      {
        name: "Message",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Pending",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Sent",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontFamily: "Poppins",
          fontWeight: "600",
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
          style: {
            fontFamily: "Poppins",
            fontWeight: "600",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };
  const cards = [1, 2, 3, 4];

  const [isChatReady, setIsChatReady] = useState(false);

  return (
    <>
      <div className="p-4">
        <div className="grid my-6 lg:grid-cols-4 gap-3">
          {cards.map((_card, index) => {
            return <Card key={`card-${index}`} />;
          })}
        </div>
        <div id="chart" className="bg-white rounded-md shadow-md grid grid-cols-1">
          {typeof window !== "undefined" && (
            <ApexChart
              // @ts-nocheck
              onReady={() => {
                setIsChatReady(true);
              }}
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          )}
        </div>
      </div>
    </>
  );
}
