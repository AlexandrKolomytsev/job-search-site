<template>
  <div class="modal" @click="closeModal">
    <div class="modal-background" @click="closeModal" />
    <div class="modal-content" @click.stop>
      <slot />
      <button class="close-btn" @click.prevent="closeModal">
        <span class="modal-close" />
      </button>
    </div>
  </div>
</template>

<script>
import { modalOpen, modalClose } from "../../js/helpers/modal-management";

export default {
  name: "base-modal",
  mounted() {
    modalOpen()
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  },
  beforeDestroy() {
    modalClose()
  }
}
</script>

<style scoped lang="scss">
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  outline: 0;

  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: .5;
  }

  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: fit-content;
    max-width: 500px;
    background: #ffffff;
    z-index: 1041;
  }

  .close-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
    cursor: pointer;
    border: transparent;
    background: transparent;
  }

  .close-btn:hover {
    opacity: .7;
  }

  .close-btn:before, .close-btn:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 15px;
    width: 3px;
    background-color: #000000;
  }

  .close-btn:before {
    transform: rotate(45deg) translate(-6px, -6px);
  }

  .close-btn:after {
    transform: rotate(-45deg) translate(6px, -6px);
  }
}
</style>
