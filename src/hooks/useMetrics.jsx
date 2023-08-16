import { useState, useEffect } from "react";
import http from "../httpService";

export default function useMetrics(initialMetrics = []) {
  const [metricsList, setMetricsList] = useState(initialMetrics);
  const [metricData, setMetricData] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    http
      .metricsList()
      .then((res) => {
        setMetricsList(res.data);
        setErrorFetching(false);
      })
      .catch((err) => {
        setErrorFetching(true);
        console.error(err);
      });
  }, [metricData]);

  const addMeasurement = (formData) => {
    return http
      .addMeasurement({ metric: formData })
      .then((res) => {
        setMetricData(res.entries);
        setErrorFetching(false);
      })
      .catch((err) => {
        setErrorFetching(true);
        console.error(err);
      });
  };

  return {
    metricsList,
    metricData,
    setMetricData,
    addMeasurement,
    errorFetching,
    setErrorFetching,
  };
}
