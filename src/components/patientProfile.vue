<template>
  <div class="q-py-md">
    <div v-if="profileData" class="column items-center q-gutter-y-md">
      <q-avatar size="100px">
        <img src="../assets/pepeMolotok.jpg" />
      </q-avatar>
      <div class="column items-center">
        <div>
          {{ profileData.surname }} {{ profileData.name }} {{ profileData.middlename }}
        </div>
        <div>
          {{ profileData.user.email }}
        </div>
      </div>
      <div class="full-width q-px-md">
        <q-tabs
          v-model="tab"
          dense
          class="text-primary rounded-borders"
          style="border: #b1665d 1px solid"
          active-color="white"
          active-bg-color="primary"
          indicator-color="transparent"
          align="justify"
          narrow-indicator
        >
          <q-tab name="wait" label="Mails"/>
          <q-tab name="history" label="Alarms"/>
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="wait">
            <q-table
              :data="visits"
              :filter-method="customFilterMethod"
              :columns="columns"
              :filter="tab"
              hide-pagination
              flat
              row-key="name"
            />
          </q-tab-panel>

          <q-tab-panel name="history">
            <q-table
              :data="visits"
              :columns="columns"
              :filter-method="customFilterMethod"
              :filter="tab"
              flat
              hide-pagination
              row-key="name"
            >
              <template v-slot:no-data="{ icon, message, filter }">
                <div class="full-width row flex-center text-secondary q-gutter-sm">
                  <q-icon size="2em" name="sentiment_dissatisfied" />
                  <span>
            Well this is sad... {{ message }}
          </span>
                </div>
              </template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "profilePatient.vue",
  data() {
    return {
      profileData: null,
      tab: 'wait',
      columns: [
        {
          name: 'doctor.name',
          required: true,
          label: 'Врач',
          align: 'left',
          field: row => this.convertFIO(row.doctor.name, row.doctor.middlename, row.doctor.surname),
          format: val => `${val}`,
        },
        {
          name: 'speciality',
          align: 'center',
          label: 'Специальность',
          field: row => row.doctor.speciality.name,
        },
        {
          name: 'date',
          align: 'right',
          label: 'Дата записи',
          field: row => this.convertDate(row.schedule.date, row.time_interval.name),
          sortable: true
        },
      ],
      visits: null
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    // Сложный метод фильтрации на ожидающих и законченных визитов
    customFilterMethod () {
      if(this.tab === 'wait') {
        return this.visits.filter(row => row.status === 'wait')
      } else{
        return this.visits.filter(row => row.status === 'finished')
      }
    },
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
        url: '/patient/profile',
      }).then(response => {
        this.profileData = response.data.data;
        this.visits = this.profileData.visit;
      })
    }
  }

}
</script>
