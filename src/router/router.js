import { createRouter, createWebHistory } from "vue-router";
import HomeIndex from '../views/layout/HomeIndex'
import RealTimePlayer from '@/views/players/RealTimePlayer'
import HistoryPlayer from '@/views/players/HistoryPlayer'
import RetrospectPlayer from '@/views/players/RetrospectPlayer'
const routes = [
  {
    path: '/',
    component: HomeIndex,
  }, {
    path: '/players/real-time',
    component: RealTimePlayer
  }, {
    path: '/players/history',
    component: HistoryPlayer
  }, {
    path: '/players/retrospect',
    component: RetrospectPlayer
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
export default router;
