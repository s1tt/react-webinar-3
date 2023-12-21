export const formatDate = (timestamp, lang = "ru") => {
  const currentLocale = lang === "ru" ? "ru-RU" : "en-US";
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = date
    .toLocaleDateString(currentLocale, options)
    .replace(/\s*г\./, "");
  return formattedDate;
};
