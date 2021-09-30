// For Date related functions

let date = new Date(Date.now())
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const today = `${year}-${month}-${day}`;
let checkArray = [];

exports.isDateToday = (date) =>{
    //ONLY WORKS FOR DATE FORMAT YYYY-MM-DD
   const dateHyphenDelimiter = date.split('-');
   const todayArray = today.split('-');

   if(todayArray.length === dateHyphenDelimiter.length){
    let check; 
        for(i=0; i<dateHyphenDelimiter.length; i++){
            check = dateHyphenDelimiter[i] == todayArray[i] ? true : false; 
            if(!check){
                return false
            }
        }
     return true;
   }
   return;
}