export const getDateArray = function (date){
  const day = new Date(date);
  const string = day.getDate() + "/" + (day.getMonth() + 1);
  return string;
}
