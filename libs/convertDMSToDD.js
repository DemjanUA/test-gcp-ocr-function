/**
 *  Convert DMS (degrees, minutes, seconds) to DD  (decimal degrees)
 * @param array
 * @param direction N, E, W, S
 * @returns {*}
 */
module.exports = function convertDMSToDD(array, direction) {
  if (!Array.isArray(array) || array.length != 3) return 0;

  let dd = array[0] + array[1] / 60 + array[2] / (60 * 60);
  // don't do anything for N or E
  if (direction == "S" || direction == "W") {
    dd = dd * -1;
  }
  return dd;
}
