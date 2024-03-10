
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta:{ requireAuth:true } }
    ]
  },

  {
    path: '/intro',
    component: ()=> import('layouts/IntroLayout.vue'),
    meta:{
      requireAuth:false
    },
    children:[
      { path:'', component:()=> import('pages/intro/SloganOne.vue') },
      { path:'slogan2', component:()=> import('pages/intro/SloganTwo.vue') },
      { path:'slogan3', component:()=> import('pages/intro/SloganThree.vue') },
      { path:'slogan4', component:()=> import('pages/intro/SloganFour.vue') },
      
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
