import axios from 'axios';
import mongoose from 'mongoose';
import Book from './models/db.js';
import dotenv from 'dotenv';
import { dbcon, dbclose, uri } from './models/db_server.js';
import { timeapi, nowTime, AMPM } from './clock.js';
import readline from 'readline'
import FetchResult from "./hp-apifunc.js";
import { gettime } from './servertime.js'
const result = new FetchResult
let calledgamesobj

// const a = await gettime()
dotenv.config();
console.log(2)
let today = new Date();
// console.log(a.dateTime)
console.log(today.toLocaleString())
let setdate = today.toLocaleDateString();
const readdata = async () => {
  try {
    const pro = await Book.find();
    console.log("readdata")
    console.log(pro)
  } catch (error) {
    console.log(500, "errorv ", error.message);
  }
};
const readdatabase = async () => {
  await dbcon(uri);
  await readdata();
  await dbclose();
};
const writedata = async (data) => {
  try {
    const pro = await Book.create(data);
    console.log(pro)
  }
  catch (error) {
    console.log(500, "errorv ", error.message);
  }
}
const createdata = async (data) => {
  await dbcon(uri);
  await writedata(data);
  // await dbclose();
}
const del = async(data) => {
  await dbcon(uri)
  try {
    const pro = await Book.deleteOne(data);
    return pro
  }
  catch (error) {
    return (500, "errorv ", error.message);
  }

}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

let dlSattaCalled = false;
let dlBazarCalled = false;
let shreeGaneshCalled = false;
let faridabadCalled = false;
let gajiyabadCalled = false;
let galiCalled = false;
let disawarCalled = false;



// Dl_Satta ------------------>
const DL_Satta = async () => {
  today = new Date();
  setdate = today.toLocaleDateString();
  if (dlSattaCalled) {
    return false;
  }

  console.log("DL_Satta");
  const obj = { name: "DL_Satta", today: "00", yesterday: "-0", date: setdate }
  createdata(obj);
  dlSattaCalled = true;
  disawarCalled = false;
  return true;
};
// DL_bazar ------------------>
const DL_bazar = async () => {
  if (dlBazarCalled) {
    return false;
  }
  console.log("DL_bazar");
  let obj = {}
  await result.Bfunc().then((res) => {
    const obj = {
      name: res[0].name,
      today: res[0].today,
      yesterday: res[0].yesterday,
      date: setdate
    }
    console.log(obj)
    createdata(obj)
    dlBazarCalled = true;
  }).catch((e) => { console.log(e) });

  dlSattaCalled = false;
  return true;
};
// Shree_Ganesh ------------------>
const Shree_Ganesh = async () => {
  if (shreeGaneshCalled) {
    return false;
  }
  console.log("Shree_Ganesh");

  try {
    const res = await result.Bfunc();
    const L = res[1].today;

    if (L.length <= 2) {
      console.log(L, 'Processing...', L.length);
      const obj = {
        "name": res[1].name,
        "today": res[1].today,
        "yesterday": res[1].yesterday,
        "date": setdate
      };
      createdata(obj);
      shreeGaneshCalled = true;
      dlBazarCalled = false;
      return true;
    } else {
      // Uncomment the following block if you want a delay before the recursive call
      await sleep(10000);
      return Shree_Ganesh();
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

// ---------------------------->
const Faridabad = () => {
  if (faridabadCalled) {
    return false;
  }
  console.log("Faridabad");
  faridabadCalled = true;
  result.Afunc().then((res) => {
    const obj = {
      "name": "faridabad",
      "today": res[1].faridabad,
      "yesterday": res[0].faridabad,
      "date": setdate
    }
    // console.log(obj)
    createdata(obj)

  }).catch((e) => console.log(e));

  shreeGaneshCalled = false;
  return true;
};
// Gaizyabad ------------------>
const Gajiyabad = () => {
  if (gajiyabadCalled) {
    return false;
  }
  console.log("Gajiyabad");
  gajiyabadCalled = true;
  result.Afunc().then((res) => {
    const obj = {
      "name": "gaziyabad",
      "today": res[1].gaziabad,
      "yesterday": res[0].gaziabad,
      "date": setdate
    }
    // console.log(obj)
    createdata(obj)
  }).catch((e) => console.log(e));
  faridabadCalled = false;
  return true;
};
// Gali ------------------>
const Gali = () => {
  if (galiCalled) {
    return false;
  }
  console.log("Gali");
  result.Afunc().then((res) => {
    const obj = {
      "name": "gali",
      "today": res[1].gali,
      "yesterday": res[0].gali,
      "date": setdate
    }
    // console.log(obj)
    createdata(obj)
    galiCalled = true;

  }).catch((e) => console.log(e));

  gajiyabadCalled = false;
  return true;
};
// Disawer ----------->
const Disawar = async () => {

  if (disawarCalled) {
    return false;
  }
  console.log("\n Disawar");
  console.log(timeString)
  today = await gettime()
  const custom = await today.date.split('/');
  const mydate = custom[0] + '/' + (custom[1].length > 1 ? custom[1][1] : custom[1]) + '/' + custom[2];
  setdate = mydate
  console.log(mydate)
  result.Afunc().then((res) => {

    const obj = {
      "name": "disawar",
      "today": res[1].disawer,
      "date": mydate,
      "yesterday": res[0].disawer
    }
    console.log(obj)
    try {
      createdata(obj)

    } catch (error) {
      console.log("desiwer result error")
    }
    disawarCalled = true;
  })
    .catch((e) => console.log("disawer error 2"));
  galiCalled = false;
  return true;
};





const data = [
  { name: "DL_Satta", time: process.env.DL_Satta || "1.00" },//->0.00

  { name: "DL_bazar", time: process.env.DL_bazar || "15.20" },//->3.15 
  { name: "Shree Ganesh", time: process.env.Shree_Ganesh || "16.51" },//->4.50

  { name: "Faridabad", time: process.env.Faridabad || "18.02" },//->6.00
  { name: "Gajiyabad", time: process.env.Gajiyabad || "21.02" },//->9.00
  { name: "Gali", time: process.env.Gali || "23.02" },//->11.00
  { name: "Disawar", time: process.env.Disawar || "5.15" },//-5.00
];



// readdatabase();

timeapi()
sleep(5000).then(() => {
  console.log("\n", setdate)
})
var now = new Date()

sleep(6000).then(() => {
  timeString = nowTime;
})
let timeString = now.toLocaleTimeString();



// main function for display time and call function
function displayCurrentTime() {
  /*
      const hours =hour%12==0 ? 12 :hour%12
  first export hour from clock then manage it in nowtime but main using
  var is currenttime so make sure it has correct time okk.....
  */
  try {
    const a = nowTime.split(':');
    const currentTime = `${a[0]}.${a[1]}`;
    var AM = a[0] > 12 ? false : true;
    timeString = nowTime;
    const seconds = a[2].split(' ');
    // AMPM='ffffuck'


    if (process.env.DEV) {
      try {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(currentTime + " " + seconds[0] + " " + AM);

      } catch (error) {
        console.log(error)
      }
    } else {
      // console.log(timeString,AM)

    }


    const matchingNames = data.filter((item) => item.time == currentTime);

    if (matchingNames.length > 0) {
      matchingNames.forEach((item) => {
        switch (item.name) {
          case "DL_Satta":
            if (DL_Satta()) {
              dlSattaCalled = true;
            }
            break;
          case "DL_bazar":
            if (DL_bazar()) {
              dlBazarCalled = true;
            }
            break;
          case "Shree Ganesh":
            if (Shree_Ganesh()) {
              shreeGaneshCalled = true;
            }
            break;
          case "Faridabad":
            if (Faridabad()) {
              faridabadCalled = true;
            }
            break;
          case "Gajiyabad":
            if (Gajiyabad()) {
              gajiyabadCalled = true;
            }
            break;
          case "Gali":
            if (Gali()) {
              galiCalled = true;
            }
            break;
          case "Disawar":
            if (Disawar()) {
              disawarCalled = true;
            }
            break;
        }
      });
    }

    today = new Date();
    setdate = today.toLocaleDateString();
    calledgamesobj = [dlSattaCalled, dlBazarCalled, shreeGaneshCalled, faridabadCalled, gajiyabadCalled, galiCalled, disawarCalled]
  } catch (error) {
    console.log("failed2", error.message)
  }
}

export { del,DL_Satta,DL_bazar,Shree_Ganesh,Faridabad,Gajiyabad,Gali,Disawar, setdate, timeString, calledgamesobj }
setInterval(displayCurrentTime, 1000);
