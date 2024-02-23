export const formatDate = (dateString) => {
  const dateParts = dateString.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  const dateObject = new Date(year, month - 1, day);

  const formattedDay = String(dateObject.getDate()).padStart(2, "0");
  const formattedMonth = String(dateObject.getMonth() + 1).padStart(2, "0");
  const formattedYear = dateObject.getFullYear();

  return `${formattedDay}.${formattedMonth}.${formattedYear}`;
};
