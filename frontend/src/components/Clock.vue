<template>
  <div class="clock-container">
    <div id="clock">
      <div class="clock-face">
        <span v-for="n in 60"
          :key="n"
          class="clock-tick"
          :class="{ 'large-tick': !(n % 5) }"
          :style="{ transform: `rotate(${n * 6}deg)` }">
        </span>
      </div>
      <!--<span class="clock-hand second" :style="seconds"></span>-->
      <span class="clock-hand minute" :style="minutes"></span>
      <span class="clock-hand hour" :style="hours"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Clock',

    data () {
      return {
        rotation: {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      }
    },

    computed: {
      hours () {
        return { transform: `translate3d(-50%, 0, 0) rotate(${this.rotation.hours}deg)` }
      },
      minutes () {
        return { transform: `translate3d(-50%, 0, 0) rotate(${this.rotation.minutes}deg)` }
      },
      seconds () {
        return { transform: `translate3d(-50%, 0, 0) rotate(${this.rotation.seconds}deg)` }
      }
    },

    methods: {
      updateClock () {
        let curdate = new Date()
        this.rotation.hours = (curdate.getHours() + curdate.getMinutes() / 60) / 12 * 360
        this.rotation.minutes = curdate.getMinutes() / 60 * 360
        // this.rotation.seconds = (curdate.getSeconds() + curdate.getMilliseconds() / 1000) / 60 * 360
        requestAnimationFrame(this.updateClock)
      }
    },

    mounted () {
      this.updateClock()
    }
  }
</script>

<style lang="scss">
  $clock-bg: #ffffff;
  $clock-notch: #b6c3c9;
  $clock-hand-blue: #7392a0;
  $clock-hand-pink: #edbec5;

  $clock-size: 50%;

  .clock-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  #clock {
    /*Positioning and Size*/
    /*Should be 75% of its container*/
    width: $clock-size;
    height: $clock-size;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-93%, -50%);
    z-index: 2;

    /*Looks*/
    border-radius: 100%;
    background-color: $clock-bg;
    filter: drop-shadow(0 0 8px rgba(#000, 0.1));

    /*Clock Face*/
    .clock-face {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .clock-tick {
      transform-origin: 50% 100%;
      position: absolute;
      width: 1px;
      height: 49%;
      bottom: 50%;
      left: 50%;

      &::after {
        content: '';
        width: 100%;
        height: 2.5%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: $clock-notch;
      }

      &.large-tick::after {
        width: 2px;
        height: 7.5%;
      }
    }

    /*Clock Hands*/
    .clock-hand {
      transform-origin: 50% 100%;
      background-color: $clock-hand-blue;
      position: absolute;
      width: 2px;
      height: 40%;
      bottom: 50%;
      left: 50%;
      border-radius: 2px;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 10%;
        background-color: inherit;
        backface-visibility: hidden;
      }

      &.hour {
        height: calc(100% / 4);
        width: 3px;
        border-radius: 3px;
      }

      &.minute {
        transition: transform 1s ease-out;
      }

      &.second {
        width: 1px;
        height: 45%;
        border-radius: 0;
        background-color: $clock-hand-pink;

        &::after {
          height: 12.5%;
        }
      }
    }

    /*Pink center dot*/
    &::after {
      top: 50%;
      left: 50%;
      content: '';
      width: 2.5%;
      height: 2.5%;
      position: absolute;
      border-radius: 100%;
      background-color: $clock-hand-blue;
      transform: translate3d(-50%, -50%, 0);
    }
  }
</style>
