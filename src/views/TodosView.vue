<template>
  <div class="todos-view container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <header class="page-header mb-4 text-center">
          <h2 class="fw-bold text-primary">To-Do List</h2>
          <p class="subtitle text-muted">
            Manage your application tasks and priorities efficiently.
          </p>
        </header>

        <!-- No <main> here - parent view provides it -->
        <div class="todo-container">
          <TodoList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @file TodosView.vue
 * @description Page layout for task management feature
 * 
 * Architecture:
 * - Presentational view component
 * - Centers todo list on page
 * - Provides page title and instructions
 * 
 * Accessibility:
 * - No nested <main> landmark (parent provides it)
 * - Semantic <header> for page title
 * - Clear subtitle explaining feature purpose
 */

import TodoList from '../components/todos/TodoList.vue'
</script>

<style scoped>
/* ==================================================================
   LAYOUT STYLES
   ================================================================== */

.todos-view {
  padding-bottom: 3rem;
  min-height: 60vh;
}

.page-header {
  margin-bottom: 2rem;
}

/* 
 * Subtitle color override for AAA compliance
 * Using darker gray (#3d4144) for 10.5:1 contrast ratio
 */
.subtitle {
  color: #3d4144 !important;
  font-size: 1rem;
  line-height: 1.6;
}


/* ==================================================================
   TODO CONTAINER
   ================================================================== */

.todo-container {
  max-width: 100%;
}
</style>
