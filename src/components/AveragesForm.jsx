import Select from "react-select";

export default function AveragesForm({
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
}) {
  const { errors } = formState;
  const {
    field: { value: metricValue, onChange: metricOnChange, ...restMetricField },
  } = useController({ name: "name", control });
  const { ref: startTimeRefRegister, ...rest } = register("startTime");
  const { ref: endTimeRefRegister, ...rest2 } = register("endTime");

  return (
    <div className="mx-auto w-fit">
      <form
        className="flex flex-col h-full w-72"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="pb-2">Select a Metric</label>
        <Select
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
          placeholder="Select a metric..."
          isClearable
          options={metricsList}
          value={
            metricValue
              ? metricsList.find((x) => x.value === metricValue)
              : metricValue
          }
          onChange={(option) => metricOnChange(option ? option.value : option)}
          {...restMetricField}
        />
        {
          <p className="h-3 text-xs italic text-red-500">
            {errors.name?.message}
          </p>
        }
        <label className="pb-2 mt-4">Start Time</label>
        <input
          type="text"
          className="border border-[#1fb6ae] rounded-md py-2 px-4 text-black/80 h-10 placeholder-[#8d96a7]"
          placeholder="Choose a date and time"
          step="1"
          {...register("startTime")}
          ref={(e) => {
            startTimeRefRegister(e);
            startTimeRef.current = e;
          }}
          onFocus={(e) => {
            e.currentTarget.type = "datetime-local";
          }}
        />
        {
          <p className="h-3 max-w-full text-xs italic text-red-500">
            {errors.startTime ? "This is a required field" : null}
          </p>
        }
        <label className="pb-2 mt-4">End Time</label>
        <input
          type="text"
          className="border border-[#1fb6ae] rounded-md py-2 px-4 text-black/80 h-10 placeholder-[#8d96a7]"
          placeholder="Choose a date and time"
          step="1"
          {...register("endTime")}
          ref={(e) => {
            endTimeRefRegister(e);
            endTimeRef.current = e;
          }}
          onFocus={(e) => {
            e.currentTarget.type = "datetime-local";
          }}
        />
        {
          <p className="h-3 max-w-full text-xs italic text-red-500">
            {errors.endTime?.message ===
            "End time can't be earlier than start time"
              ? errors.endTime.message
              : errors.endTime
              ? "This is a required field"
              : null}
          </p>
        }
        <div className="flex items-center justify-end flex-grow mt-10">
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
  );
}
