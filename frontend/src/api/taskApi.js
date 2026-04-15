
import axios from 'axios'
const BASE = 'http://localhost:8080/api/tasks'

export const getAll = () => axios.get(BASE).then(r=>r.data)
export const create = t => axios.post(BASE,t).then(r=>r.data)
export const update = (id,t)=>axios.put(`${BASE}/${id}`,t).then(r=>r.data)
export const remove = id => axios.delete(`${BASE}/${id}`)
