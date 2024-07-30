import React from 'react'
import { Button } from './ui/button'
import { Github } from 'lucide-react'

export default function Navbar() {
  return (
    <>
      <div className='flex bg-slate-500 text-white justify-around py-3 items-center'>
        <div className='font-bold text-xl md:text-2xl'>      
            <span className='text-slate-700'>&lt;</span>
            Pass
            <span className='text-slate-700'> OP/&gt;</span>
        </div>

        <Button variant="secondary" className="flex items-center bg-slate-600 text-white hover:text-black"> 
          <Github className="mr-2" /> GitHub
        </Button>
      </div>
    </>
  )
}
