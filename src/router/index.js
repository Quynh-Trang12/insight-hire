/**
 * @file router/index.js
 * @description Vue Router configuration for Insight Hire
 * 
 * Routing Strategy:
 * - Nested routing for Job Explorer (sidebar + detail view)
 * - Lazy loading for optimized bundle sizes
 * - Default redirect to jobs page
 * 
 * Routes:
 * - / → redirects to /jobs
 * - /jobs → Job Explorer layout with nested routes:
 *   - /jobs → JobOverview (welcome screen)
 *   - /jobs/:id → JobDetail (specific job)
 * - /apply → Application form
 * - /todos → Todo list
 */

import { createRouter, createWebHistory } from 'vue-router'
import JobExplorer from '../views/JobExplorer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/jobs',
    },
    {
      path: '/jobs',
      name: 'jobs-layout',
      component: JobExplorer,
      children: [
        {
          path: '',
          name: 'job-overview',
          component: () => import('../components/jobs/JobOverview.vue'),
        },
        {
          path: ':id',
          name: 'job-detail',
          component: () => import('../components/jobs/JobDetail.vue'),
        },
      ],
    },
    {
      path: '/apply',
      name: 'job-application',
      component: () => import('../views/ApplicationView.vue'),
    },
    {
      path: '/todos',
      name: 'todo-list',
      component: () => import('../views/TodosView.vue'),
    },
  ],
})

export default router
