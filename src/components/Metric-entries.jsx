import React from "react";

export default function MetricEntries({ data }) {
  return (
    <div className="h-[calc(100% - 4rem)] overflow-y-auto">
      <table className="table-auto border-separate  border-spacing-2 mx-auto w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Measurement</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td className="text-center">
                {new Date(entry.timestamp).toLocaleString()}
              </td>
              <td className="text-center">{entry.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
