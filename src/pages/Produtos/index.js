import React, { useState, useEffect } from 'react';
import {Button, FlatList, ActivityIndicator, TouchableWithoutFeedback, Keyboard} from 'react-native';
import firebase from '../../services/firebaseConnection';
import ListagemProdutos from '../../components/TaskListProdutos';
import { Container, Input, Texto } from './styles';



export default function Produto() {
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [codigo, setCodigo] = useState('');
    const [valor, setValor] = useState('');
    const [produto, setProduto] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function dados() {

            await firebase.database().ref('produtos').on('value', (snapshot) => {
                setProduto([]);

                snapshot.forEach((chilItem) => {
                    let data = {
                        key: chilItem.key,
                        descricao: chilItem.val().descricao,
                        valor: chilItem.val().valor,
                        quantidade: chilItem.val().quantidade,
                        codigo: chilItem.val().codigo,



                    };

                    setProduto(oldArray => [...oldArray, data].reverse());
                })

                setLoading(false);

            })

        }

        dados();


    }, []);



    async function cadastrar() {
        if (descricao !== '' & quantidade !== '' & valor !== '' & codigo !== '') {
            let produtos = await firebase.database().ref('produtos');
            let chave = produtos.push().key;

            produtos.child(chave).set({
                descricao: descricao,
                quantidade: quantidade,
                valor: valor,
                codigo: codigo
            });

            alert('Cadastrado com sucesso!');
            setQuantidade('');
            setDescricao('');
            setValor('');
            setCodigo('');

        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
            <Texto>Código</Texto>
            <Input
                underlineColorAndroid="transparent"
                keyboardType='numeric'
                onChangeText={(texto) => setCodigo(texto)}
                value={codigo}
            />
            <Texto>Descrição</Texto>
            <Input
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setDescricao(texto)}
                value={descricao}
            />


            <Texto>Quantidade</Texto>
            <Input
                underlineColorAndroid="transparent"
                keyboardType='numeric'
                onChangeText={(texto) => setQuantidade(texto)}
                value={quantidade}
            />

            <Texto>Valor</Texto>
            <Input
                underlineColorAndroid="transparent"
                keyboardType='numeric'
                onChangeText={(texto) => setValor(texto)}
                value={valor}
            />

            <Button
                title="Cadastrar Produto"
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
                        data={produto}
                        renderItem={({ item }) => (<ListagemProdutos data={item} />)}
                    />
                )
            }


        </Container>
        </TouchableWithoutFeedback>
    );
}

