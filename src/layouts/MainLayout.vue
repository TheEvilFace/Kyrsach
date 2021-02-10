<template>
  <q-layout view="lHh lpr lff" class="bg-secondary row justify-center">
    <div class="col-10 bg-white shadow-12">
      <q-header>
        <q-toolbar>
          <q-avatar>
            <img src="../assets/pepeNut.jpg"/>
          </q-avatar>

          <q-toolbar-title >Курсовая работа</q-toolbar-title>
          <q-btn v-if="$q.localStorage.getItem('role_id') !== 1" class="q-mx-md" to="/" flat round dense icon="home" />
          <div v-if="$q.localStorage.getItem('token')" class="q-gutter-x-md q-px-sm">
            <q-btn to="/profile" flat round dense icon="person" />
            <q-btn @click="logout()" flat round dense icon="logout" />
          </div>

          <div v-else class="q-mx-sm">
            <q-btn to="/signIn" flat round dense icon="meeting_room" />
          </div>

        </q-toolbar>
      </q-header>


      <q-page-container >
        <router-view />
      </q-page-container>


    </div>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  methods:{
    logout() {
      this.$q.localStorage.remove('token');
      this.$q.localStorage.remove('role_id');
      this.$router.push('/');
    }
  }
}
</script>
