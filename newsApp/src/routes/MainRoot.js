import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, Promise } from "react-native";
import { NewsStore } from "../stores";
import { observer, Provider } from "mobx-react";
import { create } from 'mobx-persist'
import RootNavigator from "./RootNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from "lodash/isEmpty";
import { withQuery } from "../utils/Tools";

const stores = { NewsStore };
const hydrate = create({
    storage: AsyncStorage
});
const HandleHydrate = async () => {
    return new Promise((resolve, reject) => {
        hydrate('news', NewsStore).then(() => {
            resolve(true)
        })
    })
}

@observer
export default class MainRoot extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        try {
            await HandleHydrate()
            const params = { 'access_key': 'b924a0ad9b499830e236e11b3a2cff04' }
            let url = withQuery('http://api.mediastack.com/v1/news', params)
            // if (isEmpty(NewsStore.getNews)) {
                await fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        NewsStore.setNews(data)
                    });
            // }
        }
        catch (ex) {
            console.log('MainRoot init Error ' + ex.message)
        }
    }

    render() {
        if (isEmpty(NewsStore.getNews)) return <View />
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
        backgroundColor: '#E3DEE5',
        zIndex: 0,
        flex: 1
    },
    safeGray: {
        flex: 1,
        backgroundColor: '#E3DEE5'
    },
});
