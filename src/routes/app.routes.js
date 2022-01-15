import React from'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import Produtos from '../pages/Produtos';

const AppDraw = createDrawerNavigator();

function AppRoutes(){
    return(
        <AppDraw.Navigator
        drawerStyle={{
            backgroundColor: '#171717'
        }}
        drawerContentOptions={{
            labelStyle:{
                fontWeight: 'bold'
            },
            activeTintColor:'#FFF',
            activeBackgroundColor:'#00b94a',
            inactiveBackgroundColor:'#000',
            inactiveTintColor:'#DDD',
            itemStyle:{
                marginVertical: 5,
            }
        }}
        
        >
            <AppDraw.Screen name="Cadastro Clientes" component={Home}/>
            <AppDraw.Screen name="Cadastro Produtos" component={Produtos}/>
            <AppDraw.Screen name="Vendas" component={New}/>
            <AppDraw.Screen name="Perfil" component={Profile}/>
        </AppDraw.Navigator>
    );
}

export default AppRoutes;