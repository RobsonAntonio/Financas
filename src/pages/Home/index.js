import React, { useState, useEffect } from 'react';
import {Button ,FlatList, ActivityIndicator, TouchableWithoutFeedback, Keyboard} from 'react-native';
import firebase from '../../services/firebaseConnection';
import Listagem from '../../components/TaskList';
import { Container, Input, Texto } from './styles';


export default function Home(){
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cliente, setcliente] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {

    async function dados(){

      await firebase.database().ref('clientes').on('value', (snapshot) => {
        setcliente([]);

        snapshot.forEach((chilItem) => {
          let data = {
            key: chilItem.key,
            nome: chilItem.val().nome,
            endereco: chilItem.val().endereco,
            telefone: chilItem.val().telefone


          };

          setcliente(oldArray => [...oldArray, data].reverse());
        })

        setLoading(false);

      })

    }

    dados();


  }, []);



  async function cadastrar(){
    if(nome !== '' & telefone !== '' & endereco !== ''){
      let clientes = await firebase.database().ref('clientes');
      let chave = clientes.push().key;

      clientes.child(chave).set({
        nome: nome,
        telefone: telefone,
        endereco: endereco,
      });

      alert('Cadastrado com sucesso!');
      setTelefone('');
      setNome('');
      setEndereco('');

    }
  }

  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <Container>
      <Texto>Nome</Texto>
      <Input
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setNome(texto) }
      value={nome}
      />

      <Texto>Endereço</Texto>
      <Input
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setEndereco(texto) }
      value={endereco}
      />

      <Texto>Telefone</Texto>
      <Input
      underlineColorAndroid="transparent"
      keyboardType='numeric'
      onChangeText={(texto) => setTelefone(texto) }
      value={telefone}
      />


      <Button
      title="Cadastrar Cliente"
      onPress={cadastrar}
      color={'#00b94a'}
      fontWeight={'bold'}
      

      />

      {loading ? 
      (
        <ActivityIndicator color="#FFF" size={45} />
      ) :
      (
        <FlatList
        keyExtractor={item => item.key}
        data={cliente}
        renderItem={ ({item}) => ( <Listagem data={item} /> )  }
        />
      )
      }


    </Container>
    </TouchableWithoutFeedback>
  );
}




  
