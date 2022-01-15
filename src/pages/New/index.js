import { base } from 'link';
import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback, ActivityIndicator, View, FlatList } from 'react-native';
import PickerCustomer from '../../Picker';
import firebase from '../../services/firebaseConnection';
import { Background, SubmitButton, Input, SubmitText } from './styles';
import { Picker } from '@react-native-picker/picker'


const inicialState = {
  customer: null, product: null, amount: 0
}


export default function New({ data }) {
  const [quantidade, setQuantidade] = useState('');
  const [cliente, setCliente] = useState('');
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState(inicialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {

      await firebase.database().ref('produtos').on('value', (snapshot) => {
        setProducts([]);

        snapshot.forEach((chilItem) => {
          setProducts(oldArray => [...oldArray, { ...chilItem.val() }].reverse());
        })


      })

    }

    getProducts();

  }, []);

  async function cadastrar() {


    let pedidos = await firebase.database().ref('pedidos');
    let chave = pedidos.push().key;

    pedidos.child(chave).set(order);
    setOrder(inicialState);

  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>

        <PickerCustomer onSelect={(customer) => setOrder(oldOrder => ({ ...oldOrder, customer }))} value={order.customer} />


        <View style={{ backgroundColor: '#FFF', width: '90%', marginVertical: 10 }}>

          <Picker style={{ width: '100%' }}
            selectedValue={order.product}
            onValueChange={(product) => setOrder(oldOrder => ({ ...oldOrder, product }))}
          >
            {products.map(product => <Picker.Item label={`Descr: ${product.descricao} Qtd.: ${product.quantidade}`} value={product} />)}
          </Picker>
        </View>

        <Input
          placeholder="Quantidade"
          keyboardType="numeric"
          onSubmitEditing={() => Keyboard.dismiss()}
          value={order.amount}
          onChangeText={(text) => setOrder(oldOrder => ({ ...oldOrder, amount: text }))}
        />

        <SubmitButton onPress={cadastrar}>
          <SubmitText>Finalizar</SubmitText>
        </SubmitButton>


      </Background>
    </TouchableWithoutFeedback>
  );
}