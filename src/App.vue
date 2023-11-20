<script setup>
import { ref } from 'vue'
import axios from 'axios'
import VInput from './components/v-input.vue'
import VCheckbox from './components/v-checkbox.vue'
import VRadio from './components/v-radio.vue'
import VButton from './components/v-button.vue'
import VLoader from './components/v-loader.vue'

let name = ref('')
let surname = ref('')
let login = ref('')
let password = ref('')

let mainPage = ref('')
const mainPageOptions = ['Склад', 'Категорії', 'Характеристики', 'Продукти', 'Операції']
const updateMainPage = (value) => {
  mainPage.value = value
}

let operations = ref([])
const operationsOptions = ['Створення', 'Оновлення', 'Переміщення', 'Видалення']
const updateOperationsOptions = (value) => {
  operations.value = value
}

let secondShift = ref([])
const secondShiftState = ['Так']
let secondShiftBoolean = false
const updateState = (value) => {
  secondShift.value = value
  if (secondShift.value.length === 0) {
    secondShiftBoolean = false
  } else {
    secondShiftBoolean = true
  }
}

let loading = ref('')
const startLoading = () => (loading.value = true)
const stopLoading = () => (loading.value = false)

let errorOperation = ref('')
let errorMainPage = ref('')
let errorName = ref('')
let errorSurname = ref('')
let errorLogin = ref('')
let errorPassword = ref('')

const clearForm = () => {
  const fields = [name, surname, login, password]
  fields.forEach((field) => (field.value = ''))

  mainPage.value = ''
  operations.value.splice(0, operations.value.length)
  secondShift.value.splice(0, secondShift.value.length)
  secondShiftBoolean = false

  const errorRefs = [
    errorName,
    errorSurname,
    errorLogin,
    errorPassword,
    errorMainPage,
    errorOperation
  ]
  errorRefs.forEach((errorRef) => (errorRef.value = ''))
}

const validateField = (field, errorRef, errorMessage) => {
  if (Array.isArray(field.value)) {
    if (field.value.length === 0) {
      errorRef.value = errorMessage
      return false
    } else {
      errorRef.value = ''
      return true
    }
  } else {
    if (!field.value) {
      errorRef.value = errorMessage
      return false
    } else {
      errorRef.value = ''
      return true
    }
  }
}

const validateFields = () => {
  let isValid = true

  isValid = validateField(name, errorName, `Введіть ім'я`) && isValid
  isValid = validateField(surname, errorSurname, `Введіть прізвище`) && isValid
  isValid = validateField(login, errorLogin, `Введіть логін`) && isValid
  isValid = validateField(password, errorPassword, `Введіть пароль`) && isValid
  isValid = validateField(mainPage, errorMainPage, `Виберіть головну сторінку`) && isValid
  isValid = validateField(operations, errorOperation, `Виберіть операцію`) && isValid

  return isValid
}

const submitForm = async () => {
  if (!validateFields()) {
    return
  }

  startLoading()
  try {
    const apiUrl = 'http://localhost:3000/submit-form'
    await new Promise((resolve) => setTimeout(resolve, 4000))
    const response = await axios.post(apiUrl, {
      name: name.value,
      surname: surname.value,
      login: login.value,
      password: password.value,
      mainPage: mainPage.value,
      operations: operations.value,
      secondShift: secondShiftBoolean
    })
    console.log(response.data)
    if (response.data.ok) {
      alert('Дані успішно відправлені на сервер!')
    }
  } catch (error) {
    console.error('Помилка при відправці на сервер:', error)
  } finally {
    clearForm()
    stopLoading()
  }
}
</script>

<template>
  <div :class="{ 'form-container': !loading, load: loading }">
    <div class="block-form">
      <h1>Заповніть форму</h1>
      <form @submit.prevent="submitForm" class="form">
        <div class="block">
          <div class="block-input">
            <VInput v-model="name" label="Ім'я"></VInput>
            <p class="error">{{ errorName }}</p>
          </div>
          <div class="block-input">
            <VInput v-model="surname" label="Прізвище"></VInput>
            <p class="error">{{ errorSurname }}</p>
          </div>
          <div class="block-input">
            <VInput v-model="login" label="Логін"></VInput>
            <p class="error">{{ errorLogin }}</p>
          </div>
          <div class="block-input">
            <VInput v-model="password" type="password" label="Пароль"></VInput>
            <p class="error">{{ errorPassword }}</p>
          </div>
        </div>
        <div class="block">
          <div class="block-check">
            <VRadio
              v-model="mainPage"
              :options="mainPageOptions"
              @update:modelValue="updateMainPage"
              label="Головна сторінка"
            />
            <p class="error">{{ errorMainPage }}</p>
          </div>
          <div class="block-check">
            <VCheckbox
              v-model="operations"
              :options="operationsOptions"
              @update:model="updateOperationsOptions"
              label="Операції"
            ></VCheckbox>
            <p class="error">{{ errorOperation }}</p>
          </div>
        </div>
        <div class="block">
          <VCheckbox
            v-model="secondShift"
            :options="secondShiftState"
            @update:model="updateState"
            label="Робітник другої зміни?"
          ></VCheckbox>
        </div>
        <VButton type="submit">Підтвердити</VButton>
      </form>
    </div>
  </div>
  <VLoader :loading="loading"></VLoader>
</template>

<style scoped>
.block-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  border-radius: 10px;
  padding: 40px;
}
.load {
  opacity: 0.5;
}
.form {
  display: flex;
  flex-direction: column;
}
.block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 10px;
}
.block-input {
  height: 70px;
}
.block-check {
  height: 160px;
}
.error {
  color: red;
  font-size: 12px;
}
@media screen and (max-width: 470px) {
  h1 {
    font-size: 1.5em;
  }
  .block {
    grid-template-columns: 1fr;
  }
}
</style>
