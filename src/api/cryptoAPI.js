import axios from "axios";

const API_URL = "https://data-api.coindesk.com/index/cc/v1/historical/days/eod";

export async function getBitcoinHistoricalData(startDate, endDate) {
  try {
    const numberOfDays =
      Math.floor(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    const response = await axios.get(API_URL, {
      params: {
        market: "cdifti",
        instrument: "BTIUSF-USD",
        limit: numberOfDays,
        to_ts: Math.floor(new Date(endDate).getTime() / 1000), // Convert endDate to timestamp
        response_format: "JSON",
      },
    });

    if (
      !response.data ||
      !response.data.Data ||
      response.data.Data.length === 0
    ) {
      // console.warn("⚠️ No data returned from the API.");
      return [];
    }

    // console.log("📊 Bitcoin Data:", response.data.Data);
    return response.data.Data;
  } catch (error) {
    console.error(
      "❌ Error fetching Bitcoin data:",
      error?.response?.data || error.message
    );
    return [];
  }
}
