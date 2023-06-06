import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function IndexPage() {
  const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem('C_token')
  if(!token){
    navigate('/login')
  }else{
    navigate('/dashboard')
  }


}, [])

  return (
    <div>IndexPage</div>
  )
}
