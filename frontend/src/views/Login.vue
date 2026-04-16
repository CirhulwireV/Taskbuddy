<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)

const login = async () => {
  if (!email.value || !password.value) return
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/tasks')
  } catch (e) {} finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <router-link to="/" class="logo">TaskBuddy</router-link>
      <h2>Welcome back</h2>
      <p class="subtitle">Login to your account</p>

      <div class="form">
        <input v-model="email" type="email" placeholder="Email address" />
        <input v-model="password" type="password" placeholder="Password" />
        <p class="error" v-if="auth.error">{{ auth.error }}</p>
        <button @click="login" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>

      <p class="switch">Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', sans-serif;
}

.auth-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #6c63ff;
  text-decoration: none;
  display: block;
  margin-bottom: 24px;
}

h2 { font-size: 1.6rem; color: #1a1a2e; margin-bottom: 8px; }
.subtitle { color: #888; margin-bottom: 28px; }

.form { display: flex; flex-direction: column; gap: 14px; }

input {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border 0.2s;
}

input:focus { border-color: #6c63ff; }

button {
  padding: 13px;
  background: #6c63ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

button:hover:not(:disabled) { background: #574fd6; }
button:disabled { opacity: 0.7; cursor: not-allowed; }

.error { color: #e53935; font-size: 0.85rem; text-align: left; }

.switch { margin-top: 20px; color: #888; font-size: 0.9rem; }
.switch a { color: #6c63ff; text-decoration: none; font-weight: 600; }
.forgot { margin-top: 8px; font-size: 0.9rem; }
.forgot a { color: #6c63ff; text-decoration: none; }
</style>
