var chrt=null;

function getinfo() {
     let cntry,maxt,mint;
     let dates=[],values=[];
     let xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function () {
       if (this.status == 200 && this.readyState == 4) {
         let data = JSON.parse(xhttp.responseText);
         console.log(data);
         cntry = data.city.country;
         maxt = data.list[0].main.temp_max;
         mint = data.list[0].main.temp_min;
         for(let i=5;i<data.list.length;i+=8) {
           dates.push((data.list[i].dt_txt).slice(0,10));
           values.push(data.list[i].main.temp_max);
         }
         console.log(dates)
       }
     }
     let cityname = document.getElementById('inp').value;
     let apikey = "a59c7629af388714789350f321c4a446";
     xhttp.open('GET', `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apikey}&units=metric`, false);
     xhttp.send();


    // graph representation
    const ctx = document.getElementById('myChart');
    document.getElementById('f').innerHTML = `Country Name : ${cntry}`;
    document.getElementById('s').innerHTML = `Max Temp is : ${maxt}&#176;C`;
    document.getElementById('t').innerHTML = `Min Temp is : ${mint}&#176;C`;
    document.getElementById('lst').innerHTML = `This information is according to the time : 06:00:00`;

    if(chrt!=null) chrt.destroy();
    chrt = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: 'Temperature',
          data: values,
          backgroundColor : ["#f0a04b", "#f64c72", "#bc986a", "#5cdb95", "#3feee6"],
          borderWidth: 2
        }],
      },
     
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}  
  