import { useEffect, useState, useRef } from "react";
import http from "../httpService";
import CreatableSelect from "react-select/creatable";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MetricEntries from "../components/Metric-entries";

const schema = yup.object({
  name: yup.string().required("Please enter metric name"),
  value: yup.number("Value must be a number").required("Please enter value"),
  timestamp: yup.date().required("Please enter timestamp"),
});
export default function Home() {
  const [metricsList, setMetricsList] = useState([]);
  const [metricData, setMetricData] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);
  const timestampRef = useRef(null);

  useEffect(() => {
    http
      .metricsList()
      .then((res) => {
        setMetricsList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [metricData]);

  // useEffect(() => {
  //   http
  //     .addMeasurement()
  //     .then((res) => {
  //       console.log("res", res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [selectedOption]);

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { ref, ...rest } = register("timestamp");

  const {
    field: { value: metricValue, onChange: metricOnChange, ...restMetricField },
  } = useController({ name: "name", control });

  const { errors } = formState;

  const onSubmit = (formData) => {
    console.log("formData", formData);
    http
      .addMeasurement({ metric: formData })
      .then((res) => {
        setMetricData(res.entries);
      })
      .catch((err) => {
        setErrorFetching(true);
        console.error(err);
      });
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
    <div className="flex justify-evenly min-h-screen bg-bgpri items-center text-white flex-wrap gap-10 overflow-hidden">
      <div className="w-[40%] max-w-[40%] border border-[#1fb6ae] rounded-md h-[60vh] p-10 min-w-[22rem]">
        <form
          className="flex flex-col h-full "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-2xl mb-10">Record a Measurement</div>
          <label className="pb-2">Metric</label>
          <CreatableSelect
            className=" text-black/60"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                height: "2.5rem",
                paddingLeft: "0.4rem",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "#8d96a7",
              }),
            }}
            placeholder="Select or create a metric..."
            isClearable
            options={metricsList}
            value={
              metricValue
                ? metricsList.find((x) => x.value === metricValue)
                : metricValue
            }
            onChange={(option) =>
              metricOnChange(option ? option.value : option)
            }
            {...restMetricField}
          />
          {
            <p className="text-red-500 text-xs italic">
              {errors.name ? `Please select or enter a metric` : null}
            </p>
          }
          <label className="pb-2 mt-4">Value</label>
          <input
            className="border border-[#1fb6ae] rounded-md py-2 px-4 text-black/80 h-10 placeholder-[#8d96a7] "
            placeholder="Enter a value"
            {...register("value")}
          />
          {
            <p className="text-red-500 text-xs italic ">
              {errors.value ? "Please enter a correct value" : null}
            </p>
          }
          <label className="pb-2 mt-4">Timestamp</label>
          <input
            type="text"
            className="border border-[#1fb6ae] rounded-md py-2 px-4 text-black/80 h-10 placeholder-[#8d96a7]"
            placeholder="Choose a date and time"
            step="1"
            {...register("timestamp")}
            ref={(e) => {
              ref(e);
              timestampRef.current = e;
            }}
            onFocus={(e) => {
              e.currentTarget.type = "datetime-local";
            }}
          />
          {
            <p className="text-red-500 text-xs italic max-w-full">
              {errors.timestamp ? "please select a date and time" : null}
            </p>
          }
          <div className="flex-grow flex items-center justify-end">
            <input
              className="mr-4 cursor-pointer"
              type="button"
              onClick={() => handleReset()}
              value="Reset"
            />
            <button
              type="submit"
              className="w-32 rounded-md border border-[#1fb6ae] py-2 text-[#1fb6ae] transition-all hover:cursor-pointer hover:border-[#1fb6ae]  hover:bg-[#1fb6ae] hover:text-white active:border-[#1fb6ae]/60 active:bg-[#1fb6ae]/60 h-fit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-5/12 border border-[#1fb6ae] rounded-md h-[60vh] p-10 ">
        {metricData.length > 0 && (
          <>
            <p className="capitalize text-2xl mb-8">
              Last 30 entries for: {metricData[0].name}
            </p>
            <MetricEntries data={metricData} />
          </>
        )}
      </div>
    </div>
  );
}
