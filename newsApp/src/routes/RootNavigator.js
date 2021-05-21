import * as React from 'react';
import { StyleSheet } from 'react-native';
import { News, Favorite, Details } from '../screens'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const FavoriteStack = createStackNavigator();

function MainStack() {
    return (
        <HomeStack.Navigator
            initialRouteName="News"
            screenOptions={{
                headerTintColor: 'black',
                headerStyle: s.tabBarColor,
            }}>
            <HomeStack.Screen name="News" component={News} />
            <HomeStack.Screen name="Details" component={Details} />
        </HomeStack.Navigator>
    );
}
function getFavoriteStack() {
    return (
        <FavoriteStack.Navigator screenOptions={{
            headerTintColor: 'black',
            headerStyle: s.tabBarColor,
        }}>
            <FavoriteStack.Screen name="My-Favorites" component={Favorite} />
            <HomeStack.Screen name="Details" component={Details} />
        </FavoriteStack.Navigator>
    );
}
export default class RootNavigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={{ style: s.tabBarColor }} >
                    <Tab.Screen name="News" component={MainStack} options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="bell" color={color} size={size} />
                        ),
                    }} />
                    <Tab.Screen name="Favorite" component={getFavoriteStack} options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="star" color={color} size={size} />
                        ),
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

const s = StyleSheet.create({
    tabBarColor: {
        backgroundColor: '#E3DEE5'
    },
});