import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export const secondsToDay = (s: number) => Math.floor(s / (24 * 60 * 60));

export const convertTimeToSeconds = (time: string): number => parseInt(time) * 1000;

// https://date-fns.org/v2.28.0/docs/formatDistanceToNowStrict
export const distanceToNowStrict = (timeInMilliSeconds: number) => {
  const endTime = new Date(timeInMilliSeconds);
  return new Date() > endTime || !Number.isFinite(timeInMilliSeconds)
    ? '0 seconds'
    : formatDistanceToNowStrict(endTime, { unit: 'day' });
};

/**
 * @param {number} timeInMilliSeconds 秒
 * @param {'month' | 'day' | 'second' | 'minute' | 'hour' | 'year'} unit  单位
 * @returns {string} 距离现在的时间
 */
export const distanceToNowStrictWithUnit = (
  timeInMilliSeconds: number,
  unit: 'month' | 'day' | 'second' | 'minute' | 'hour' | 'year',
): string => {
  const endTime = new Date(timeInMilliSeconds);
  return new Date() > endTime || !Number.isFinite(timeInMilliSeconds)
    ? '0 seconds'
    : formatDistanceToNowStrict(endTime, { unit });
};



export const getDay = (duration: number | bigint | string) => {
  const temp = Number(Number(duration) / 86400)
  const initTemp = Math.floor(temp)
  return initTemp < 1 ? 1 : initTemp
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}