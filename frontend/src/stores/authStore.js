import { defineStore } from 'pinia'
import axios from 'axios'

const BASE = 'http://localhost:8080/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    error: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    async register(name, email, password) {
      try {
        this.error = null
        const res = await axios.post(`${BASE}/register`, { name, email, password })
        this.token = res.data.token
        this.user = { name: res.data.name, email: res.data.email }
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (e) {
        this.error = e.response?.data || 'Registration failed'
        throw e
      }
    },
    async login(email, password) {
      try {
        this.error = null
        const res = await axios.post(`${BASE}/login`, { email, password })
        this.token = res.data.token
        this.user = { name: res.data.name, email: res.data.email }
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (e) {
        this.error = e.response?.data || 'Invalid email or password'
        throw e
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
