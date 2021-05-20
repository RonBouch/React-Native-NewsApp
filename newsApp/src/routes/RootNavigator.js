import * as React from 'react';
import { StyleSheet } from 'react-native';
import { News, Favorite, Details } from '../screens'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 200,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const FavoriteStack = createStackNavigator();

function MainStack() {
    return (
        <HomeStack.Navigator
            initialRouteName="News"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
            }}
        >
            <HomeStack.Screen name="News" component={News} options={{
                transitionSpec: {
                    open: config,
                    close: config,
                },
            }} />
            <HomeStack.Screen name="Details" component={Details} options={{
                transitionSpec: {
                    open: config,
                    close: config,
                },
            }} />
        </HomeStack.Navigator>
    );
}
function getFavoriteStack() {
    return (
        <FavoriteStack.Navigator>
            <FavoriteStack.Screen name="Favorite" component={Favorite} />
        </FavoriteStack.Navigator>
    );
}
export default class RootNavigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="News" component={MainStack} />
                    <Tab.Screen name="Favorite" component={getFavoriteStack} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}

const s = StyleSheet.create({
    tabIcon: {
        marginTop: 5,
        position: 'relative',
        zIndex: 1,
        elevation: 1
    },
    bottomTabsTabBarOptions: {
        height: 60,
        backgroundColor: 'rgba(49,49,49,.97)',
        paddingBottom: 0
    },
    bottomTabsLabelStyle: {
        fontSize: 10,
        lineHeight: 16,
        paddingBottom: 4,
    },
    bottomTabsHeaderTitle: {
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center',
        flex: 1,
    }
});