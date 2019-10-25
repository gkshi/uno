<template lang="pug">
  .notification-component
    transition
      .notification-wrapper(v-if="true")
        .notification.flex.center
          div notification
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'notification-component',
  computed: {
    ...mapState({
      storeNotification: state => state.notification
    }),
    show () {
      return this.storeNotification
    }
  }
}
</script>

<style lang="scss" scoped>
  .notification-component {
    .notification-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      background: #ccc;
      transform: translate(-50%, -50%);
    }
    .notification {
      width: 200px;
      height: 100px;
      padding: 10px;
    }
  }
</style>
