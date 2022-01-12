import React from'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';

const AppStak = createStackNavigator();

function AppRoutes(){
    return(
        <AppStak.Navigator>
            <AppStak.Screen name="Home" component={Home}/>
        </AppStak.Navigator>
    );
}

export default AppRoutes;