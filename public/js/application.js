document.addEventListener('DOMContentLoaded', async () => {
 
  const today =await (await fetch('/templates/today.hbs')).text()
  const template = Handlebars.compile(today)

  const formGo =await (await fetch('/templates/formGo.hbs')).text()
  const templateGo = Handlebars.compile(formGo)

  const section = document.querySelector('section')
  const weatherBut = document.querySelector('.button')
  // console.log(weatherBut);
  if(weatherBut){
    weatherBut.addEventListener('click', async () => {
      const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=198dc450a8e84294bf0132336212303&q=60.143908,29.927059&days=7', ({
        method: 'GET',
        headers: { 'Content-Type': 'Application/json' }
      }))
      const answer = await response.json()
      section.innerHTML = ''
      const location = { location: answer.location }
      const update = answer.current.last_updated
      const h4 = document.createElement('h4')
      h4.innerText = `
      Спот: ${location.location.name}
      Последнее обновление данных: ${update}`
      section.appendChild(h4)
      // console.log(location, update);
      // const titleTab = ['час', 'температура воздуха С', 'направление ветра', 'сила ветра', 'облочность %']
      const days = answer.forecast.forecastday
      for (let i = 0; i < days.length; i++) {
        const day = { day: days[i].date, sunrise: days[i].astro.sunrise, sunset: days[i].astro.sunset }
        const p = document.createElement('p')
        p.innerText = `
        число: ${day.day}, рассвет: ${day.sunrise}, закат: ${day.sunset}
        `
        const dayNow = days[i].date
        section.appendChild(p)
          let time = []
          let temp = []
          let windDir = []
          let wind = []
          let cloud = []
          let timevawes = []
        const hours = days[i].hour
        for (let j = 0; j < hours.length; j++) {
          let time1 = hours[j].time
          time1 = time1.split(' ')
          time.push(time1[1])
          temp.push(hours[j].temp_c)
          windDir.push(hours[j].wind_dir)
          let windSpeed = Math.floor(hours[j].wind_kph*0.28*10)/10
          let windObj = {}
          if(windSpeed>=4 ){
          // if(windSpeed>=6 && hours[j].wind_dir==='WNW' || windSpeed>=6 && hours[j].wind_dir==='NNW' || windSpeed>=6 && hours[j].wind_dir==='NW'){
            windObj = {color: "#FFB873", speed: windSpeed}
            timevawes.push(time1[1])
          } else{
            windObj = {color: "none", speed: windSpeed}
          }
          wind.push(windObj)
          cloud.push(hours[j].cloud)
  
        }
        
        console.log(time);
        timevawes.splice(0,3)
        time1= timevawes[0]
        time2= timevawes[timevawes.length-1]
  
        const div = document.createElement('div')
        div.innerHTML = template({time, temp, windDir, wind, cloud, time1, time2})
        section.appendChild(div)
        const go = document.querySelectorAll('.go')
        const formGo = document.querySelectorAll('.forForm')
        for (let i = 0; i < go.length; i++) {
          go[i].addEventListener('click',async ()=>{
            const response = await fetch('/go/day',({
              method: 'Post',
              headers: { 'Content-Type': 'Application/json' },
              body: JSON.stringify({dayNow})
            }))
            const answer = await response.json()
            if(!answer){
              alert('Сначала войдите в свой аккаунт!')
            }else{
              const div1 = document.createElement('div')
              div1.innerHTML = templateGo(dayNow)
              formGo[i].innerHTML = ''
              formGo[i].appendChild(div1)
              
            }
          })
          
          
        }
      }
      // console.log(answer);
       
    })

  }
})
// 4299 flotskiy MSW
