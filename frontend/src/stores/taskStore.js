
import { defineStore } from 'pinia'
import * as api from '../api/taskApi'

export const useTaskStore = defineStore('tasks',{
 state:()=>({tasks:[],loading:false,error:null}),
 actions:{
  async fetch(){
    try{
      this.loading=true
      this.tasks=await api.getAll()
    }catch(e){this.error="Error loading"}
    finally{this.loading=false}
  },
  async add(t){
    try{ this.tasks.push(await api.create(t)) }
    catch(e){ this.error='Error adding task' }
  },
  async update(id, t){
    try{
      const updated = await api.update(id, t)
      const i = this.tasks.findIndex(x => x.id === id)
      if(i !== -1) this.tasks[i] = updated
    }catch(e){ this.error='Error updating task' }
  },
  async delete(id){
    try{
      await api.remove(id)
      this.tasks=this.tasks.filter(x=>x.id!==id)
    }catch(e){ this.error='Error deleting task' }
  }
 }
})
