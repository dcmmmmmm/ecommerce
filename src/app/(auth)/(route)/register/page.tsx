'use client'

import React, { FormEvent, use, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import  Link  from "next/link"
import Image from 'next/image'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Separator } from '@/components/ui/separator'
import axios from 'axios'

interface InitialStateProps {
  name: string,
  email: string,
  password: string,
}

const initialState:InitialStateProps = {
  name: '',
  email: '',
  password: ''
}

export default function RegisterPage() {

  const [state, setState] = useState(initialState)
  const [loading, setLoading ] = useState(true)
  const router = useRouter()

  function handleChange(event:any) {
    setState({...state, [event.target.name]: event.target.value})
  }

  const onSubmit = (event: FormEvent) => {
    setLoading(true)
    event.preventDefault()
    axios.post('/api/register',state).
    then(() => {
      router.refresh()
      toast.success('Create an account successfuly')
    }).
    then(() => {
      setTimeout(() => {
        router.push('/login')
      },2500)
    }).catch((error:any) => {
      toast.error('Something went wrong')
    }).finally(() => setLoading(false))
  }

  return (
    <div className='bg-gray-500 min-h-screen flex items-center justify-center'>
    <div className='bg-white flex rounded-2xl shadow-lg shadow-white max-w-3xl p-5'>
      {/* Form */}
      <Card className='sm:w-1/2 border-none rounded-2xl '>
        <CardHeader>
          <CardTitle className='text-black'>Register</CardTitle>
          <CardDescription className='text-black'>Enter your details to register.</CardDescription>
        </CardHeader>
        <Separator/>
        <CardContent> 
          <form className="flex flex-col" onSubmit={onSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Label htmlFor="name" className='text-black '>Name</Label>
              <Input className='p-2 rounded-xl border border-black text-black ' id="Name"  value={state.name} onChange={handleChange} name='name' type='text'/>
              <Label htmlFor="email" className='text-black '>Email</Label>
              <Input className='p-2 rounded-xl border border-black text-black ' id="Email" value={state.email} onChange={handleChange} name='email' type='email'/>
              <Label htmlFor="password" className='text-black'>Password</Label>
              <Input className='p-2 rounded-xl border border-black text-black' type="password"  id="Password"  value={state.password} onChange={handleChange} name='password' /> 
            </div>
            <Button className="mt-6 text-black bg-black rounded-xl text-white hover:bg-gray-400" type='submit'>
              REGISTER
            </Button>
            <div>
              <h4 className="mt-5 text-lg text-black flex justify-between">
                Alredy have an Account?
                <Link href="/login" className="font-medium text-gray-900 hover:text-gray-600">
                  Sign in
                </Link>
              </h4>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className='sm:block hidden w-1/2  '>
        <Image src={'/loginphoto.png'} alt='' width={500} height={500} className='ml-2 rounded-2xl'/>
      </div>
    </div>
    
  </div>
  );
}

