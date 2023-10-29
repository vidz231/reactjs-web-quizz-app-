/**
 *
 * @param {number} minutes
 * @param {number} seconds
 * @example: formatTime(1, 1) => 01:01
 * @description: This function is used to format the time
 * @returns: string
 * @author : Vi Le
 * @version :1.0.0.0
 */
export function formatTime(minutes, seconds) {
  let formattedMinutes = ('0' + minutes).slice(-2);
  let formattedSeconds = ('0' + seconds).slice(-2);
  return formattedMinutes + ':' + formattedSeconds;
}
