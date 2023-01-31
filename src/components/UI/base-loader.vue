<template>
  <div class="loader-wrapper">
    <div class="loader-container">
      <div class="lds-dual-ring" />
    </div>
  </div>
</template>

<script>
export default {
  name: "loader"
}
</script>

<style scoped lang="scss">
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000000;
  opacity: 0.4;

  .loader-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
