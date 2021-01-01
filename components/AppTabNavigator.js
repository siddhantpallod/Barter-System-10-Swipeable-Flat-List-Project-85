import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    Home : {screen : HomeScreen,
    navigationOptions : {
        tabBarIcon : 
        <Image
            style = {{
                width : 30,
                height : 30
            }}

            source = {require('../assets/Home.png')}
        />
        }   
    },
    Exchange : {screen : ExchangeScreen,
        navigationOptions : {
            tabBarIcon : 
            <Image
                style = {{
                    width : 30,
                    height : 30
                }}
    
                source = {require('../assets/Exchange.png')}
            />
    }
}
})

