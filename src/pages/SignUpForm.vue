<template>
  <div class="flex flex-wrap gap-5">
    <VaCard
      square
      outlined
    >
      <VaCardContent>
        <VaForm ref="stepForm" class="flex flex-col items-baseline gap-6">
          <VaStepper
            ref="linearStepper"
            v-model="currentStep"
            :steps="steps"
            linear
          >
            <template #step-content-0>
              <VaInput
                v-model="userInfo.email"
                label="이메일"
                :rules="[
                  checkValue('email') || '이메일 주소를 확인해주세요.'
                ]"
                required-mark
                placeholder="이메일"
              />
              <VaInput
                v-model="userInfo.passward"
                label="비밀번호"
                :rules="[checkValue('pw') || '영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열을 입력해주세요.']"
                required-mark
                type="password"
                placeholder="비밀번호"
              />
              <VaInput
                v-model="userInfo.checkPassward"
                label="비밀번호 확인"
                :rules="[checkValue('chackpw') || '입력하신 비밀번호와 다릅니다.']"
                required-mark
                type="password"
                placeholder="비밀번호 확인"
              />
            </template>
            <template #step-content-1>
              <VaInput
                v-model="shopInfo.name"
                label="이름"
                :rules="[checkValue('name') || '2글자 이상의 한글 완성형, 또는 3글자 이상의 영문 알파벳을 입력해주세요.']"
                required-mark
                placeholder="이름"
              />
              <VaInput
                v-model="shopInfo.tell"
                label="연락처"
                :rules="[checkValue('tell') || '전화번호를 확인해주세요.']"
                required-mark
                placeholder="연락처"
              />
              <div class="container">
                <VaInput
                  v-model="shopInfo.postNumber"
                  label="주소"
                  :rules="[(value) => (value && value.length > 0) || '주소를 확인해주세요.']"
                  required-mark
                  disabled
                  placeholder="우편번호"
                />
                <VaButton @click="searchPost">우편번호 찾기</VaButton>
              </div>
              <VaInput
                v-model="shopInfo.address"
                :rules="[(value) => (value && value.length > 0) || '주소를 확인해주세요.']"
                required-mark
                disabled
                placeholder="주소"
              />
              <VaInput
                v-model="shopInfo.detailAddress"
                :rules="[(value) => (value && value.length > 0) || '상세주소를 확인해주세요.']"
                required-mark
                placeholder="상세주소"
                />
              <VaInput
                v-model="shopInfo.alsoAddress"
                disabled
                required-mark
                placeholder="참고항목"
                />
              </template>
              <template #step-content-2>
                <div class="container">
                  <VaInput
                    style="width:24%"
                    v-model="payInfo.card1"
                    label="카드번호"
                    maxlength="4"
                    required-mark=""
                    :error="!checkValue('card')"
                    :rules="[(value) => (value && value.length > 0),checkValue('card')]"
                  />
                  <VaInput
                    style="width:24%"
                    v-model="payInfo.card2"
                    maxlength="4"
                    :error="!checkValue('card')"
                    :rules="[(value) => (value && value.length > 0),checkValue('card')]"
                  />
                  <VaInput
                    style="width:24%"
                    v-model="payInfo.card3"
                    maxlength="4"
                    :error="!checkValue('card')"
                    :rules="[(value) => (value && value.length > 0),checkValue('card')]"
                  />
                  <VaInput
                    style="width:25%"
                    v-model="payInfo.card4"
                    maxlength="4"
                    :error="!checkValue('card')"
                    :rules="[(value) => (value && value.length > 0),checkValue('card')]"
                  />
                </div>
                <div v-if="!checkValue('card')" class="va-message-list" id="message-list-71" role="alert" style="color: rgb(228, 34, 34);">
                  <ul class="va-message-list__list">
                    <li class="va-message-list__message">카드번호를 확인해주세요.</li>
                  </ul>
                </div>
            </template>
            <template #step-content-3>
              회원 가입이 완료되었습니다.
            </template>
            <template v-if="currentStep !== 3" #controls="{ nextStep, prevStep }">
              <VaButton :disabled="currentStep === 0" @click="prevStep()">
                이전
              </VaButton>
              <VaButton @click="nextStep()">
                {{ currentStep === 2 ? '완료':'다음' }}
              </VaButton>
            </template>
            <template v-else #controls="{ }">
              <VaButton @click="showModal = true">
                완료
              </VaButton>
            </template>
          </VaStepper>
        </VaForm>
      </VaCardContent>
    </VaCard>

    <VaModal
      v-model="showModal"
      hide-default-actions
      overlay-opacity="0.2"
    >
      <template #header>
        <h3>회원가입이 완료되었습니다. 초기폐이지로 돌아갑니다.</h3>
      </template>
      <template #footer>
        <VaButton @click="signUp()"> 확인 </VaButton>
      </template>
    </VaModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, defineVaStepperSteps } from 'vuestic-ui'

const showModal = ref(false);

const currentStep = ref(0);

const userInfo = ref({
  email: '',
  passward: '',
  checkPassward:''
})
const shopInfo = ref({
  name: '',
  tell: '',
  address: '',
  detailAddress: '',
  postNumber: '',
  alsoAddress: ''
})

const payInfo = ref({
  card1:'',
  card2:'',
  card3:'',
  card4:'',
})

const { validate } = useForm('stepForm')

const steps = ref(defineVaStepperSteps([
  {
    label: '개인정보입력',
    beforeLeave: (step) => {
      step.hasError = !validate()
    },
  },
  { label: '배송지 입력', beforeLeave: (step) => { step.hasError = !validate() } },
  { label: '회원 정보 입력', beforeLeave: (step) => { step.hasError = !validate() } },
  { label: '회원 가입 정보확인', beforeLeave: (step) => { step.hasError = !validate() } },
]))
const signUp = () => {
  userInfo.value = {
    email: '',
    passward: '',
    checkPassward:''
  }
  shopInfo.value = {
    name: '',
    tell: '',
    address: '',
    detailAddress: '',
    postNumber: '',
    alsoAddress: ''
  }

  payInfo.value = {
    card1:'',
    card2:'',
    card3:'',
    card4:'',
  }

  showModal.value = false
  currentStep.value = 0
}

const checkValue = (type) => {
  let ck = true;
  let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const cardNum = `${payInfo.value.card1}${payInfo.value.card2}${payInfo.value.card3}${payInfo.value.card4}`
  switch(type) {
    case 'email':
      ck = reg.test(userInfo.value.email)
      break;
    case 'pw':
      reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
      ck = reg.test(userInfo.value.passward)
      break;
    case 'chackpw':
      reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
      ck = reg.test(userInfo.value.passward) && userInfo.value.passward === userInfo.value.checkPassward
      break;
    case 'name':
      reg = /^[\uAC00-\uD7AF]{2,}$|^[a-zA-Z]{3,}$/
      ck = reg.test(shopInfo.value.name)
      break;
    case 'card':
      if (/^\d{16}$/.test(cardNum)) {
        let sum = 0;
        [...cardNum].forEach((num,idx) => {
          let digit = Number(num);
          if ((idx + 1) % 2 === 0) {
            digit *= 2;
            if (digit >= 10) {
              digit = Math.floor(digit / 10) + digit % 10;
            }
          }
          sum += digit;
        })
        return sum % 10 === 0;
      } else {
        ck = false;
      }
      break;
    case 'tell':
      reg = /^(010)(-| )?\d{3,4}(-| )?\d{4}$/
      ck = reg.test(shopInfo.value.tell)
      break;
  }
  return ck
}

const searchPost = () => {
  new window. daum.Postcode ({
    oncomplete: (data) => {
      shopInfo.value.postNumber = data.zonecode

      if (data.userSelectedType === 'R') {
        shopInfo.value.address = data.roadAddress
        const extraAddr = getAlsoAddress(data)
        shopInfo.value.alsoAddress = extraAddr ? ` (${extraAddr})` : ''
      } else {
        shopInfo.value.address = data.jibunAddress
        shopInfo.value.alsoAddress = ''
      }
    },
  }) .open();
}

const getAlsoAddress = (data) => {
  let extraAddr = ''
  if (data.bname && /[동|로|가]$/g.test(data.bname)) {
    extraAddr += data.bname
  }
  if (data.buildingName && data.apartment === 'Y') {
    extraAddr += (extraAddr ? ', ' + data.buildingName : data.buildingName)
  }
  return extraAddr
}
</script>
<style>
.va-stepper__step-content {
  display: flex;
  flex-direction: column;
}
.va-stepper__controls {
  justify-content: center;
}

.container {
  display: flex;
  align-items: flex-end;
}
.container > div {
  margin-right: 1%;
}

.container > div:last-child {
  margin-right: 0;
}
</style>
