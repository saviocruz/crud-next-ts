import React from 'react'
import { Header } from 'semantic-ui-react'

type HeaderProps = {
  titulo?: string;
}
export default function HeaderLocal ({ titulo }: HeaderProps) {
  return (
    <Header as='h1' image='/img/school.png' content={titulo}   />
  )
}
