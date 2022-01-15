import React, { useState, useEffect } from "react";
import { Picker as PickerNative } from '@react-native-picker/picker'
import { PickerView } from './styles';
import firebase from '../services/firebaseConnection';

export default function PickerCustomer({ onSelect, value }) {
    const [cliente, setCliente] = useState([]);
 

    useEffect(() => {

        async function dados() {

            await firebase.database().ref('clientes').on('value', (snapshot) => {
                setCliente([]);

                snapshot.forEach((chilItem) => {
                    let data = {
                        key: chilItem.key,
                        nome: chilItem.val().nome,

                    };

                    setCliente(oldArray => [...oldArray, data].reverse());
                })
            })

        }

        dados();


    }, []);

    return (
        <PickerView>
            <PickerNative
                style={{
                    width: '100%'
                }}
                selectedValue={value}
                onValueChange={(valor) => onSelect(valor)}
            >
                {cliente.map(item => <PickerNative.Item label={item.nome} value={item} />)}
            </PickerNative>



        </PickerView>
    );
}