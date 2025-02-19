import React from 'react'
import {
  RootContainer
} from "./Container";

interface ContainerProps  {
  children: React.ReactNode;  
};

export default function AppContainer({children} : ContainerProps) {
  return (
    <RootContainer>
      {children}
    </RootContainer>
  )
}
