<script setup>
import {ref, onMounted} from 'vue'
import {useTaskStore} from './stores/taskStore'

const s = useTaskStore()
const title = ref('')
const desc = ref('')
const priority = ref('MEDIUM')
const status = ref('TODO')

const editing = ref(null)
const editTitle = ref('')
const editDesc = ref('')
const editPriority = ref('')
const editStatus = ref('')

onMounted(() => s.fetch())

const add = async () => {
  if (!title.value.trim()) return
  await s.add({ title: title.value, description: desc.value, priority: priority.value, status: status.value })
  title.value = ''
  desc.value = ''
  priority.value = 'MEDIUM'
  status.value = 'TODO'
}

const startEdit = (t) => {
  editing.value = t.id
  editTitle.value = t.title
  editDesc.value = t.description
  editPriority.value = t.priority
  editStatus.value = t.status
}

const cancelEdit = () => { editing.value = null }

const saveEdit = async (id) => {
  await s.update(id, { title: editTitle.value, description: editDesc.value, priority: editPriority.value, status: editStatus.value })
  editing.value = null
}
</script>

<template>
  <div class="app">
    <div class="container">
      <h1>TaskBuddy</h1>

      <div class="form">
        <input v-model="title" placeholder="Task title..." />
        <input v-model="desc" placeholder="Description..." />
        <div class="row">
          <select v-model="priority">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <select v-model="status">
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        <button @click="add">+ Add Task</button>
      </div>

      <p class="loading" v-if="s.loading">Loading...</p>
      <p class="error" v-if="s.error">{{ s.error }}</p>

      <div class="task-list">
        <div class="task-card" v-for="t in s.tasks" :key="t.id">

          <div v-if="editing !== t.id">
            <div class="task-info">
              <span class="task-title">{{ t.title }}</span>
              <span class="task-desc" v-if="t.description">{{ t.description }}</span>
            </div>
            <div class="task-meta">
              <span class="badge status">{{ t.status }}</span>
              <span :class="['badge', 'priority', t.priority.toLowerCase()]">{{ t.priority }}</span>
              <button class="icon-btn edit" @click="startEdit(t)">✏️</button>
              <button class="icon-btn delete" @click="s.delete(t.id)">🗑</button>
            </div>
          </div>

          <div v-else class="edit-form">
            <input v-model="editTitle" placeholder="Title..." />
            <input v-model="editDesc" placeholder="Description..." />
            <div class="row">
              <select v-model="editPriority">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
              <select v-model="editStatus">
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            <div class="row">
              <button class="save-btn" @click="saveEdit(t.id)">Save</button>
              <button class="cancel-btn" @click="cancelEdit">Cancel</button>
            </div>
          </div>

        </div>
        <p class="empty" v-if="!s.loading && s.tasks.length === 0">No tasks yet. Add one above!</p>
      </div>
    </div>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f2f5;
  min-height: 100vh;
}

.app { min-height: 100vh; padding: 40px 20px; }

.container { max-width: 650px; margin: 0 auto; }

h1 {
  font-size: 2rem;
  color: #1a1a2e;
  margin-bottom: 24px;
  text-align: center;
  font-weight: 700;
}

.form, .edit-form {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

input {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border 0.2s;
  width: 100%;
}

input:focus { border-color: #6c63ff; }

select {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  flex: 1;
  background: white;
  cursor: pointer;
}

select:focus { border-color: #6c63ff; }

.row { display: flex; gap: 12px; }

.form button, .save-btn, .cancel-btn {
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.form button { background: #6c63ff; color: white; }
.form button:hover { background: #574fd6; }

.save-btn { background: #6c63ff; color: white; flex: 1; }
.save-btn:hover { background: #574fd6; }

.cancel-btn { background: #f0f2f5; color: #555; flex: 1; }
.cancel-btn:hover { background: #e0e0e0; }

.task-list { display: flex; flex-direction: column; gap: 12px; }

.task-card {
  background: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.task-card > div:not(.edit-form) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.task-info { display: flex; flex-direction: column; gap: 4px; }
.task-title { font-weight: 600; color: #1a1a2e; font-size: 1rem; }
.task-desc { font-size: 0.85rem; color: #888; }

.task-meta { display: flex; align-items: center; gap: 8px; }

.badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status { background: #e8f5e9; color: #2e7d32; }
.priority.low { background: #e3f2fd; color: #1565c0; }
.priority.medium { background: #fff8e1; color: #f57f17; }
.priority.high { background: #fdecea; color: #c62828; }

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px 6px;
  border-radius: 6px;
  transition: background 0.2s;
}

.icon-btn.edit:hover { background: #e8f5e9; }
.icon-btn.delete:hover { background: #fdecea; }

.loading { text-align: center; color: #888; }
.error { text-align: center; color: #e53935; }
.empty { text-align: center; color: #aaa; padding: 20px; }
</style>
