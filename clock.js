import axios from "axios";
var AMPM='PM'
console.log(1)
let nowTime = new Date();
//  clock function with 12 hour format
const clock = (hour, minutes, seconds, AMPM) => {
    const date = new Date();
    date.setHours(hour + (AMPM === 'PM' && hour !== 12 ? 12 : 0));
    date.setMinutes(minutes);
    date.setSeconds(seconds);
  
    setInterval(() => {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      if (minutes === 60) {
        hour++;
        minutes = 0;
      }
      if (hour === 12 && minutes === 0 && seconds === 0) {
        AMPM = AMPM === 'AM' ? 'PM' : 'AM';
      }
      if (hour === 13) {
        hour = 1;
      }
      date.setHours(hour + (AMPM === 'PM' && hour !== 12 ? 12 : 0));
      date.setMinutes(minutes);
      date.setSeconds(seconds);
      nowTime = date.toLocaleTimeString();
      // console.log(date.);


    }, 1000);
  };
  

  const timeapi = () => {
    const uri = 'https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata';
    axios.get(uri)
      .then((res) => res.data)
      .then((data)=>{
        const {hour,minute,seconds} = data;
        clock(hour,minute,seconds,"PM");
        console.log("time updated")
      
      })
    }
  
export { timeapi ,nowTime, AMPM };