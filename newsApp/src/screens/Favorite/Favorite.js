import React from "react";
import { Text, View } from "react-native";
import { inject, observer } from "mobx-react";


const Favorite = inject('NewsStore')(observer((props) => {
    const { NewsStore } = props
    NewsStore.setFavorite(6)
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Text>Favorite {props.NewsStore.getName}</Text>
        </View>
    )
}))
export default Favorite;