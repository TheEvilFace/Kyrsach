<template>
  <q-page class="q-py-md">
    <div class="row q-px-md q-gutter-md justify-xs-center justify-md-start">
      <router-link v-for="doctor in doctors" :key='doctor.id' :to="'/timetable/'+doctor.id" style="text-decoration: none">
        <q-card bordered class="column no-wrap items-center q-pa-md">
          <q-img
            width="200px"
            height="200px"
            img-class="rounded-borders"
            :src="doctor.avatar_url"
            spinner-color="white"
          />
            <p class="text-black text-h6 q-mb-none q-mt-sm">  {{ doctor.surname }} {{ doctor.name }} </p>


        </q-card>
      </router-link>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'selectDoctorPage',
  data(){
    return{
      doctors:null,
    }
  },
  created() {
    this.getDoctors();
  },
  methods: {
    // Получение доктора по id специальности
    getDoctors() {
      this.$http({
        method: 'get',
        url: '/doctors/get_by_speciality/' + this.$route.params.id,
      }).then(response => {
        this.doctors = response.data.data;
      })
    },
  }
}
</script>
