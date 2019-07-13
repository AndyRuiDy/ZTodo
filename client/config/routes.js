export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: () => import('../views/todos/todo.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
