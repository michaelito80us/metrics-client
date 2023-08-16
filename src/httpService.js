const baseurl = "http://localhost:3001/api/v1/";

const httpService = {};

httpService.addMeasurement = async (data) => {
  try {
    const response = await fetch(baseurl + "metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

httpService.metricsList = async () => {
  try {
    const response = await fetch(baseurl + "metric_list");
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

httpService.averages = async (data) => {
  try {
    const response = await fetch(baseurl + "averages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default httpService;
