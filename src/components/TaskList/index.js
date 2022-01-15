import React from 'react';
import { Container, Texto } from './styles';
export default function Listagem({ data }){
  return(
    <Container>
      <Texto>Nome: {data.nome}</Texto>
      <Texto>Endereço: {data.endereco}</Texto>
      <Texto>Telefone: {data.telefone}</Texto>
    </Container>
  )
}


