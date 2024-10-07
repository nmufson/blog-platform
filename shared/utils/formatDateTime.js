export default function formatDateTime(timestamp) {
  const date = new Date(timestamp);

  const dateOptions = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
