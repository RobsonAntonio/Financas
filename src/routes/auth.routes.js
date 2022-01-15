import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthStak = createStackNavigator();

function AuthRoutes() {
    return (
        <AuthStak.Navigator>
            <AuthStak.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }} />

            <AuthStak.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerStyle:{
                        backgroundColor:'#131313',
                        borderBottomWidth:1,
                        borderBottomColor: '#00b94a',
                    },
                    headerTintColor: '#FFF',
                    headerBackTitleVisible:false,
                    headerTitle:'Voltar'
                }}
            />

        </AuthStak.Navigator>

    );
}

export default AuthRoutes;