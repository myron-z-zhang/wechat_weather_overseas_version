const weatherMap = {
  'sunny': 'sunny',
  'cloudy': 'cloudy',
  'overcast': 'overcast',
  'lightrain': 'light rain',
  'heavyrain': 'heavy rain',
  'snow': 'snow'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowTemp: '14°',
    nowWeather: 'cloudy',
    nowWeatherBackground: '',
    hourlyWeather: []
  },
  
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    });
  },

  onLoad() {
    this.getNow();
  },
  
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', data: {
        city: 'lasa'
      },
      success: res => {
        let result = res.data.result;
        this.setNow(result);
        this.setHourlyForecast(result);
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setNow(result) {
    let temp = result.now.temp
    let weather = result.now.weather
    console.log(result)
    this.setData({
      nowTemp: temp + '°',
      nowWeather: weatherMap[weather],
      nowWeatherBackground: '/images/' + weather + '-bg.png'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather],
    })
  },

  setHourlyForecast(result) {
    let forecast = result.forecast
    let hourlyWeather = []
    let nowHour = new Date().getHours()
    for (let i = 0; i < 24; i += 3) {
      hourlyWeather.push({
        time: (i + nowHour) % 24 + ':00',
        iconPath: '/images/' + forecast[i / 3].weather + '-icon.png',
        temp: forecast[i / 3].temp + '°'
      })
      hourlyWeather[0].time = 'now'
      this.setData({
        hourlyWeather: hourlyWeather
      })
    }
  }
})