import { useState, useRef } from "react";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AveragesDisplay from "../components/AveragesDisplay";
import AveragesForm from "../components/AveragesForm";
import useMetrics from "../hooks/useMetrics";
import http from "../httpService";

const schema = yup.object({
  name: yup.string().required("This is a required field"),
  startTime: yup.date().required(),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End time can't be earlier than start time")
    .required(),
});

export default function Averages() {
  const [graphData, setGraphData] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { metricsList, errorFetching, setErrorFetching } = useMetrics();
  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const handleReset = () => {
    reset({
      name: "",
      startTime: "",
      endTime: "",
    });
    startTimeRef.current.type = "text";
    endTimeRef.current.type = "text";
    setGraphData(null);
    setErrorFetching(false);
  };

  const onSubmit = (data) => {
    setStartTime(data.startTime);
    setEndTime(data.endTime);
    const dataToSend = {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      metric: data.name,
      start_time: data.startTime,
      end_time: data.endTime,
    };

    http
      .averages(dataToSend)
      .then((res) => {
        setGraphData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="self-start mt-10">
        <AveragesForm
          {...{
            control,
            formState,
            register,
            handleSubmit,
            handleReset,
            metricsList,
            onSubmit,
            startTimeRef,
            endTimeRef,
            useController,
          }}
        />
        <div className="flex-grow">
          {graphData && (
            <AveragesDisplay {...{ graphData, startTime, endTime }} />
          )}
        </div>
      </div>
    </>
  );
}
