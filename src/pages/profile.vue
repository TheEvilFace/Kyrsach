<!--Прослойка между профилем Пользователя и Доктора-->

<template>
  <q-page>
    <patientProfile v-if="$q.localStorage.getItem('role_id') === 2" />
    <doctorProfile v-if="$q.localStorage.getItem('role_id') === 1" />
  </q-page>
</template>

<script>
import patientProfile from "components/patientProfile";
import doctorProfile from "components/doctorProfile";
export default {
  name: "profile",
  components:{
    patientProfile,doctorProfile
  },
}
</script>
