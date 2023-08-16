import { useRef } from "react";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MetricForm from "../components/MetricForm";
import MetricDisplay from "../components/MetricDisplay";
import useMetrics from "../hooks/useMetrics";

const schema = yup.object({
  name: yup.string().required(),
  value: yup.number().required(),
  timestamp: yup.date().required(),
});
export default function Home() {
  const {
    metricsList,
    metricData,
    setMetricData,
    addMeasurement,
    setErrorFetching,
  } = useMetrics();
  const timestampRef = useRef(null);

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    addMeasurement(formData);
  };

  const handleReset = () => {
    reset({
      name: "",
      value: "",
      timestamp: "",
    });
    timestampRef.current.type = "text";
    setMetricData([]);
    setErrorFetching(false);
  };

  return (
    <div className="flex flex-wrap items-center min-h-screen gap-10 overflow-hidden text-white justify-evenly bg-bgpri">
      <MetricForm
        {...{
          control,
          formState,
          register,
          handleSubmit,
          handleReset,
          metricsList,
          onSubmit,
          timestampRef,
          useController,
        }}
      />
      <MetricDisplay metricData={metricData} />
    </div>
  );
}
