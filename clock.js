import axios from "axios";
let nowTime = "";
var AMPM = ''

// clock function with 12-hour format
const clock = (hour, minutes, seconds) => {
  const updateClock = () => {
    nowTime = `${hour}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds} ${AMPM}`;

    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes === 60) {
      minutes = 0;
      hour++;
    }

    if (hour === 25) {
      hour = 1;
    }

    AMPM = hour>12 ? 'AM':'PM'

  };

  setInterval(updateClock, 1000);
};

const timeapi = () => {
  const uri = 'https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata';
  axios.get(uri)
    .then((res) => res.data)
    .then((data) => {
      const { hour, minute, seconds } = data;
      AMPM = hour < 12 ? 'AM' : 'PM';
      clock(hour, minute,seconds); // Use hour % 12 to convert 24-hour format to 12-hour format
      console.clear()
      console.log("time updated");
    })
    .catch((error) => {
      console.error("Error fetching time:", error);
    });
};

// timeapi();

export { timeapi, nowTime, AMPM };
