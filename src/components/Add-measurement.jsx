import React from "react";
import SelectMetric from "./Select-metric";

export default function AddMeasurement({
  setSelectedOption,
  selectedOption,
  handleSelectedOption,
}) {
  return (
    <SelectMetric
      setSelectedOption={setSelectedOption}
      selectedOption={selectedOption}
      handleSelectedOption={handleSelectedOption}
    />
  );
}
