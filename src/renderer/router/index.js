import Setup from '@/views/Setup.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import DashboardHome from '@/components/pages/DashboardHome.vue';
import DashboardPatient from '@/components/pages/DashboardPatient.vue';
import DashboardTreatment from '@/components/pages/DashboardTreatment.vue';
import DashboardAppointment from '@/components/pages/DashboardAppointment.vue';

import { createRouter, createWebHashHistory } from 'vue-router';

const routerHistory = createWebHashHistory();

const routes = [
  {
    path: '/setup',
    component: Setup,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: 'home',
        component: DashboardHome
      },
      {
        path: 'patients',
        component: DashboardPatient
      },
      {
        path: 'treatments',
        component: DashboardTreatment
      },
      {
        path: 'appointments',
        component: DashboardAppointment
      },
    ],
  },
];

export const router = createRouter({
  strict: true,
  routes,
  history: routerHistory,
});
