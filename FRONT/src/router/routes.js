
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta:{
      requireAuth:true
    },
    children: [
      { path: '', component: () => import('pages/dashboard-page.vue'), meta:{ requireAuth:true } },
      { path: '/direct', component: () => import('pages/direct-page.vue'), meta:{ requireAuth:true } }
    ]
  },

  {
    path: '/intro',
    component: ()=> import('layouts/IntroLayout.vue'),
    meta:{
      requireAuth:false,
      transition: 'slide-left'
    },
    children:[
      { path:'', component:()=> import('pages/intro/SloganOne.vue') },
      { path:'slogan2', component:()=> import('pages/intro/SloganTwo.vue') },
      { path:'slogan3', component:()=> import('pages/intro/SloganThree.vue') },
      { path:'slogan4', component:()=> import('pages/intro/SloganFour.vue') },
      
    ]
  },
  {
    path:'/auth',
    component: ()=> import('layouts/IntroLayout.vue'),
    meta:{
      requireAuth:false
    },
    children:[
      {path:'' , component:()=>import ("pages/auth/auth-page.vue")},
      {path:'confirm' , component:()=>import ("pages/auth/confirm-page.vue")}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
