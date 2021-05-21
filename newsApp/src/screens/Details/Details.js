import React from "react";
import { Text, View, Image, TouchableOpacity, Linking, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { inject, observer } from "mobx-react";
import { isFavorite } from "../../utils/Tools";


const Details = inject('NewsStore')(observer((props) => {
    const { NewsStore } = props
    const details = props.route?.params
    return (
        <View style={s.container}>

            <Text style={s.title}>{details.title}</Text>
            {details.image && <Image style={s.image} source={{ uri: details.image }} />}
            <Text style={s.descTxt}>{details.description}</Text>

            <View style={s.buttonsContainer}>
                <TouchableOpacity onPress={() => NewsStore.setFavorite(details)} style={s.favoriteContainer}>
                    <MaterialCommunityIcons name="star" color={isFavorite(NewsStore.getFavorites, details.title) ? 'red' : 'gray'} size={24} />
                    <Text style={s.favoriteTxt}>Add to fafvorite</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(details.url)} >
                    <Text style={s.moreTxt}>more...</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}))
export default Details;

const s = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ECECEC',
        paddingVertical: 8,
        marginBottom: 16,
        alignItems: 'center',
        paddingHorizontal: 16
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        textAlign: 'left',
        marginBottom: 10
    },
    image: {
        height: 200,
        width: '96%',
        borderRadius: 10,
        marginBottom: 10
    },
    descTxt: {
        textAlign: 'left',
        color: '#5A5959',
        fontSize: 14
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    favoriteContainer: {
        bottom: 8,
        alignItems: 'center'
    },
    favoriteTxt: { fontSize: 12 },
    moreTxt: {
        fontSize: 14,
        color: '#1E47FF',
        textAlign: 'left',
        marginTop: 14
    }
})