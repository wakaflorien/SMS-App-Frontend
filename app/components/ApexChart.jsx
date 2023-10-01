"use client";
import { useEffect, useState } from "react";

export default function ApexChart({ onReady, type, ...otherProps }) {
  const [Chart, setChart] = useState();
  const hasType = typeof type !== "undefined";

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
      onReady();
    });
  }, []);

  return hasType && Chart && <Chart {...otherProps} type={type} />;
}
