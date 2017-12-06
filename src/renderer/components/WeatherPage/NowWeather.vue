<template>
  <el-row type="flex" justify="center" align="middle" v-loading="weatherIsLoading" element-loading-text="正在夜观星象..."  v-if="weatherCompDisplay">
    <el-col :span="24">
      <h1 class="city">{{curCity}}</h1>
      <div class="row_detail">
        <img :src="nowWeatherMsg.pic">
        <h1>{{nowWeatherMsg.tmp}}<span>℃</span></h1>
      </div>
      <div class="wind">
        <h2>{{nowWeatherMsg.cond_txt}}</h2>
        <h4>{{nowWeatherMsg.wind_dir}} {{nowWeatherMsg.wind_sc}} 相对湿度{{nowWeatherMsg.hum}}%</h4>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('weather', [
      'curCity',
      'nowWeatherMsg',
      'weatherIsLoading'
    ]),
    ...mapGetters('weather', [
      'weatherCompDisplay'
    ])
  },

  methods: {

  }
}
</script>

<style>

</style>
