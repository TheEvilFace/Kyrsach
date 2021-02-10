<template>
  <div class="q-py-md">
    <div v-if="profileData" class="column items-center q-gutter-y-md">
      <q-avatar size="100px" >
        <img :src="profileData.avatar_url" >
      </q-avatar>
      <div class="column items-center">
        <div>
          {{ profileData.surname }} {{ profileData.name }} {{ profileData.middlename }}
        </div>

        <div>
          {{ profileData.user.email }}
        </div>
      </div>
      <div class="row full-width q-px-md">
        <q-btn label="Создать приемный день" to="/createTimeTable" outline class="bg-accent text-weight-bold" no-caps />
      </div>
      <span class="text-h6 text-weight-bold">Записи на приемные дни:</span>

      <q-separator class="full-width" />
      <div v-for="(date,key) in profileData.visits" :key="key" class="column full-width">
        <div class="q-px-md">
          <div  class="full-width row justify-center q-pb-md text-weight-bold">
          <span style="border: #1D1D1D 1px solid" class="bg-accent q-pa-xs rounded-borders">
            {{key | moment('DD.MM.YYYY')}}
          </span>
          </div>

          <div class="row q-gutter-md">
            <q-card v-for="visitor in date"
                    v-if="visitor.status === 'wait'"
                    :key="visitor.id"
                    style="border: #1D1D1D 1px solid"
                    bordered
                    class="column items-center q-pa-md no-shadow">

              <p class="text-weight-bold text-black q-mb-none q-mt-sm"> {{convertFIO(visitor.patient.name, visitor.patient.middlename, visitor.patient.surname) }} </p>
              <p class="text-weight-bold text-black q-mb-none q-mt-sm"> {{ convertDate(visitor.schedule.date, visitor.time_interval.name) }} </p>

            </q-card>
          </div>
        </div>



        <q-separator class="full-width q-mt-md" />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "profileDoctor",
  data() {
    return {
      profileData: null
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    convertDate(date, time_interval) {
      return this.moment(date).format('DD.MM.YYYY')  + ' на ' + time_interval
    },

    convertFIO(name, middlename, surname) {
      if(middlename)
        return name.slice(0, 1) + '.' + middlename.slice(0, 1) + '. ' + surname
      else
        return name.slice(0, 1) + '. ' + surname

    },
    getProfile() {
      this.$http({
        method: 'get',
        url: '/doctor/profile',
      }).then(response => {
        this.profileData = response.data.data;
      })
    }
  }

}
</script>
