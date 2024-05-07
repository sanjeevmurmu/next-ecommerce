import React, { ReactNode } from 'react'

export const PageHeader = ({children}:{children:ReactNode}) => {
  return (
    <h1 className='text-4xl my-4'>{children}</h1>
  )
}

