import CreatableSelect from "react-select/creatable";

export default function MetricForm({
  register,
  control,
  formState,
  handleSubmit,
  useController,
  handleReset,
  metricsList,
  timestampRef,
  onSubmit,
}) {
  const { errors } = formState;
  const {
    field: { value: metricValue, onChange: metricOnChange, ...restMetricField },
  } = useController({ name: "name", control });
  const { ref, ...rest } = register("timestamp");

  return (
    <div className="w-[40%] border border-[#1fb6ae] rounded-md h-[60vh] p-10 min-w-[25rem]">
      <form className="flex flex-col h-full " onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 text-2xl">Record a Measurement</div>
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
          onChange={(option) => metricOnChange(option ? option.value : option)}
          {...restMetricField}
        />
        {
          <p className="text-xs italic text-red-500">
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
          <p className="text-xs italic text-red-500 ">
            {errors.value ? "Please enter a number" : null}
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
          <p className="max-w-full text-xs italic text-red-500">
            {errors.timestamp ? "please select a date and time" : null}
          </p>
        }
        <div className="flex items-center justify-end flex-grow">
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
