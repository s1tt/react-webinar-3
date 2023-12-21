export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = date
    .toLocaleDateString("ru-RU", options)
    .replace(/\s*г\./, "");
  return formattedDate;
};
