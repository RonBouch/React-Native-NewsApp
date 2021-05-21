import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { inject, observer } from "mobx-react";
import { RenderNews } from "../../components";

const Favorite = inject('NewsStore')(observer((props) => {
    const { NewsStore } = props
    return (
        <View style={s.container}>
            {!!NewsStore.getFavorites.length ?
                <FlatList
                    data={NewsStore.getFavorites}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <RenderNews
                            addFavoriteIcon
                            item={item}
                            navigation={props.navigation}
                        />} /> :
                <Text style={s.noResTxt}>No-Results</Text>}
        </View >
    )
}))
export default Favorite;

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: '100%',
    },
    noResTxt: {
        fontSize: 18,
        marginTop: 20,
        color: 'gray'
    }
})