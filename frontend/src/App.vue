<template>
  <div id="app">
    <Clock/>
  </div>
</template>

<script>
  import Clock from './components/Clock.vue'

  export default {
    name: 'app',
    components: {
      Clock
    }
  }
</script>

<style lang="scss">
  @import './styles/global';

  #app {
    width: 480px;
    height: 480px;
  }
</style>
