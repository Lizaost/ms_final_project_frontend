export const getFormattedDateAndTime = (datetime_string: string) => {
  let date = new Date(Date.parse(datetime_string));
  let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  return `${date.getDay()} ${months[date.getMonth() - 1]} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
};

export const getFormattedDayAndMonth = (datetime_string: string) => {
  let date = new Date(Date.parse(datetime_string));
  let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  return `${date.getDay()} ${months[date.getMonth() - 1]}`;
};
