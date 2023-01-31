<template>
  <input
      class="input"
      :placeholder="placeholder"
      @input="input"
  >
</template>

<script>
export default {
  name: "base-input",
  props: {
    placeholder: {
      type: String,
      required: true,
      default: '',
    }
  },
  methods: {
    input($event) {
      this.$emit('input', $event.target.value)
    },
  }
}
</script>

<style scoped lang="scss">
.input {
  font-size: 18px;
  margin-left: 15px;
  outline: 0;
  outline-offset: 0;
  border: transparent;
}
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance:textfield;
}

</style>
