const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', meta: {type: true}, component: () => import('pages/Index.vue') },
      { path: '/timetable/:id', meta: {type: true}, component: () => import('pages/timeTable.vue') },
      { path: '/selectDoctor/:id',meta: {type: true}, component: () => import('pages/selectDoctorPage.vue') },
      { path: '/profile', meta: {token: true} ,component: () => import('pages/profile.vue')},
      { path: '/createTimeTable', meta: {token: true, type: true}, component: () => import('pages/newShedules.vue')},
    ]
  },{
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Error404.vue') },
      { path: '/signIn', component: () => import('pages/signIn.vue') },
      { path: '/signUp', component: () => import('pages/signUp.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
