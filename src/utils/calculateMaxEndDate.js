export const calculateMaxEndDate = (startDate) => {
  const maxEndDate = new Date(startDate);
  maxEndDate.setDate(maxEndDate.getDate() + 14);
  return maxEndDate;
};
