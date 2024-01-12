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
let test1Called = false;

// test1 ------------------>
const test1 = async () => {
  if (test1Called) {
    return false;
  }
  console.log("test1");
  result.sttakingfast().then((res) => {
    console.log(res);
  })
  return true;
}
  

// Dl_Satta ------------------>
const DL_Satta = async () => {
  today = new Date();
  setdate = today.toLocaleDateString();
  if (dlSattaCalled) {
    return false;
  }

  console.log("DL_Satta");
  result.sttakingfast().then((res) => {
    console.log(res);
  })
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
    // console.log(res[0],res[0].today.length)
    if(res[0].today.length<=2 && res[0].today !=""){
      const obj = {
        name: res[0].name,
        today: res[0].today,
        yesterday: res[0].yesterday,
        date: setdate
      }
      createdata(obj)
      console.log(obj)
      dlBazarCalled = true;
    }
    else{
      console.log(data[2])
      data[2].time += 0.01
      dlBazarCalled = false;
      console.log(data[2])
    }

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
  result.Bfunc().then((res) => {
    console.log(res[1])
    if(res[1].today.length<=2 && res[1].today !=""){
    const obj = {
      "name": res[1].name,
      "today": res[1].today,
      "yesterday": res[1].yesterday,
      "date": setdate
    };
    createdata(obj)
    console.log("its done",obj)
    shreeGaneshCalled = true;
  }
  else{
    console.log(data[3])
    data[3].time += 0.01
    shreeGaneshCalled = false;
    console.log("well no",data[3])
  }
  }).catch((e) => console.log(e));
};

// ---------------------------->
const Faridabad = () => {
  if (faridabadCalled) {
    return false;
  }
  console.log("Faridabad");
  result.Afunc().then((res) => {
    if(res[1].faridabad.length<=2 && res[1].faridabad !=""){
      const obj = {
        "name": "faridabad",
        "today": res[1].faridabad,
        "yesterday": res[0].faridabad,
        "date": setdate
      }
      // console.log(obj)
      faridabadCalled = true;
      console.log("its done",obj)
      createdata(obj)
    }
    else{
      console.log(data[4])
      data[4].time += 0.01
      faridabadCalled = false;
      console.log("well no",data[4])
    }

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
    console.log(res[1])
    if(res[1].gaziabad.length<=2 && res[1].gaziabad !=""){
      const obj = {
        "name": "gaziyabad",
        "today": res[1].gaziabad,
        "yesterday": res[0].gaziabad,
        "date": setdate
      }
      // console.log(obj)
      createdata(obj)
      // console.log(obj)
      createdata(obj)
      gajiyabadCalled = true;
      console.log("its done",obj)
    }
    else{
      console.log(data[5])
      data[5].time += 0.01
      gajiyabadCalled = false;
      console.log("well no",data[5])
    }
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
  // result.sttakingfast().then((res)=>{
  //   console.log(res);
  // })
  result.Afunc().then((res) => {
    if(res[1].gali.length<=2 && res[1].gali !=""){
      const obj = {
        "name": "gali",
        "today": res[1].gali,
        "yesterday": res[0].gali,
        "date": setdate
      }
      // console.log(obj)
      createdata(obj)
      galiCalled = true;
      console.log("its done",obj)
    }
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
  const mydate = custom[0] + '/' + (custom[1].length > 9 ? custom[1][1] : custom[1]) + '/' + custom[2];
  console.log(mydate)
  setdate = mydate
  console.log(mydate)
  result.Afunc().then((res) => {
    if(res[1].disawar.length<=2 && res[1].disawar !=""){
      const obj = {
        "name": "disawar",
        "today": res[1].disawer,
        "date": mydate,
        "yesterday": res[0].disawer
      }
      // console.log(obj)
      createdata(obj)
      disawarCalled = true;
      console.log("its done",obj)
    }
    else{
      console.log(data[7])
      data[7].time += 0.01
      disawarCalled = false;
      console.log("well no",data[7])
    }
  })
    .catch((e) => console.log("disawer error 2"));
  galiCalled = false;
  return true;
};





const data = [
  { name: "test1", time: process.env.DL_Satta || "18.15" },//->0.00
  { name: "DL_Satta", time: process.env.DL_Satta || "20.00" },//->0.00

  { name: "DL_bazar", time: process.env.DL_bazar || 15.20 },//->3.15 
  { name: "Shree Ganesh", time: process.env.Shree_Ganesh || 16.51},//->4.50

  { name: "Faridabad", time: process.env.Faridabad || 18.20},//->6.00
  { name: "Gajiyabad", time: process.env.Gajiyabad || 21.20},//->9.00
  { name: "Gali", time: process.env.Gali || 23.50  },//  23.50 ->11.00
  { name: "Disawar", time: process.env.Disawar || 5.25 },//-5.00
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
          case "test1":
            if (test1()){
              test1Called = true;
            }
            break;
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
