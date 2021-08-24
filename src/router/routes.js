
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Guest/Login.vue') },
      { path: 'register', component: () => import('pages/Guest/Register.vue') }
    ]
  },
  {
    path: '/home', name: 'homeuser', component: () => import('pages/User/Home.vue')
  },
  {
    path: '/',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      // { path: 'home', name: 'homeuser', component: () => import('pages/User/Home.vue') },
      { path: 'detail/:id', name: 'detail', component: () => import('pages/User/DetailBarang.vue') },
      { path: 'myaccount/:id', name: 'account', component: () => import('pages/User/Account.vue') },
      // Untuk di uji dulu
      // { path: 'homeuser', name: 'homeuser', component: () => import('pages/User/PemesananBarang.vue') },
      { path: 'checkout/:id', name: 'checkout', component: () => import('src/pages/User/Checkout.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'homeadmin', name: 'homeadmin', component: () => import('pages/Admin/Home.vue') },
      { path: 'datauser', name: 'datauser', component: () => import('pages/Admin/DataUser.vue') },
      { path: 'edituser/:id', name: 'edituser', component: () => import('pages/Admin/EditUser.vue') },
      { path: 'databarang', name: 'databarang', component: () => import('pages/Admin/DataBarang.vue') },
      { path: 'inputbarang', name: 'inputbarang', component: () => import('pages/Admin/InputBarang.vue') },
      { path: 'editbarang/:id', name: 'editbarang', component: () => import('pages/Admin/EditBarang.vue') }
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
