export default function formatDateTime(isoString) {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const dateTime = new Date(isoString);

  const formattedDate = dateTime.toLocaleString('ru-RU', options);
  const formattedDateTime = formattedDate.replace(' г.', '');
  
  return formattedDateTime;
}