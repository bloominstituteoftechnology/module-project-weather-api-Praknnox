async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  document.querySelector('#weatherWidget').style.display='none'
  document.querySelector('#citySelect').addEventListener('change',async ev=>{
    console.log('change now')
    try{
      ev.target.setAttribute('disabled','disabled')
      document.querySelector('#weatherWidget').style.display='none'
      document.querySelector('.info').textContent='Fetching weather data...'
      console.log(ev.target.value)
      let cityfolk=ev.target.value
      let gurl=`http://localhost:3003/api/weather?city=${cityfolk}`
      console.log(gurl)
      let respond=await axios.get(gurl)
      document.querySelector('#weatherWidget').style.display='block'
      document.querySelector('.info').textContent=''
      ev.target.removeAttribute('disabled')
      let {data}=respond
      document.querySelector('#apparentTemp div:nth-child(2)').textContent=`${data.current.apparent_temperature}°`
      document.querySelector('#todayDescription').textContent=descriptions.find(de=>de[0]===data.current.weather_description)[1]
      document.querySelector('#todayStats div:nth-child(1)').textContent=`${data.current.temperature_min}°/${data.current.temperature_max}°`
      document.querySelector('#todayStats div:nth-child(2)').textContent=`Precipitation: ${data.current.precipitation_probability*100}%`
      document.querySelector('#todayStats div:nth-child(3)').textContent=`Humidity: ${data.current.humidity}%`
      document.querySelector('#todayStats div:nth-child(4)').textContent=`Wind: ${data.current.wind_speed}m/s`
      data.forecast.daily.forEach((jour,dex)=>{
        let monstah=document.querySelectorAll('.next-day')[dex]
        let weak=monstah.children[0]
        let transparent=monstah.children[1]
        let minmaxer=monstah.children[2]
        let wtype=monstah.children[3]
        weak.textContent=whatday(jour.date)
        transparent.textContent=descriptions.find(xy=>xy[0]===jour.weather_description)[1]
        minmaxer.textContent=`${jour.temperature_min}°/${jour.temperature_max}°`
        wtype.textContent=`Precipitation: ${jour.precipitation_probability*100}%`
      })
      document.querySelector('#location').firstElementChild.textContent=data.location.city
    }catch(eror){
      console.log('Promise rejected with err.message-->',eror.message)
    }
  })
  function whatday(string){
    let days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let theday=new Date(string)
    let indonesia=theday.getDay()
    let actual=days[indonesia]
    return actual
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
