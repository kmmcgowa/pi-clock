<template>
  <div id="alert">
    <div class="top">
      <div class="date">
        {{time}}
      </div>
      <div class="close" @click="$emit('closeModal')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.05 67.05">
          <path d="M52.83,50l30.4,30.4a1,1,0,0,1,0,1.42l-1.41,1.41a1,1,0,0,1-1.42,0L50,52.83,19.6,83.23a1,1,0,0,1-1.42,0l-1.41-1.41a1,1,0,0,1,0-1.42L47.17,50,16.77,19.6a1,1,0,0,1,0-1.42l1.41-1.41a1,1,0,0,1,1.42,0L50,47.17l30.4-30.4a1,1,0,0,1,1.42,0l1.41,1.41a1,1,0,0,1,0,1.42Z" transform="translate(-16.47 -16.47)"/>
        </svg>
      </div>
    </div>
    <div class="message">
      <h3>It's {{holidayInfo.name}}!</h3>
      <p v-if="holidayInfo.note">{{holidayInfo.note}}</p>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'Alert',
    props: {
      holidayInfo: Object
    },
    computed: {
      time () {
        return moment().format('MMMM Do, YYYY')
      }
    }
  }
</script>

<style lang="scss">
  $blue-grey: #b6c3c9;
  $blue: #7392a0;
  $pink: #c5273a;
  $easeInOutBack: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  #alert {
    width: 90%;
    min-height: 50px;
    background-color: #ffffff;
    border-radius: 10px;
    filter: drop-shadow(0 0 8px rgba(#000, 0.1));
    overflow: hidden;
  }

  .top {
    width: 100%;
    height: 50px;
    border-bottom: 2px solid #b6c3c9;
    display: flex;
    justify-content: space-between;

    .date {
      line-height: 50px;
      margin-left: 1em;
    }

    .close {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 50%;
        height: 50%;
        fill: $pink;
      }
    }
  }

  .message {
    padding: 1em;
    h3 {
      padding-bottom: .5em;
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .9s $easeInOutBack;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(100%);
  }
</style>
