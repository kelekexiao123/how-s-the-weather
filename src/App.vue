<template>
    <div id="app" v-loading="searchLoading" element-loading-text="正在夜观星象...">
        <div class="today" id="today">
            <el-row>
                <el-col :span="24">
                    <h1 class="city">{{ city }}</h1>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center" align="middle">
                <el-col :span="6">
                    <img :src="now.nowPic" class="now-img">
                </el-col>
                <el-col :span="6">
                    <h1>{{ now.nowTxt }}</h1>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <h1>{{ now.nowTmp }}℃</h1>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <h4>{{ now.nowDir }}</h4>
                </el-col>
                <el-col :span="6">
                    <h4>{{ now.nowSc }}</h4>
                </el-col>
                <el-col :span="8">
                    <h4>相对湿度{{ now.nowHum }}%</h4>
                </el-col>
            </el-row>
        </div>
    
        <el-row :gutter="10">
            <el-col :span="8" v-for="(item, index) in forecast" :key="'item' + index">
                <div class="forecastItem">
                    <h4>{{ item.forecastDate }}</h4>
                    <img :src="item.forecastPic">
                    <h1>{{ item.forecastTmp }}</h1>
                    <h4>{{ item.forecastTxt }}</h4>
                </div>
            </el-col>
        </el-row>
    
    </div>
</template>

<script>
// import ForecastWeather from './components/ForecastWeather'

export default {
    name: 'app',
    data() {
        return {
            searchLoading: true,
            city: '长沙',
            now: {
                nowPic: '',
                nowTxt: '',
                nowTmp: '',
                nowDir: '',
                nowSc: '',
                nowHum: '',
            },

            forecast: []
        }
    },
    created() {
        fetch(`https://free-api.heweather.com/v5/weather?city=${this.city}&key=df3cc12e6f074b24bce8337997cc7641`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let nowData = data.HeWeather5[0].now
                this.now.nowPic = `http://files.heweather.com/cond_icon/${nowData.cond.code}.png`
                this.now.nowTxt = nowData.cond.txt
                this.now.nowTmp = nowData.tmp
                this.now.nowDir = nowData.wind.dir
                this.now.nowSc = nowData.wind.sc
                this.now.nowHum = nowData.hum

                let forecastDatas = data.HeWeather5[0].daily_forecast
                forecastDatas.forEach((data, index) => {
                    console.log(data)
                    let tempData = {}
                    tempData.forecastDate = data.date
                    tempData.forecastPic = `http://files.heweather.com/cond_icon/${data.cond.code_d}.png`
                    tempData.forecastTmp = data.cond.txt_d
                    tempData.forecastTxt = `${data.tmp.min} ~ ${data.tmp.max}℃`
                    this.forecast.push(tempData)
                })

                this.searchLoading = false
            })
            .catch(err => {
                console.log(err)
                this.searchLoading = false
            })
    }

}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*text-shadow: 1px 1px 6px #333;*/
    margin-top: 60px;
}

.today {
    padding-bottom: 30px;
}


.now-img {
    width: 60px;
}

.forecastItem {
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .3);
}

.forecastItem img {
    width: 100px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 5px;
}
</style>
