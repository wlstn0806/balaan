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
                  checkValue('eamil') || '이메일 주소를 확인해주세요.'
                ]"
                required-mark
              />
              <VaInput
                v-model="userInfo.passward"
                label="비밀번호"
                :rules="[checkValue('pw') || '영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열을 입력해주세요.']"
                required-mark
                type="password"
              />
              <VaInput
                v-model="userInfo.checkPassward"
                label="비밀번호 확인"
                :rules="[checkValue('chackpw') || '입력하신 비밀번호와 다릅니다.']"
                required-mark
                type="password"
              />
            </template>
            <template #step-content-1>
              <VaInput
                v-model="shopInfo.name"
                label="이름"
                :rules="[checkValue('name') || '2글자 이상의 한글 완성형, 또는 3글자 이상의 영문 알파벳을 입력해주세요.']"
                required-mark
              />
              <VaInput
                v-model="shopInfo.tell"
                label="연락처"
                :rules="[checkValue('tell') || '전화번호를 확인해주세요.']"
                required-mark
              />
              <VaInput
                v-model="shopInfo.address"
                label="주소"
                :rules="[(value) => (value && value.length > 0) || '주소를 확인해주세요.']"
                required-mark
              />
              <VaInput
                v-model="shopInfo.detailAddress"
                :rules="[(value) => (value && value.length > 0) || '상세주소를 확인해주세요.']"
                required-mark
                />
              </template>
              <template #step-content-2>
                <div class="card-container">
                  <VaInput
                    style="width:24%"
                    v-model="payInfo.card1"
                    label="카드번호"
                    required-mark=""
                    :rules="[(value) => (value && value.length > 0),checkValue('card')]"
                  />
                  <VaInput
                    style="width:24%"
                    v-model="payInfo.card2"
                    :rules="[(value) => (value && value.length > 0),checkValue('card')]"
                  />
                  <VaInput
                    style="width:24%"
                    v-model="payInfo.card3"
                    :rules="[(value) => (value && value.length > 0),checkValue('card')]"
                  />
                  <VaInput
                    style="width:25%"
                    v-model="payInfo.card4"
                    :rules="[(value) => (value && value.length > 0),checkValue('card')]"
                  />
                </div>
            </template>
            <template #step-content-3>
              회원 가입이 완료되었습니다.
            </template>
            <template v-if="currentStep !== 3" #controls="{ nextStep, prevStep }">
              <VaButton :disabled="currentStep === 0" @click="prevStep()">
                이전
              </VaButton>
              <VaButton :disabled="!isValid" @click="nextStep()">
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
  detailAddress: ''
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
    detailAddress: ''
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
  let ck = false;
  switch(type) {
    case 'email':
      break;
    case 'pw':
      break;
    case 'chackpw':
      break;
    case 'name':
      break;
    case 'card':
      break;
  }
  return ck
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

.card-container {
  display: flex;
  align-items: flex-end;
}
.card-container > div {
  margin-right: 1%;
}

.card-container > div:last-child {
  margin-right: 0;
}
</style>
