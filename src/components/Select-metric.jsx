import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import http from "../httpService";

export default function SelectMetric({
  setSelectedOption,
  selectedOption,
  handleSelectedOption,
}) {
  const [listOptions, setListOptions] = useState([]);
  useEffect(() => {
    http
      .metricsList()
      .then((res) => {
        setListOptions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <CreatableSelect
      className="w-96 text-black/60"
      isClearable
      options={listOptions}
      onChange={handleSelectedOption}
      placeholder="Select or create a metric..."
      value={selectedOption}
    />
  );
}
