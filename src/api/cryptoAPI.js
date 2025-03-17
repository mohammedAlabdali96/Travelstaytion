import axios from "axios";
import { useErrorStore } from "@/store/errorStore";

const API_URL = "https://data-api.coindesk.com/index/cc/v1/historical/days/eod";

export async function getBitcoinHistoricalData(startDate, endDate) {
  const errorStore = useErrorStore();

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
      errorStore.setError("No Bitcoin data available. Please try again later.");
      return [];
    }

    return response.data.Data;
  } catch (error) {
    console.error(
      "Error fetching Bitcoin data:",
      error?.response?.data || error.message
    );
    errorStore.setError("An unexpected error occurred." || error?.response?.data || error.message);

    return [];
  }
}
