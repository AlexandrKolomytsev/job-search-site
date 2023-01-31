<template>
  <div class="container">
    <div class="filter">
      <div class="filter__wrapper">
        <div class="filter__items">
          <base-select
              :placeholder="placeholderRegionName || basePlaceholderRegionName"
              :selects="options.regionName"
              :name="'Регион'"
              @changeSelect="regionFilter"
          />
          <base-select
              :class="{ 'select-disable': !options.cityName.length }"
              :placeholder="placeholderCityName || basePlaceholderCityName"
              :selects="options.cityName"
              :name="'Город'"
              @changeSelect="cityFilter"
          />
          <base-select
              :class="{ 'select-disable': !options.clientName.length }"
              :placeholder="placeholderClientName || basePlaceholderClientName"
              :selects="options.clientName"
              :name="'Организация'"
              @changeSelect="clientFilter"
          />
        </div>
      </div>
    </div>
    <div class="job-cards__wrapper">
      <div class="job-cards__block">
        <jobCard v-for="item in paginationFilteredVacancies" :key="item.vacancy_id" :vacancies="item"/>
      </div>
      <paginate
          :page-count="paginationPage"
          :click-handler="curVacanciesOnPage"
          :prev-text="'←'"
          :next-text="'→'"
          :container-class="'pagination-vacancies'"
          :page-link-class="'page-item'"
          :prev-link-class="'page-item arrow'"
          :next-link-class="'page-item arrow'">
      </paginate>
    </div>
    <baseLoader v-show="loading" />
  </div>
</template>

<script>
import baseSelect from "../components/UI/base-select";
import jobCard from "../components/job-card";
import baseLoader from "../components/UI/base-loader";
import paginate from 'vuejs-paginate'
import { mapGetters, mapActions } from "vuex"

export default {
  name: "job-categories",
  components: {
    baseSelect,
    jobCard,
    paginate,
    baseLoader,
  },
  data() {
    return {
      quantityOnPage: 9,
      filteredVacancies: [],
      paginationFilteredVacancies: [],
      curRegionSelect: '',
      curCitySelect: '',
      curClientSelect: '',
      placeholderRegionName: '',
      placeholderCityName: '',
      placeholderClientName: '',
      basePlaceholderRegionName: 'Выберите регион',
      basePlaceholderCityName: 'Выберите город',
      basePlaceholderClientName: 'Выберите организацияю',
      loading: true,
      options: {
        regionName: [],
        cityName: [],
        clientName: []
      },
    }
  },
  computed: {
    ...mapGetters(["allVacancies"]),
    paginationPage() {
      return Math.floor(this.filteredVacancies.length / this.quantityOnPage)
    }
  },
  async mounted() {
    await this.fetchVacancies()
  },
  methods: {
    ...mapActions(["fetchVacancies"]),
    curVacanciesOnPage(page) {
      let previousState = 0
      this.animationUp()
      if (page > 1){
        previousState = page * this.quantityOnPage - this.quantityOnPage
      }
      this.paginationFilteredVacancies = this.filteredVacancies.slice(previousState, page * this.quantityOnPage)
    },
    animationUp() {
      if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        window.scrollBy(0,-20);
        setTimeout(this.animationUp, 10);
      }
    },
    getRegionListSelect() {
      let arr = []
      this.allVacancies.map(el =>(
          el.regionname &&
          arr.push(el.regionname)
      ))
      const newSet = new Set(arr);
      this.options.regionName = Array.from(newSet)
    },
    regionFilter(regionSelectText) {
      this.placeholderRegionName = regionSelectText
      this.placeholderCityName = ''
      this.placeholderClientName = ''
      this.options.cityName = []
      this.options.clientName = []
      this.curRegionSelect = regionSelectText
      this.filteredVacancies = []
      for (const key in this.allVacancies) {
        if (this.allVacancies[key].regionname === this.curRegionSelect){
          this.filteredVacancies.push(this.allVacancies[key])
        }
      }
      this.cityFilterSelect()
    },
    cityFilterSelect() {
      let arr = []
      this.allVacancies.map(el =>(
          (el.regionname && el.regionname === this.curRegionSelect) &&
          arr.push(el.placetitle)
      ))
      const newSet = new Set(arr);
      this.options.cityName = Array.from(newSet)
    },
    cityFilter(citySelectText) {
      this.placeholderCityName = citySelectText
      this.placeholderClientName = ''
      this.options.clientName = []
      this.curCitySelect = citySelectText
      this.filteredVacancies = []
      for (const key in this.allVacancies) {
        if (this.allVacancies[key].regionname === this.curRegionSelect && this.allVacancies[key].placetitle === this.curCitySelect){
          this.filteredVacancies.push(this.allVacancies[key])
        }
      }
      this.companyFilterSelect()
    },
    companyFilterSelect() {
      let arr = []
      this.allVacancies.map(el =>(
          (el.regionname && el.regionname === this.curRegionSelect && el.placetitle === this.curCitySelect) &&
          arr.push(el.clientname)
      ))
      const newSet = new Set(arr);
      this.options.clientName = Array.from(newSet)
    },
    clientFilter(clientFilterText) {
      this.placeholderClientName = clientFilterText
      this.curClientSelect = clientFilterText
      this.filteredVacancies = []
      for (const key in this.allVacancies) {
        if (this.allVacancies[key].regionname === this.curRegionSelect &&
            this.allVacancies[key].placetitle === this.curCitySelect &&
            this.allVacancies[key].clientname === this.curClientSelect
        ){
          this.filteredVacancies.push(this.allVacancies[key])
        }
      }
    }
  },
  watch: {
    'allVacancies': {
      handler: function () {
        this.filteredVacancies = this.allVacancies
        this.getRegionListSelect()
        this.loading = false
      },
    },
    'filteredVacancies': {
      handler: function () {
        this.curVacanciesOnPage(1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  max-width: 1200px;

  & .filter {
    width: 25%;
    position: sticky;
    height: 100%;
    top: 10px;

    & .filter__wrapper {
      width: 300px;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    & .filter__items {
      width: 200px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  & .job-cards__wrapper {
    width: 100%;
    min-height: 100vh;

    & .job-cards__block {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.select-disable {
  pointer-events: none;
  opacity: 0.5;
}
</style>
<style lang="scss">
.pagination-vacancies {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 40px;
  gap: 10px;

  & .page-item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 45px;
    min-height: 45px;
    margin-bottom: 10px;
    border-radius: 100px;
    background-color: #fff;
    color: rgba(24,28,42,.5);
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    border: 1px solid #dee2e6;
    transition: all .1s ease-out;
    cursor: pointer;
  }

  & .active {
    & .page-item{
      background-color: #fd7f23;
      border-color: #fd7f23;
      color: #fff;
    }
  }

  & .arrow {
    padding: 10px 22px;
  }
}
</style>
