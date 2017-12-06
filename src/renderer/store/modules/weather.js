const state = {
  curCity: '',
  nowWeatherMsg: {
    // 'cond_code': '101',
    // 'cond_txt': '多云',
    // 'fl': '16',
    // 'hum': '73',
    // 'pcpn': '0',
    // 'pres': '1017',
    // 'tmp': '14',
    // 'vis': '1',
    // 'wind_deg': '11',
    // 'wind_dir': '北风',
    // 'wind_sc': '微风',
    // 'wind_spd': '6',
    // 'pic': 'http://files.heweather.com/cond_icon/104.png'
  },
  forecastWeatherMsg: [
    {
      // 'cond_code_d': '103',
      // 'cond_code_n': '101',
      // 'cond_txt_d': '晴间多云',
      // 'cond_txt_n': '多云',
      // 'date': '2017-10-26',
      // 'hum': '57',
      // 'pcpn': '0.0',
      // 'pop': '0',
      // 'pres': '1020',
      // 'tmp_max': '16',
      // 'tmp_min': '8',
      // 'uv_index': '3',
      // 'vis': '16',
      // 'wind_deg': '0',
      // 'wind_dir': '无持续风向',
      // 'wind_sc': '微风',
      // 'wind_spd': '5',
      // 'pic_d': 'http://files.heweather.com/cond_icon/103.png',
      // 'pic_n': 'http://files.heweather.com/cond_icon/101.png'
    }
  ],
  weatherIsLoading: false,
  cities: [
    {
      value: 'Beijing',
      label: '北京'
    }, {
      value: 'Shanghai',
      label: '上海'
    }, {
      value: 'Shenzhen',
      label: '深圳'
    }, {
      value: 'Changsha',
      label: '长沙'
    }, {
      value: 'Zhuzhou',
      label: '株洲'
    }, {
      value: 'Nanjing',
      label: '南京'
    }, {
      value: 'Chengdu',
      label: '成都'
    }, {
      value: 'Guangzhou',
      label: '广州'
    }
  ]
}

const getters = {
  weatherCompDisplay: state => {
    return state.curCity === '' ? false : true
  }
}

const mutations = {
  setCurCity(curState, payload) {
    curState.curCity = payload.curCity
  },
  setWeatherLoading(curState, payload) {
    curState.weatherIsLoading = payload.status
  },
  setNowWeatherMsg(curState, payload) {
    curState.nowWeatherMsg = payload.now
  },
  setForecastWeatherMsg(curState, payload) {
    curState.forecastWeatherMsg = payload.forecast
  }
}

const actions = {

  async fetchWeather({ commit, curState }, payload) {
    commit('setWeatherLoading', { status: true })
    commit('setCurCity', payload)
    try{
      const nowWeatherRes = await fetch(`https://free-api.heweather.com/s6/weather/now?location=${payload.curCity}&key=df3cc12e6f074b24bce8337997cc7641`)
      const forecastWeatherRes = await fetch(`https://free-api.heweather.com/s6/weather/forecast?location=${payload.curCity}&key=df3cc12e6f074b24bce8337997cc7641`)
      const nowData = await nowWeatherRes.json()
      const forecastData = await forecastWeatherRes.json()
      let now = nowData.HeWeather6[0].now
      now.pic = `http://files.heweather.com/cond_icon/${now.cond_code}.png`
      let forecast = forecastData.HeWeather6[0].daily_forecast
      forecast.forEach(ele => {
        ele.pic_d = `http://files.heweather.com/cond_icon/${ele.cond_code_d}.png`
        ele.pic_n = `http://files.heweather.com/cond_icon/${ele.cond_code_n}.png`
      });
      
      commit('setNowWeatherMsg', { now })
      commit('setForecastWeatherMsg', { forecast })
      commit('setWeatherLoading', { status: false })
    } catch(err) {
      commit('setWeatherLoading', { status: false })
      console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
