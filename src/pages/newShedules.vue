<template>
  <q-page class="q-py-md">
    <div class="column items-center">
      <q-date v-model="dateSelect"
              multiple
              mask="YYYY-MM-DD"
              minimal
              :options="date => date >= checkToday() && !closedDate.includes(date)"
              bordered/>
      <div class="row justify-center q-gutter-md q-mt-md">
        <div class="col-6 ">
          <q-checkbox v-model="selectedInterval"
                      size="lg"
                      v-for="interval in intervals" :key="interval.id"
                      :val="interval.id" :label="interval.name"
          />
        </div>
      </div>
      <q-btn class="bg-accent q-mt-md" @click="createTable()" outline>Давай проверим</q-btn>

    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
export default {
  name: "newShedules",
  data(){
    return{
      dateSelect: null,
      intervals: [],
      selectedInterval: [],
      closedDate:[]
    }
  },
  created() {
    this.getIntervals();
    this.getDates();
  },
  methods:{
    // Отсеивание выбранных интервалов
    diff(a1, a2) {
      return a1.filter(i=>!a2.includes(i))
        .concat(a2.filter(i=>!a1.includes(i)))
    },
    // Создание рабочего дня у доктора
    createTable(){
      let intervals = [];
      this.intervals.forEach(interval =>{
        intervals.push(interval.id);
      })
      this.$http({
        method: 'POST',
        url: '/doctor/create_schedule',
        data:{
          dates: this.dateSelect,
          intervals: this.diff(this.selectedInterval, intervals)
        }
      }).then(response => {
        if(response.data.status){
          this.$router.push('/profile');
        }else {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            message: 'Что-то пошло не так'
          })
        }
      })
    },
    convertDate(){
      for(let i in this.closedDate){
        this.closedDate[i] = moment(this.closedDate[i]).format('YYYY/MM/DD')
      }
    },
    checkToday() {
      return (moment().format('YYYY/MM/DD'));
    },
    // Получение интвервалов времени с сервера
    getIntervals(){
      this.$http({
        method: 'get',
        url: '/schedules/time_intervals',
      }).then(response => {
        this.intervals = response.data.data;
        response.data.data.forEach(interval => {
          this.selectedInterval.push(interval.id);
        })
      })
    },
    // Получение доступных дат с сервера
    getDates(){
      this.$http({
        method: 'get',
        url: '/doctor/get_schedule',
      }).then(response => {
        this.closedDate = response.data.data;
        this.convertDate();
      })
    }
  }
}
</script>
