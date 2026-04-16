import axios from 'axios'

const BASE = 'http://localhost:8080/api/tasks'

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const getAll = () => axios.get(BASE, getHeaders()).then(r => r.data)
export const create = t => axios.post(BASE, t, getHeaders()).then(r => r.data)
export const update = (id, t) => axios.put(`${BASE}/${id}`, t, getHeaders()).then(r => r.data)
export const remove = id => axios.delete(`${BASE}/${id}`, getHeaders())
