export const calculateTimeDifference = (startDate) => {
    const difference = new Date(startDate) - new Date();
    return difference > 0 ? difference : 0;
}