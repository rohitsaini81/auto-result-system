import moment from 'moment-timezone';
import axios from 'axios'
const uri = 'https://timeapi.io/api/Time/current/zone?timeZone=Asia/';
const Kolkata = uri + "Kolkata"
const Singapore = uri + "singapore"
const timefunc = async (ragion) => {
  const time = await axios.get(ragion)
    .then(data => data)
    .then((res) => res.data)
    .catch((error) => { return ("Error while fetching time") });
  return time;
};
const converted = async (time) => {
  const sgtTime = moment.tz(time, 'YYYY-MM-DDTHH:mm:ss', 'Asia/Singapore');
  const istTime = sgtTime.clone().tz('Asia/Kolkata');
  console.log('Input Time:', sgtTime.format('YYYY-MM-DD HH:mm:ss'));
  console.log('IST:', istTime.format('YYYY-MM-DD HH:mm:ss'));
}

// const singaporetime = await timefunc(Singapore)
//   .then((res) => converted(res.dateTime))

export const mytiime = ()=>{
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = new Date().toLocaleTimeString('en-US', { timeZone });
  return({
    'Time Zone:': timeZone,
    'Current Time:': currentTime
  })

}


 export const gettime = async() => {
  const i = 'https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata';
 const date = await axios.get(i)
    .then((res) => res.data)
    return date;
}

// gettime()
