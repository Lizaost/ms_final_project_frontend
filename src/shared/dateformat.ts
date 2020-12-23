export const getFormattedDateAndTime = (datetime_string: string) => {
  let date = new Date(Date.parse(datetime_string));
  let months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${date.getDay()} ${months[date.getMonth() - 1]} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
};

export const getFormattedDayAndMonth = (datetime_string: string) => {
  let date = new Date(Date.parse(datetime_string));
  let months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${date.getDay()} ${months[date.getMonth() - 1]}`;
};
