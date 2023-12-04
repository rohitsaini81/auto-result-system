// <!--today result id-->
const dl = document.getElementById('_DL');
const sg = document.getElementById('_SG');
const ds = document.getElementById('_DS');
const fd = document.getElementById('_FD');
const gl = document.getElementById('_GL');
const gz = document.getElementById('_GZ');
// <!--yesterday result id-->
const o_dl = document.getElementById('O_DL');
const o_sg = document.getElementById('O_SG');
const o_ds = document.getElementById('O_DS');
const o_fd = document.getElementById('O_FD');
const o_gl = document.getElementById('O_GL');
const o_gz = document.getElementById('O_GZ');



const dom = async () => {
    const response = await fetch("https://auto-system.onrender.com/api/6");
    const data = await response.json();
    console.log(data);

    for (let i = 0; i < data.length; i++) {

        if (data[i].name == 'delhi bazar' && data[i].today.length < 5 && data[i].today.length != 0) {
            dl.innerText = data[i].today;
            o_dl.innerText = data[i].yesterday;
        }
        if (data[i].name == 'shri ganesh' && data[i].today.length < 5 && data[i].today.length != 0) {
            sg.innerText = data[i].today;
            o_sg.innerText = data[i].yesterday;
        }
        if (data[i].name == 'disawar' && data[i].today.length < 5 && data[i].today.length != 0) {
            ds.innerText = data[i].today;
            o_ds.innerText = data[i].yesterday
        }
        if (data[i].name == 'faridabad' && data[i].today.length < 5 && data[i].today.length != 0) {
            fd.innerText = data[i].today;
            o_fd.innerText = data[i].yesterday;
        }
        if (data[i].name == 'gali' && data[i].today.length < 5 && data[i].today.length != 0) {
            gl.innerText = data[i].today;
            o_gl.innerText = data[i].yesterday;
        }
        if (data[i].name == 'gaziyabad' && data[i].today.length < 5 && data[i].today.length != 0) {
            gz.innerText = data[i].today;
            o_gz.innerText = data[i].yesterday;
        }
    }
}
dom();
setInterval(() => {
    dom();
}, 10000);
