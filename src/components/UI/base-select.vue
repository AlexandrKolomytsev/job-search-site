<template>
  <div>
    <div class="select-toggle__wrapper" :class="{'active': showOptions}">
      <div
          class="select-toggle"
          @click="optionsToggle"
      >
        <p class="select-toggle__text" ref="regionText">{{placeholder}}</p>
        <p class="select-toggle__name">{{name}}</p>
        <div
            v-if="showOptions"
            class="input-wrapper"
            @click.stop
        >
          <input
              class="input"
              type="text"
              ref="query-input"
              @input="inputChange"
          >
        </div>
      </div>
      <base-select-options
          class="select-options"
          v-if="showOptions"
          @click.stop
          @select="choiceSelect"
          :mas="selectList"
          v-click-outside="hideOptions"
      />
    </div>
  </div>
</template>

<script>
import baseSelectOptions from "./base-select-options"
import ClickOutside from 'vue-click-outside'
import { mapState } from "vuex"
export default {
  name: "base-select",
  components: {
    baseSelectOptions,
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      showOptions: false,
      selectList: [],
    }
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    selects: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: mapState(["vacancies"]),

  async mounted() {
    this.popupItem = this.$el
  },
  methods: {
    optionsToggle() {
      this.showOptions = !this.showOptions
      if (this.showOptions) {
        this.$nextTick(() => {
          this.$refs['query-input'].focus();
        });
      }
    },
    hideOptions() {
      this.showOptions = false
    },
    choiceSelect(option) {
      this.showOptions = false
      this.$emit('changeSelect', option)
    },
    inputChange(event) {
      if (event.target.value) {
        this.selectList = this.selects.filter(
            el => el.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        )
      } else {
        this.selectList = this.selects
      }
    },
  },
  watch: {
    'selects': {
      handler: function () {
        this.selectList = this.selects
        if (this.selectList.length === 1){
          this.choiceSelect(this.selectList[0])
        }
      }
    },
  }
}
</script>

<style scoped lang="scss">
.select-toggle__wrapper {
  position: relative;

  & .select-toggle {
    height: 60px;
    background: #fff;
    border: 1px solid #999999;
    border-radius: 4px;
    position: relative;
    cursor: pointer;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 15px;
      border: 5px solid transparent;
      border-top: 5px solid #999999;
    }

    & .select-toggle__name {
      position: absolute;
      top: -10px;
      left: 20px;
      padding: 0 12px;
      background: #ffffff;
      color: #999999;
    }

    & .select-toggle__text{
      display: flex;
      align-items: center;
      margin-left: 15px;
      height: 100%;
      font-weight: 700;
      font-size: 12px;
      width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.active {
  z-index: 2;

  & .select-options{
    z-index: 1;
  }
}
.input-wrapper {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);

  & .input {
    border: none;
    outline: none;
  }
}
</style>
