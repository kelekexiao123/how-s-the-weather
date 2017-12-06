<template>
  <el-row>
    <el-col :span="24">
      <el-select v-model="curCity" filterable allow-create placeholder="请选择城市名称" @change="chooseCity">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      curCity: ''
    }
  },
  computed: {
    ...mapState('weather', [
      'cities',
    ]),
  },
  methods: {
    ...mapActions('weather', [
      'fetchWeather'
    ]),
    chooseCity: function(value) {
      let label = null
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i].value === value) {
          label = this.cities[i].label
          break
        }
      }
      this.fetchWeather({
        curCity: label || value
      })
    }
  }

}
</script>