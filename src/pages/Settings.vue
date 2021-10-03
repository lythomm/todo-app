<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none q-mb-sm">Settings</h5>
      <div>
        <div class="text-subtitle1">
          Change color
        </div>
        <q-btn class="q-mr-sm" v-for="color in colors" :key="color.name" :color=color.name @click="changePrimaryColor(color.hex)" />
      </div>
      <div>
        <div class="q-pt-lg text-subtitle1">
          User information
        </div>
        <div>
          <div class="row">
            <p class="col-3"> First name : </p>
            <p class="col userInfo"> {{ getUserData.firstName }} </p>
          </div>
          <div class="row">
            <p class="col-3"> Last name : </p>
            <p class="col userInfo"> {{ getUserData.lastName }} </p>
          </div>
          <div class="row">
            <p class="col-3"> Email : </p>
            <p class="col userInfo"> {{ getUserData.email }} </p>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { setCssVar } from 'quasar'

export default {
  data () {
    return {
      colors: [
        { name: 'red', hex: '#F44336' },
        { name: 'pink', hex: '#E91E63' },
        { name: 'purple', hex: '#9B27AF' },
        { name: 'indigo', hex: '#086491' },
        { name: 'green', hex: '#4CAF50' },
        { name: 'yellow', hex: '#FFEB3B' },
        { name: 'orange', hex: '#FF9800' },
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['getUserData'])
  },
  methods: {
    changePrimaryColor(newColor) {
      setCssVar('primary', newColor)
    }
  }
}
</script>

<style lang="scss">
.userInfo {
  background-color: #f2f2f0;
}
</style>