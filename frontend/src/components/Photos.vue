<template>
  <transition name="fade">
    <div class="photo-container" v-if="currPhoto">
      <div class="blurred" :style="{backgroundImage: photoURL}"></div>
      <div class="main-img" :style="{backgroundImage: photoURL}"></div>
    </div>
  </transition>
</template>

<script>
  const delayTime = ms => new Promise(resolve => setTimeout(resolve, ms))

  export default {
    name: 'Photos',
    data () {
      return {
        photos: null,
        currPhoto: null,
        interval: null
      }
    },
    computed: {
      photoURL () {
        return `url(http://localhost:3000/photos/${this.currPhoto})`
      }
    },
    mounted () {
      this.axios.get('http://localhost:3000/pictures').then((res) => {
        this.photos = res.data
        let count = this.photos.length
        let rand = Math.floor((Math.random() * count))
        this.currPhoto = this.photos[rand]
        // change every 15 minutes - 90,0000ms
        this.interval = setInterval(this.cyclePhotos, 900000)
        this.$emit('photosReady')
      })
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    methods: {
      async cyclePhotos () {
        let temp = this.currPhoto
        this.currPhoto = null
        let count = this.photos.length
        let rand = Math.floor((Math.random() * count))
        await delayTime(1000)
        while (temp === this.photos[rand]) {
          rand = Math.floor((Math.random() * count))
        }
        this.currPhoto = this.photos[rand]
      }
    }
  }
</script>

<style lang="scss">
  .photo-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;

    .blurred {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left:0;
      background: {
        position: center center;
        repeat: no-repeat;
        size: cover;
      };
      filter: blur(10px);
      z-index: 0;
    }

    .main-img {
      width: calc(100% - 6em);
      height: calc(100% - 6em);
      position: absolute;
      top: 0;
      left:0;
      z-index: 1;
      margin: 3em;
      background: {
        position: right center;
        repeat: no-repeat;
        size: contain;
      };
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .75s linear;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
