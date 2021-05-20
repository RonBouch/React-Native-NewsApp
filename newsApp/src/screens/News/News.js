import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { inject, observer } from "mobx-react";

@inject('NewsStore')
@observer
export default class News extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { NewsStore } = this.props
        NewsStore.setName("RON")
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Text>News {NewsStore.getFavorite}</Text>
                <TouchableOpacity>
                    <Text onPress={() => this.props.navigation.navigate("Details")}>
                        GoTo - > > {NewsStore.getName}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const s = StyleSheet.create({


})