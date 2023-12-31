import React from 'react'
import Heading from './Heading'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function PageHeader({header, LinkTitle, href} : any) {
  return (
    <div className="flex justify-between pb-4">
      <Heading title={header}/>
      <Link href={href}
            className='flex items-center space-x-3 text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-xl text-sm px-5 py-3 text-center dark:focus:ring-[#1da1f2]/55 me-2 '>
        <Plus/>
        <span>{LinkTitle}</span>
      </Link>
    </div>
  )
}
