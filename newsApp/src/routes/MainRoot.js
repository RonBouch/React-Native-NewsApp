import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, Promise } from "react-native";
import { NewsStore } from "../stores";
import { observer, Provider } from "mobx-react";
import { create } from 'mobx-persist'
import RootNavigator from "./RootNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

const stores = { NewsStore };
const hydrate = create({
    storage: AsyncStorage
});
const HandleHydrate = async () => {
    return new Promise((resolve, reject) => {
        hydrate('favorites', NewsStore).then(() => {
            resolve(true)
        })
    })
}

@observer
export default class MainRoot extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {
        try {
            await HandleHydrate()
        }
        catch (ex) {
            console.log('MainRoot init Error ' + ex.message)
        }
    }

    render() {
        return (
            <SafeAreaView style={s.safeGray} >
                <View style={s.StatusBarBG} />
                <SafeAreaView style={s.safeGray} >
                    <Provider {...stores}>
                        <React.Fragment>
                            <RootNavigator />
                        </React.Fragment>
                    </Provider>
                </SafeAreaView>
            </SafeAreaView >
        );
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    StatusBarBG: {
        position: 'absolute',
        width: "100%",
        height: '100%',
        backgroundColor: 'green',
        zIndex: 0,
        flex: 1
    },
    safeGray: {
        flex: 1,
        backgroundColor: 'white'
    },
});
