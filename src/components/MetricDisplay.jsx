export default function MetricDisplay({ metricData }) {
  return (
    <div className="w-[40%] border border-[#1fb6ae] rounded-md h-[60vh] p-10 min-w-[25rem]">
      {metricData.length > 0 && (
        <>
          <p className="mb-8 text-2xl">
            Last 30 entries for:
            <span className="ml-2 capitalize">{metricData[0].name}</span>
          </p>
          <div className="h-[calc(100%-4rem)] overflow-y-auto">
            <table className="w-full mx-auto border-separate table-auto border-spacing-2">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Measurement</th>
                </tr>
              </thead>
              <tbody>
                {metricData.map((entry) => (
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
        </>
      )}
    </div>
  );
}
