import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//import Button from './components/button.vue'
import main_display from "./views/main_display.vue"


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/timer',
      name: 'timer',
      component: Home,
      meta :{
        title : "选手计时器"
      }

    
    }, 
    {
      path: '/',
      name: 'homepage',
      component: main_display,
      meta :{
        title : "展示页面"
      }
      
    
    }, 
    // {
    //   path: '/button',
    //   name: 'button',
    //   component: Button
    // },    
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})
export default router