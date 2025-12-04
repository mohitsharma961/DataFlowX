"use client";
import { ParamProps } from '@/types/appNode';
import React from 'react'

const BrowserInstanceParam = ({param}:ParamProps) => {
  return (
    <div>
    <p className='text-xs'>{param.name}</p>
    </div>
  )
}

export default BrowserInstanceParam
