<template>
  <div id="app">
    <Clock/>
    <transition name="slide">
      <Alert v-if="(holiday && !error && !closedModal)"
            :holidayInfo="holiday"
            @closeModal="closedModal = true"/>
    </transition>
    <Photos @photosReady="startAlert"/>
  </div>
</template>

<script>
  import Clock from './components/Clock.vue'
  import Alert from './components/Alert'
  import Photos from './components/Photos'

  export default {
    name: 'app',
    components: {
      Clock,
      Alert,
      Photos
    },
    data () {
      return {
        holiday: null,
        error: null,
        closedModal: false
      }
    },
    methods: {
      startAlert () {
        this.axios.get('http://localhost:3000/holidays?force=true').then((res) => {
          console.log(res.data)
          res.data.error
            ? this.error = res.data.error
            : this.holiday = res.data
        }).catch((e) => {
          this.error = e
        })
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/global';
  $bg: #7392a0;

  #app {
    display: grid;
    grid-template-columns: 480px 1fr;
    grid-template-rows: 480px;
    width: 800px;
    height: 480px;
    position: relative;
    align-items: center;
    justify-items: center;
    background: $bg;
  }
</style>
