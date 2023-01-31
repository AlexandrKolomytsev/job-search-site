<template>
  <div class="input-wrapper">
    <span class="input-name">{{name}}</span>
    <span v-if="error" class="error">{{error}}</span>
    <slot />
  </div>
</template>

<script>
export default {
  name: "base-input-area",
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    error: {
      type: String,
      required: false,
      default: '',
    },
  }
}
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  height: 60px;
  background: #fff;
  border: 1px solid #999999;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  & .input-name {
    position: absolute;
    top: -10px;
    left: 20px;
    padding: 0 12px;
    background: #ffffff;
    color: #999999;
  }

  & .error {
    font-size: 14px;
    position: absolute;
    bottom: -20px;
    color: red;
    left: 0;
  }
}
</style>
