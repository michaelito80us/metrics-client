import { useRef } from "react";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MetricForm from "../components/MetricForm";
import MetricDisplay from "../components/MetricDisplay";
import useMetrics from "../hooks/useMetrics";

const schema = yup.object({
  name: yup.string().required("This field is required"),
  value: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("This field is required and must be a number"),
  timestamp: yup.string().required("this field is required"),
});

export default function AddMetrics() {
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
    <>
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
    </>
  );
}
