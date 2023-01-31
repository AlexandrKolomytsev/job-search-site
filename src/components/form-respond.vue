<template>
  <div>
    <span class="form-name">Откликнуться</span>
    <form class="form" action="">
      <baseInputArea :name="'Фамилия'" :error="errorMassage.firstName">
        <baseInput
            v-model="firstName"
            :placeholder="'Фамилия'"
        />
      </baseInputArea>
      <baseInputArea :name="'Имя'" :error="errorMassage.lastName">
        <baseInput
            v-model="lastName"
            :placeholder="'Имя'"
        />
      </baseInputArea>
      <baseInputArea :name="'Отчество'" :error="errorMassage.patronymic">
        <baseInput
            v-model="patronymic"
            :placeholder="'Отчество'"
        />
      </baseInputArea>
      <baseInputArea :name="'Телефон'" :error="errorMassage.phone">
        <input-facade
            v-model="phone"
            class="input"
            :placeholder="'Телефон'"
            mask="+7 (###) ###-####"
        />
      </baseInputArea>
      <div class="checkbox-wrapper">
        <input
            type="checkbox"
            v-model="checkboxApproval"
            @change="v$.checkboxApproval.$touch()"
        >
        <div class="checkbox-text">
          Я даю согласие на обработку своих персональных данных в соответствии с
          <a href="">положением об обработке персональных данных.</a>
        </div>
      </div>
      <button
          class="button"
          :class="{'disabled': !checkboxApproval}"
          @click.prevent="validateForm"
      >
        Откликнуться
      </button>
    </form>
  </div>
</template>

<script>
import baseInput from "./UI/base-input";
import baseInputArea from "./UI/base-input-area";
import { InputFacade } from 'vue-input-facade'
import { required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  name: "form-respond",
  components: {
    baseInput,
    InputFacade,
    baseInputArea,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      checkboxApproval: false,
      firstName: '',
      lastName: '',
      patronymic: '',
      phone: '',
      errorMassage: {
        firstName: '',
        lastName: '',
        patronymic: '',
        phone: '',
      },
    }
  },
  validations () {
    return {
      firstName: { required },
      lastName: { required },
      patronymic: { required },
      phone: { required, minLength:minLength(10) },
      checkboxApproval: {
        checked(val) {
          return val;
        }
      }
    }
  },
  methods: {
    async validateForm () {
      this.clearErrors()
      const result = await this.v$.$validate()
      if (!result) {
        if (this.v$.firstName.required.$invalid) {
          this.errorMassage.firstName = "Поле обязательно для заполнения";
        }
        if (this.v$.lastName.required.$invalid) {
          this.errorMassage.lastName = "Поле обязательно для заполнения";
        }
        if (this.v$.patronymic.required.$invalid) {
          this.errorMassage.patronymic = "Поле обязательно для заполнения";
        }
        if (this.v$.phone.required.$invalid) {
          this.errorMassage.phone = "Поле обязательно для заполнения";
        }
        if (this.v$.phone.minLength.$invalid) {
          this.errorMassage.phone = "Некорректно введен телефон";
        }
        return
      } else {
        alert('фаорма заполнена успешно, отправляю на сервер!!!')
        this.formComplete()
      }
    },
    clearErrors() {
      for (const key in this.errorMassage) {
        this.errorMassage[key] = "";
      }
    },
    formComplete() {
      this.$emit('formComplete')
    }
  }
}
</script>

<style scoped lang="scss">
.form-name {
  border-bottom: 0 solid #dee2e6;
  padding: 20px 30px 10px;
  font-size: 30px;
  line-height: 38px;
  display: block;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  gap: 30px;
  margin: 0 auto 20px;

  & .input {
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

  & .checkbox-wrapper {
    display: flex;
    gap: 10px;
    width: 400px;
    align-items: flex-start;

    & a {
      color: #007bff;
    }

    & .checkbox-text {
      font-size: 12px;
    }
  }

  & .button {
    display: inline-block;
    padding: 26px 36px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;
    text-decoration: none;
    background: #fd7f23;
    color: #fff!important;
    transition: all 50ms ease-out;
    border-radius: 5px;
    width: fit-content;
  }

  & .disabled {
    opacity: .5;
    cursor: not-allowed;
  }
}
</style>
