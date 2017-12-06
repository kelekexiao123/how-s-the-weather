<template>
  <el-row :gutter="10" v-loading="weatherIsLoading" element-loading-text="正在夜观星象..." v-if="weatherCompDisplay">
    <el-col :span="8" v-for="(item, index) in forecastWeatherMsg" :key="index">
      <div class="forecastItem">
          <h4>{{ item.date }}</h4>
          <img :src="item.pic_d">
          <h1>{{ item.tmp_min }} ~ {{ item.tmp_max }}℃</h1>
          <h4 v-if="item.cond_txt_d !== item.cond_txt_n">{{ item.cond_txt_d }}转{{ item.cond_txt_n }}</h4>
          <h4 v-else>{{ item.cond_txt_d }}</h4>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('weather', [
      'forecastWeatherMsg',
      'weatherIsLoading'
    ]),
    ...mapGetters('weather', [
      'weatherCompDisplay'
    ])
  },
}
</script>

<style scooed>
.forecastItem {
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .3);
}

.forecastItem img {
    width: 100px;
}
</style>
