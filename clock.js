import axios from "axios";
let nowTime = new Date();
var AMPM=nowTime.getHours() >= 12 ? 'PM' : 'AM';
console.log(1)
//  clock function with 12 hour format
const clock = (hour, minutes, seconds) => {
    let period = hour >= 12 ? 'PM' : 'AM';
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
  
    setInterval(() => {
      seconds++;
      if (seconds === 59) {
        minutes++;
        seconds = 0;
      }
      if (minutes === 59) {
        hour++;
        minutes = 0;
      }
      if (hour == 12) {
        if (period == 'AM') {
          period = 'PM';
        }
        if(period == 'PM'){
          period = 'AM';
        }

      }

      if (hour == 13) {
        AMPM = period;
        hour = 1;        
      }

      date.setHours(hour);
      date.setMinutes(minutes);
      date.setSeconds(seconds);
      nowTime = date.getHours() + ':' +(minutes < 10 ? '0' : '') +  date.getMinutes() + ':' + (seconds < 10 ? '0' : '') +date.getSeconds() + ' ' + period;
      // console.log(nowTime, AMPM)


    }, 1000);
  };
  

  const timeapi = () => {
    const uri = 'https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata';
    axios.get(uri)
      .then((res) => res.data)
      .then((data)=>{
        const {hour,minute,seconds} = data;
        clock(hour,minute,seconds);
        console.log("time updated")
      
      })
    }
  timeapi()

export { timeapi ,nowTime, AMPM };
