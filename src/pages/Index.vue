<template>
  <q-page class="q-py-md">
      <div class="row q-px-md q-gutter-md justify-xs-center justify-md-start">
        <router-link v-for="speciality in specialities" :key='speciality.id' :to="'/selectDoctor/'+speciality.id" style="text-decoration: none">
          <q-card bordered class="column no-wrap items-center q-pa-md">
            <q-img
              width="200px"
              height="200px"
              img-class="rounded-borders"
              :src="speciality.speciality_pic_url ? speciality.speciality_pic_url : 'https://memepedia.ru/wp-content/uploads/2016/07/GaecXsgZG8Y.jpg'"
              spinner-color="white"
            />
            <p class="text-weight-bold text-black text-h6 q-mb-none q-mt-sm"> {{ speciality.name }} </p>

          </q-card>
        </router-link>

      </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{
      specialities:null,
    }
  },
  created() {
    this.getSpecialities();
  },
  methods: {
    getSpecialities() {
      this.$http({
        method: 'get',
        url: '/specialities',
      }).then(response => {
        this.specialities = response.data.data;
      })
    },
  }
}
</script>
