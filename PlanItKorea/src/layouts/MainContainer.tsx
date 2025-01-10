import React from 'react'
import { MainContent } from './Container';

interface ContainerProps  {
  children: React.ReactNode;  
};

export default function MainContainer({children} : ContainerProps) {
  return (
    <MainContent>
      {children}
    </MainContent>
  )
}
