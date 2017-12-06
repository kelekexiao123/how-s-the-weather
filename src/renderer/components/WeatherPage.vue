<template>
  <div id="app">
    <city-selection></city-selection>
    <now-weather></now-weather>
    <forecast-weather></forecast-weather>
  </div>
</template>

<script>
import CitySelection from './WeatherPage/CitySelection'
import ForecastWeather from './WeatherPage/ForecastWeather'
import NowWeather from './WeatherPage/NowWeather'

export default {
  components: {
    ForecastWeather,
    NowWeather,
    CitySelection,
  },
  data() {
    return {

    }
  },

}
</script>

<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*text-shadow: 1px 1px 6px #333;*/
    margin-top: 60px;
}

/* .today {
    padding-bottom: 30px;
}

.now-img {
    width: 60px;
}
*/

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 5px;
}
</style>
