import React from'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';

const AuthStak = createStackNavigator();

function AuthRoutes(){
    return(
        <AuthStak.Navigator>
            <AuthStak.Screen name="SignIn" 
            component={SignIn}
            options={{headerShow: false}}/>
        </AuthStak.Navigator>
    );
}

export default AuthRoutes;