import React from 'react';
import { Container, Texto } from './styles';
export default function ListagemProdutos({ data }){
  return(
    <Container>
      <Texto>Código: {data.codigo}</Texto>
      <Texto>Descrição: {data.descricao}</Texto>
      <Texto>Quantidade: {data.quantidade}</Texto>
      <Texto>Valor: {data.valor}</Texto>
    </Container>
  )
}
