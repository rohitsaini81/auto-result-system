const dom = async () => {
    const response = await fetch('https://auto-system.onrender.com/api/6');
      const data = await response.json();
      console.log(data);
      const out = document.getElementById('OUT')
      const dl = document.getElementById('_DL');
      const sg = document.getElementById('_SG');
      const ds = document.getElementById('_DS');
      const fd = document.getElementById('_FD');
      const gl = document.getElementById('_GL');
      const gz = document.getElementById('_GZ');
      out.innerText +=data.map((item) => item.today).join(' ');
      // console.log(data[0].today)
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == 'DL_Satta') {
          dl.innerHTML = data[i].today;
        }
        if (data[i].name == 'delhi bazar') {
          dl.innerHTML = data[i].today;
        }
        if (data[i].name == 'shri ganesh') {
          sg.innerHTML = data[i].today;
        }
        if (data[i].name == 'disawer') {
          ds.innerHTML = data[i].today;
        }
        if (data[i].name == 'faridabad') {
          fd.innerHTML = data[i].today;
        }
        if (data[i].name == 'gali') {
          gl.innerHTML = data[i].today;
        }
        if (data[i].name == 'gaziyabad') {
          gz.innerHTML = data[i].today;
        }
      }
  }
  dom();