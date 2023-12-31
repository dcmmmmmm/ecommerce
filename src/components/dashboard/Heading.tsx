import React from 'react'

export default function Heading({title} : any) {
  return (
    <div>
      <h2 className='text-2xl font-bold text-black dark:text-white  '>{title}</h2>
    </div>
  )
}
