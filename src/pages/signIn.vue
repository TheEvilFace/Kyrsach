<template>
  <q-page class="row flex-center">
    <div class="col-md-3 col-xs-9 bg-secondary q-py-md rounded-borders">
      <div class="full-width column items-center q-mb-xl">
        <q-avatar>
          <img src="../assets/pepeNut.jpg"/>
        </q-avatar>
        <p class="q-mb-none text-h6 text-white">Курсовая Работа</p>
      </div>
      <q-form @submit="authenticate">
        <div class="row justify-center q-gutter-md ">

          <div class="col-10">
            <div class="text-white">Логин</div>
            <q-input v-model="authData.login"
                     :rules="[val => val !== null && val !== '' || 'Это поле не может быть пустым!']"
                     dark
                     outlined
                     dense />
          </div>

          <div class="col-10">
            <div class="text-white">Пароль</div>
            <q-input v-model="authData.password"
                     :rules="[val => val !== null && val !== '' || 'Это поле не может быть пустым!']"
                     type="password"
                     dark
                     outlined
                     dense />
          </div>
          <div class="col-12 row justify-center">
            <q-btn class="bg-accent text-weight-bold text-h6 " type="submit" padding="xs md" no-caps>Войти</q-btn>
          </div>
          <span class="row col-12 justify-center q-mb-md text-white"><p>Еще нет аккаунта?</p>&nbsp;<router-link
            style="text-decoration: none" to="/signup"><p class="font-head text-accent">Зарегистрируйтесь!</p></router-link></span>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "signIn",
  data() {
    return {
      authData:{
        login: null,
        password:null
      }
    }
  },
  methods:{
    // Отправка данных для авторизации в системе
    authenticate(){
      this.$http({
        method: 'POST',
        url: '/sign_in',
        data: this.authData
      }).then(response =>{
        if(response.data.data.token){
          this.$q.localStorage.set('token',response.data.data.token)
          this.$q.localStorage.set('role_id',response.data.data.role_id)
          this.$router.push('/profile');
        }else {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Что-то пошло не так'
          })
        }

      })

    }
  }
}
</script>
