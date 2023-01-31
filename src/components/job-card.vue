<template>
  <div class="vacancy-wrapper">
    <div class="vacancy">
      <span
          class="vacancy__city"
          v-text="vacancies.placetitle"
      />
      <p class="vacancy__title" v-text="vacancies.proftitle" />
      <div class="vacancy__info-block">
        <span class="vacancy__salary" v-text="vacancies.salary_volume_ex" />
        <span class="vacancy__direction" v-text="vacancies.directiontitle"></span>
        <span class="vacancy__client-mane" v-text="vacancies.clientname"></span>
      </div>
      <button class="vacancy__detailed-button">Подробнее</button>
      <button class="vacancy__respond-button" @click="openModal">Откликнуться</button>
      <baseModal v-if="modalOpen" :open="modalOpen" @closeModal="closeModal">
        <formRespond @formComplete="closeModal" />
      </baseModal>
    </div>
  </div>
</template>

<script>
import baseModal from "./UI/base-modal"
import formRespond from "./form-respond"

export default {
  name: "job-card",
  components: { baseModal, formRespond },
  data() {
    return {
      modalOpen: false,
    }
  },
  props: {
    vacancies: {
      type: Object,
      required: false,
      default: () => {},
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    },
    closeModal() {
      this.modalOpen = false
    }
  }

}
</script>

<style scoped lang="scss">
@import '@/css/_variables.scss';
.vacancy-wrapper {
  width:calc((100%) / 3 );
  margin-bottom: 15px;

  & .vacancy {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: $baseGreen;
    margin: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 20px;
    border-radius: 6px;

    & .vacancy__city {
      font-size: 14px;
      line-height: 16px;
      color: #ffffff;
      margin-bottom: 16px;
    }

    & .vacancy__title {
      padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid #e1e1e1;
      font-weight: 500;
      font-size: 30px;
      line-height: 30px;
      color: #ffffff;
    }

    & .vacancy__info-block {
      display: flex;
      flex-direction: column;

      & span {
        font-size: 18px;
        line-height: 21px;
        font-weight: 500;
        margin-bottom: 21px;
        color: #ffffff;
      }
    }

    & button {
      padding: 15px;
      width: 100%;
      text-align: center;
      border-radius: 6px;
      color: #ffffff;
      border: 1px solid #fff;
      background: transparent;
      font-size: 18px;
      font-weight: 500;
      line-height: 21px;
      margin-bottom: 10px;
      cursor: pointer;
    }

    & button ~ button {
      border: transparent;
      background: #fd7f23;
      margin-bottom: 0;
    }
  }
}

</style>
