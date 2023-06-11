<template>
  <div>
    <button v-if="remainingSeconds <= 0" @click="startCountdown">开始倒计时</button>
    <span v-else>倒计时：{{ remainingSeconds }} 秒</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: null, // 倒计时开始时间
      durationSeconds: 60, // 倒计时时长，单位秒
      timer: null, // 定时器
    };
  },
  computed: {
    remainingSeconds() {
      // 计算剩余秒数
      const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      return Math.max(this.durationSeconds - elapsedSeconds, 0);
    },
  },
  methods: {
    startCountdown() {
      // 开始倒计时
      this.startTime = Date.now();
      this.timer = setInterval(() => {
        if (this.remainingSeconds <= 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
};
</script>