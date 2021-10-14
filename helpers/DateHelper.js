/* eslint-disable no-shadow */
/* eslint-disable no-unneeded-ternary */
// For Date related functions

const date = new Date(Date.now());
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const today = `${year}-${month}-${day}`;

exports.isDateToday = (date) => {
  // ONLY WORKS FOR DATE FORMAT YYYY-MM-DD
  const dateHyphenDelimiter = date.split('-');
  const todayArray = today.split('-');

  if (todayArray.length === dateHyphenDelimiter.length) {
    let check;
    for (let i = 0; i < dateHyphenDelimiter.length; i += 1) {
      check = dateHyphenDelimiter[i] === todayArray[i] ? true : false;
      if (!check) {
        return false;
      }
    }
    return true;
  }
};
