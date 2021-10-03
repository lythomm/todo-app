<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bgprimary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
    </q-header>

     <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list>
            <q-item to="/" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="check_circle" />
              </q-item-section>
              <q-item-section>
                Todo
              </q-item-section>
            </q-item>

            <q-item to="/note" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="edit_note" />
              </q-item-section>
              <q-item-section>
                Note
              </q-item-section>
            </q-item>

            <q-item to="/weather" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="thermostat" />
              </q-item-section>
              <q-item-section>
                Weather
              </q-item-section>
            </q-item>

            <q-item to="/help" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>
              <q-item-section>
                Help
              </q-item-section>
            </q-item>

            <div class="absolute-bottom">
              <q-separator />

              <q-item to="/settings" exact clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section>
                  Settings
                </q-item-section>
              </q-item>
              <q-item to="/info" exact clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="info" />
                </q-item-section>
                <q-item-section>
                  Information
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://e7.pngegg.com/pngimages/676/782/png-clipart-night-sky-star-background-material-blue-night-sky-star.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://pbs.twimg.com/profile_images/1388946313992187904/sRciJ7qF_400x400.jpg">
            </q-avatar>
            <div class="text-weight-bold"> {{ this.getUserData.firstName }} {{ this.getUserData.lastName }} </div>
            <div>{{ this.getUserData.email }}</div>
          </div>
        </q-img>
      </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapGetters('user', ['getUserData']),
    todaysDate() {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd DD MMMM YYYY')
    }
  }

});
</script>

<style lang="scss">
.bgprimary {
  background-color: &primary;
}
</style>