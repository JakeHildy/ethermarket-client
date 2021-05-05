/////////////////////////////////////
// TIME FUNCTIONS
// Get date and format it.
export function getTimestamp() {
  const currentTime = new Date();
  const year = currentTime.getFullYear();

  const month = currentTime.getMonth() + 1;
  let monthStr = month.toString();
  monthStr = monthStr.length < 2 ? '0' + monthStr : monthStr;

  const date = currentTime.getDate();
  let dateStr = date.toString();
  dateStr = dateStr.length < 2 ? '0' + dateStr : dateStr;

  return `${monthStr}/${dateStr}/${year}`;
}

export function printTime(timestamp) {
  let date = new Date(timestamp);
  let dateNow = new Date();
  let deltaT = dateNow.getTime() - date.getTime();
  let differenceInYears = deltaT / (1000 * 3600 * 24 * 365.25);
  let differenceInMonths = deltaT / (1000 * 3600 * 24 * 30);
  let differenceInWeeks = deltaT / (1000 * 3600 * 24 * 7);
  let differenceInDays = deltaT / (1000 * 3600 * 24);
  let differenceInHours = deltaT / (1000 * 3600);
  let differenceInMinutes = deltaT / (1000 * 60);
  let differenceInSeconds = deltaT / 1000;

  if (differenceInYears > 1) return `${Math.trunc(differenceInYears)} year${differenceInYears < 2 ? '' : 's'} ago`;
  else if (differenceInMonths > 1)
    return `${Math.trunc(differenceInMonths)} month${differenceInMonths < 2 ? '' : 's'} ago`;
  else if (differenceInWeeks > 1) return `${Math.trunc(differenceInWeeks)} week${differenceInWeeks < 2 ? '' : 's'} ago`;
  else if (differenceInDays > 1) return `${Math.trunc(differenceInDays)} day${differenceInDays < 2 ? '' : 's'} ago`;
  else if (differenceInHours > 1) return `${Math.trunc(differenceInHours)} hour${differenceInHours < 2 ? '' : 's'} ago`;
  else if (differenceInMinutes > 1)
    return `${Math.trunc(differenceInMinutes)} minute${differenceInMinutes < 2 ? '' : 's'} ago`;
  else if (differenceInSeconds > 1)
    return `${Math.trunc(differenceInSeconds)} second${differenceInSeconds < 2 ? '' : 's'} ago`;
  else return `Just now`;
}
