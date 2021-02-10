<template>
  <q-page class="q-py-md">
    <div class="column items-center">
      <q-date v-model="dateSelect"
              multiple
              mask="YYYY-MM-DD"
              minimal
              :options="date => date >= checkToday() && availableDate.includes(date)"
              bordered/>
      <q-btn :disable="!dateSelect" @click="getInterval()" class="q-mt-md bg-primary text-white text-weight-medium">
        Применить
      </q-btn>
    </div>


    <div class="row q-mt-md">
      <q-list class="full-width" separator bordered>
        <q-item v-for="(date,key) in dates" :key='key' class="items-center justify-between">
          <div class="col-2">{{ key | moment('DD.MM.YYYY') }}</div>

          <q-item-section class="col-xs-8 col-md-10">
            <div class="row q-gutter-md-md q-gutter-xs-sm">
              <q-btn outline
                     @click="confirmVisit(interval,key)"
                     no-wrap
                     v-for="interval in date"
                     :key='interval.id'
                     dense
                     :class="interval.available ? 'bg-positive' : 'bg-red-8'"
                     :disable="!interval.available"
                     class="col-xs-5 col-md-2 bg-positive">{{ interval.name }}
              </q-btn>
            </div>

          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-dialog v-model="confirmDialog" transition-show="scale" transition-hide="scale">
      <q-card class="bg-secondary text-white" style="width: 300px">
        <q-card-section align="center">
          <div class="text-h6">Подтвердите запись</div>
        </q-card-section>

        <q-card-section align="left" class="q-pt-none">
          <span>Дата: <span class="text-accent"> {{ visitsDataUser.date }}</span></span>
        </q-card-section>

        <q-card-section align="left" class="q-pt-none">
          <span>Время: <span class="text-accent">{{ visitsDataUser.time }}</span></span>
        </q-card-section>

        <q-card-section align="left" class="q-pt-none">
          <span>Специальность: <span class="text-accent">{{doctor.speciality.name}}</span></span>
        </q-card-section>

        <q-card-section align="left" class="q-pt-none">
          <span>Врач: <span class="text-accent">{{doctor.surname}} {{doctor.name}} {{doctor.middlename}}</span></span>
        </q-card-section>

        <q-card-actions>
          <div class="full-width row justify-between q-px-md q-py-sm">

            <div class="col-5">
              <q-btn color="positive" class="text-weight-medium" padding="sm xl" outline label="Да" @click="createVisit()" />
            </div>

            <div class="col-5">
              <q-btn color="negative" class="text-weight-medium" padding="sm xl" outline label="Нет" v-close-popup/>
            </div>
          </div>

        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert">
      <q-card class="bg-secondary text-accent">
        <q-card-section>
          <div class="text-h6">Ошибка</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Для записи к врачу, вы должны авторизироваться
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PageTimeTable',
  data() {
    return {
      dateSelect: null,
      dates: null,
      confirmDialog: false,
      doctor:{
        name:null,
        middlename:null,
        surname:null,
        speciality:{
          name:null
        }
      },
      visitsData:{
        doctor_id: null,
        time_interval_id: null,
        date: null
      },
      visitsDataUser:{
        time: null,
        date: null
      },
      alert:false,
      availableDate:[]
    }
  },
  created() {
    this.getDoctor();
    this.getDates();
  },
  methods: {
    convertDate(){
      for(let i in this.availableDate){
        this.availableDate[i] = moment(this.availableDate[i]).format('YYYY/MM/DD')
      }

    },
    // Метод получения доступных дат с сервера
    getDates() {
      this.$http({
        method: 'get',
        url: '/schedules/get_available_dates',
        params:{
          doctor_id: this.$route.params.id
        }
      }).then(response => {
        this.availableDate = response.data.data;
        this.convertDate()
      })
    },
    // Метод получения доктора по id
    getDoctor() {
      this.$http({
        method: 'get',
        url: '/doctors/' + this.$route.params.id,
      }).then(response => {
        this.doctor = response.data.data;
      })
    },
    // Метод регистрации визита пользователя на определенную дату и время(смотреть объект visitsData)
    createVisit(){
      this.$http({
        method: 'POST',
        url: '/visits/create',
        data: this.visitsData
      }).then(response => {
        if(response.data.data.is_created){
          location.reload();
        }else {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            message: 'Что-то пошло не так'
          })
        }
      })
    },
    // Подтверждение от пользователя о записи на прием
    confirmVisit(interval,key) {
      if (this.$q.localStorage.getItem('token')){
        // Для пользователя
        this.visitsDataUser.time = interval.name;
        this.visitsDataUser.date = moment(key).format('DD.MM.YYYY');

        // Для сервера
        this.visitsData.time_interval_id = interval.id;
        this.visitsData.date = key;
        this.visitsData.doctor_id = this.doctor.id;

        this.confirmDialog = true;
      }else {
        this.alert = true;
      }
    },
    checkToday() {
      return (moment().format('YYYY/MM/DD'));
    },
    // Получение временных интервалов с сервера
    getInterval() {
      this.$http({
        method: 'get',
        url: '/schedules/get_by_doctor',
        params: {
          doctor_id: this.doctor.id,
          dates: this.dateSelect
        }
      }).then(response => {
        this.dates = response.data.data
      })
    }
  }
}
</script>
