<template>
  <div class="options-wrapper">
    <div
        v-for="item in mas" :key="item"
        class="option"
        @click="choiceItem"
    >
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: "base-select-options",
  data () {
    return {
      showOptions: false,
    }
  },
  props: {
    mas: {
      type: Array,
      required: false,
    }
  },
  methods: {
    choiceItem (e) {
      this.$emit('select', e.target.outerText)
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/css/_variables.scss';
@import '@/css/_mixin.scss';
.options-wrapper {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  max-height: 200px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  @include scrollbarMin();

  & .option {
    padding: 10px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: $baseGreen;
    }
  }
}
</style>
