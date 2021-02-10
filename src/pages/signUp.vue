<template>
  <q-page class="row flex-center q-py-md">
    <div class="col-md-3 col-xs-9 bg-secondary q-py-md rounded-borders">
      <div class="full-width column items-center q-mb-xl">
        <q-avatar>
          <img src="../assets/pepeNut.jpg"/>
        </q-avatar>
        <p class="q-mb-none text-h6 text-white">Курсовая Работа</p>
      </div>

      <q-form v-if="step === 1" @submit="continued">
        <div class="row justify-center q-gutter-md ">

          <div class="col-10">
            <div class="text-white">Фамилия</div>
            <q-input v-model="registerData.profile.surname"
                     :rules="requiredRule(this)"
                     dark
                     outlined
                     dense/>
          </div>
          <div class="col-10">
            <div class="text-white">Имя</div>
            <q-input v-model="registerData.profile.name"
                     :rules="requiredRule(this)"
                     dark
                     outlined
                     dense/>
          </div>
          <div class="col-10">
            <div class="text-white">Отчество</div>
            <q-input v-model="registerData.profile.middlename"
                     dark
                     outlined
                     dense/>
          </div>
          <div class="col-10 row justify-center">
            <div>
              <q-btn-toggle
                v-model="registerData.user.role_id"
                class="my-custom-toggle"
                no-caps
                rounded
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                :options="[
          {label: 'Я пациент', value: 2},
          {label: 'Я врач', value: 1}
        ]"
              />
            </div>

          </div>
          <div v-if="registerData.user.role_id === 1" class="col-10 row justify-center">
            <q-select v-model="registerData.profile.speciality_id"
                      dark
                      class="full-width"
                      outlined
                      emit-value
                      dense
                      :rules="requiredRule(this)"
                      map-options
                      option-value="id"
                      option-label="name"
                      :options="this.specialities"
            />
          </div>
          <q-btn class="bg-accent text-weight-bold text-h6 q-mt-lg " type="submit" padding="xs md" no-caps>
            Продолжить регистрацию
          </q-btn>
          <span class="row col-12 justify-center q-mb-md text-white"><p>Уже есть аккаунт?</p>&nbsp;<router-link
            style="text-decoration: none" to="/signin"><p
            class="font-head text-accent">Войдите!</p></router-link></span>
        </div>
      </q-form>


<!-- //////////////////////////////////////////////////////////////////////////////////////////////////////   -->

      <q-form v-else-if="step === 2" @submit="registered">
        <div class="row justify-center q-gutter-md ">

          <div class="col-10">
            <div class="text-white">Логин</div>
            <q-input v-model="registerData.user.login"
                     :rules="requiredRule(this)"
                     dark
                     outlined
                     dense/>
          </div>

          <div class="col-10">
            <div class="text-white">Email</div>
            <q-input v-model="registerData.user.email"
                     :rules="emailRule(this)"
                     dark
                     outlined
                     dense/>
          </div>

          <div class="col-10">
            <div class="text-white">Пароль</div>
            <q-input v-model="registerData.user.password"
                     :rules="requiredRule(this)"
                     type="password"
                     dark
                     outlined
                     dense/>
          </div>
          <div class="col-10">
            <div class="text-white">Подтверждение пароля</div>
            <q-input v-model="passwordAgain"
                     :rules="confirmPWDRule(this)"
                     type="password"
                     dark
                     outlined
                     dense/>
          </div>
          <q-btn class="bg-accent text-weight-bold text-h6 q-mt-lg " type="submit" padding="xs md" no-caps>
            Зарегистрироваться
          </q-btn>
          <span class="row col-12 justify-center q-mb-md text-white"><p>Уже есть аккаунт?</p>&nbsp;<router-link
            style="text-decoration: none" to="/signin"><p
            class="font-head text-accent">Войдите!</p></router-link></span>
        </div>
      </q-form>

    </div>
  </q-page>
</template>

<script>
export default {
  name: "signUp",
  data() {
    return {
      passwordAgain:null,
      registerData: {
        user:{
          login: null,
          password: null,
          email:null,
          role_id: 2,
        },
        profile:{
          surname: null,
          middlename: null,
          name:null,
          speciality_id: null
        }
      },
      step: 1,
      specialities: null
    }
  },
  // Жизненый хук Created
  created() {
    this.getSpecialities();
  },
  methods: {
    // Получение специальностей
    getSpecialities(){
      this.$http({
        method: 'get',
        url: '/specialities',
      }).then(response =>{
       this.specialities = response.data.data;
      })
    },
    // Отправка данных на регистрацию
    registered() {
      this.$http({
        method: 'post',
        url: '/sign_up',
        data: this.registerData
      }).then(response =>{
        if(response.data.data.token){
          this.$q.localStorage.set('token',response.data.data.token)
          this.$q.localStorage.set('role_id',response.data.data.role_id)
          this.$router.push('/');
        }else {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Что-то пошло не так'
          })
        }
      })

    },
    continued(){
      this.step = 2;
    },
    // Ниже правила заполнения полей
    requiredRule(val){
      return [val => val !== null && val !== '' || 'Это поле является обязательным!']
    },
    confirmPWDRule(val){
      return [
        this.requiredRule(val),
        val => val === this.registerData.user.password  || 'Пароли должны быть одинаковыми'
      ]
    },
    emailRule (val){
      return [
        this.requiredRule(val),
        val => /^(?=[a-zA-Z0-9@.%+-]{6,254}$)[a-zA-Z0-9.%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}.){1,8}[a-zA-Z]{2,63}$/.test(val) ||  'Неверный формат адреса'
      ]
    },
  }
}
</script>
