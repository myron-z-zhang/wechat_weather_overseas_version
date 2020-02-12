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
    forecast: []
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
        city: 'haikou'
      },
      success: res => {
        let result = res.data.result
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

        let forecast = []
        let nowHour = new Date().getHours()
        for (let i = 0; i < 24; i += 3) {
          forecast.push({
            time: (i + nowHour) % 24 + ':00',
            iconPath: '/images/sunny-icon.png',
            temp: '12'
          })
        forecast[0].time = 'now'
        this.setData({
          forecast: forecast
        })
        }
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})