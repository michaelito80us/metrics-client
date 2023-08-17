import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import moment from "moment";

const CustomTooltip = ({ active, payload, type }) => {
  if (active) {
    const currData = payload && payload.length ? payload[0].payload : null;

    let formatString;
    if (type === "day") {
      formatString = "DD/MM/YY";
    }
    if (type === "hour") {
      formatString = "DD/MM/YY HH:00";
    }
    if (type === "minute") {
      formatString = "DD/MM/YY HH:mm";
    }
    return (
      <div className="p-2 bg-white border rounded-md text-black/80 border-bgpri/80">
        <p>{moment(currData.interval).format(formatString)}</p>
        <p>
          {"average: "}
          <em>{currData.average}</em>
        </p>
      </div>
    );
  }

  return null;
};

export default function AveragesDisplay({ graphData, startTime, endTime }) {
  const keys = ["per_day", "per_hour", "per_minute"];

  keys.forEach((key) => {
    if (graphData.averages[key]) {
      graphData.averages[key] = graphData.averages[key].map((item) => {
        item.interval = new Date(item.interval).getTime();
        return item;
      });
    }
  });

  const dayTickFormat = (tickItem) => {
    return moment(tickItem).format("DD/MM/YY");
  };

  const hourTickFormat = (tickItem) => {
    return moment(tickItem).format("DD/MM/YY HH:00");
  };

  const minuteTickFormat = (tickItem) => {
    return moment(tickItem).format("DD/MM/YY HH:mm");
  };

  return (
    <div className="w-screen py-10">
      {/* PER DAY */}
      <div className="p-5 border border-[#82ca9d] rounded-md mx-10 mb-10">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              type="number"
              dataKey="interval"
              name="date"
              domain={[
                new Date(
                  moment(startTime).add(-1, "day").format("YYYY/MM/DD")
                ).getTime(),
                new Date(
                  moment(endTime).add(1, "day").format("YYYY/MM/DD")
                ).getTime(),
              ]}
              tickFormatter={dayTickFormat}
              interval={0}
              ticks={[
                new Date(moment(startTime).format("YYYY/MM/DD")).getTime(),
                new Date(moment(endTime).format("YYYY/MM/DD")).getTime(),
              ]}
            />
            <YAxis
              type="number"
              dataKey="average"
              name={graphData.name}
              label={{
                value: graphData.name,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<CustomTooltip {...{ type: "day" }} />}
            />
            <Legend verticalAlign="bottom" />
            <Scatter
              name="PER DAY"
              data={graphData.averages.per_day}
              fill="#82ca9d"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* PER HOUR */}
      <div className="p-5 border border-[#ff64aa] rounded-md mx-10 mb-10">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            {/* <CartesianGrid /> */}
            <XAxis
              type="number"
              dataKey="interval"
              name="date"
              domain={[
                new Date(
                  moment(startTime).add(-1, "hour").format("YYYY/MM/DD HH:00")
                ).getTime(),
                new Date(
                  moment(endTime).add(1, "hour").format("YYYY/MM/DD HH:00")
                ).getTime(),
              ]}
              tickFormatter={hourTickFormat}
              ticks={[
                new Date(
                  moment(startTime).format("YYYY/MM/DD HH:00")
                ).getTime(),
                new Date(moment(endTime).format("YYYY/MM/DD HH:00")).getTime(),
              ]}
            />
            <YAxis
              type="number"
              dataKey="average"
              name={graphData.name}
              label={{
                value: graphData.name,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<CustomTooltip {...{ type: "hour" }} />}
            />
            <Legend verticalAlign="bottom" />
            <Scatter
              name="PER HOUR"
              data={graphData.averages.per_hour}
              fill="#ff64aa"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* PER MINUTE */}
      <div className="p-5 border border-[#aaa5fc] rounded-md mx-10">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              type="number"
              dataKey="interval"
              name="date"
              domain={[
                new Date(
                  moment(startTime).add(-1, "minute").format("YYYY/MM/DD HH:mm")
                ).getTime(),
                new Date(
                  moment(endTime).add(1, "minute").format("YYYY/MM/DD HH:mm")
                ).getTime(),
              ]}
              tickFormatter={minuteTickFormat}
              ticks={[
                new Date(
                  moment(startTime).format("YYYY/MM/DD HH:mm")
                ).getTime(),
                new Date(moment(endTime).format("YYYY/MM/DD HH:mm")).getTime(),
              ]}
            />
            <YAxis
              type="number"
              dataKey="average"
              name={graphData.name}
              label={{
                value: graphData.name,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<CustomTooltip {...{ type: "minute" }} />}
            />
            <Legend verticalAlign="bottom" />
            <Scatter
              name="PER MINUTE"
              data={graphData.averages.per_minute}
              fill="#aaa5fc"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
