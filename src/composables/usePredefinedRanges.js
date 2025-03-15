export function getDateRange(range) {
  const today = new Date();
  let pastDate = new Date();

  if (range === "7d") pastDate.setDate(today.getDate() - 8);
  if (range === "20d") pastDate.setDate(today.getDate() - 21);
  if (range === "1m") pastDate.setMonth(today.getMonth() - 1);

  return {
    startDate: pastDate.toISOString().split("T")[0],
    endDate: today.toISOString().split("T")[0],
  };
}
