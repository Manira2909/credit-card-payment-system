import React, { useState } from 'react';
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState(''), [pwd,setPwd]=useState('')
  const nav=useNavigate()
  const submit=async(e)=>{
    e.preventDefault()
    const form=new FormData(); form.append('username',email); form.append('password',pwd)
    const res=await api.post('/api/auth/login', form)
    localStorage.setItem('token', res.data.access_token)
    nav('/dashboard')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6">Login ma!</h1>
        <input className="w-full p-3 border rounded mb-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="w-full p-3 border rounded mb-4" type="password" placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)}/>
        <button className="w-full bg-blue-600 text-white p-3 rounded font-bold">Login</button>
      </form>
    </div>
  )
}