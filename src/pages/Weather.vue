<template>
  <q-page class="gradient-bg q-pa-lg flex column" :class="bgClass">
    <q-input v-model="search" placeholder="Search" dark borderless @keyup.enter="getWeatherBySearch">
      <template v-slot:before>
        <q-icon class="cursor-pointer" @click="getLocation" name="my_location"/>
      </template>
      <template v-slot:append>
        <q-btn round dense flat icon="search" @click="getWeatherBySearch"/>
      </template>
    </q-input>
    <template v-if="weatherData">
      <div class="col text-white text-center">
        <div class="text-h4 text-weight-light">
          {{weatherData.name}}
        </div>
        <div class="text-h6 text-weight-light">
          {{weatherData.weather[0].main}}
        </div>
        <div class="text-h1 text-weight-thin q-my-lg">
          {{Math.round(weatherData.main.temp-273.15)}}&deg;C
        </div>
      </div>
      <div class="col text-center">
        <img :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`">
      </div>
    </template>
    <template v-else>
      <div class="col column text-center text-white">
        <div class="col text-h2 text-weight-thin">
          Weather
        </div>
        <q-btn class="col" flat @click="getLocation">
          <q-icon left size="3em" name="my_location"/>
          <div>Find my Location</div>
        </q-btn>
      </div>
    </template>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      search: '',
      weatherData: null,
      lat: null,
      long: null,
      apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
      apiKey: 'cc9cc86d92feca5635c51a9cbc58131f',
      test: 5
    }
  },
  computed: {
    // eslint-disable-next-line
    bgClass() {
      if (this.weatherData) {
        if (this.weatherData.weather[0].icon.endsWith('n')) {
          return 'bg-night'
        } else {
          return 'bg-day'
        }
      }
    }
  },
  methods: {
    getLocation () {
      this.$q.loading.show()
      if (this.$q.platform.is.electron) {
        axios.get('https://freegeoip.app/json/').then(response => {
          this.lat = response.data.latitude
          this.long = response.data.longitude
          this.getWeatherByCoords()
        })
      } else {
        navigator.geolocation.getCurrentPosition( 
          position => {
            this.lat = position.coords.latitude
            this.long = position.coords.longitude
            this.getWeatherByCoords()
          }
        )
      }
    },
    getWeatherByCoords() {
      this.$q.loading.show()
      axios.get(`${ this.apiUrl }?lat=${this.lat}&lon=${this.long}&appid=${this.apiKey}&units=metrics`).then(response => {
        console.log(response.data)
        this.weatherData = response.data
        this.$q.loading.hide()
      }).catch(e => {
        this.$q.loading.hide()
        this.$q.notify({
          color: 'negative',
          message: 'Couldn\'t get location'
        })
      })
    },
    getWeatherBySearch() {
      this.$q.loading.show()
      axios.get(`${ this.apiUrl }?q=${this.search}&appid=${this.apiKey}&units=metrics`).then(response => {
        this.weatherData = response.data
        this.$q.loading.hide()
      }).catch(e => {
        this.$q.loading.hide()
        this.$q.notify({
          color: 'negative',
          message: 'City name unknown'
        })
      })
      this.search = ''
    },
  }
}
</script>

<style lang="scss">
.gradient-bg {
  background: linear-gradient(to bottom, #136a8a, #267871);
  &.bg-night {
    background: linear-gradient(to bottom, #232526, #414345);
  }
  &.bg-day {
    background: linear-gradient(to bottom, #00b4db, #0083b0);
  }
}
</style>