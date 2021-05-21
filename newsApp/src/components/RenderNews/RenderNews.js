import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { inject, observer } from "mobx-react";
import { isFavorite } from "../../utils/Tools";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const RenderNews = inject('NewsStore')(observer((props) => {
    const { item, addFavoriteIcon, NewsStore } = props
    const { description, image, title } = item
    return (
        <View style={s.container}>
            {image && <Image style={s.image} source={{ uri: image }} />}
            <View style={s.textContainer}>
                <Text numberOfLines={2} style={[s.title, image && s.widthWithImg]}>{title}</Text>
                <Text numberOfLines={5} style={[s.descTxt, image && s.widthWithImg]}>{description}</Text>

                <TouchableOpacity onPress={() => props.navigation.navigate("Details", item)} style={[s.readMoreContainer, image && s.widthWithImg]}>
                    <Text style={s.readMoreTxt}>Read More ></Text>
                </TouchableOpacity>

                {addFavoriteIcon &&
                    <TouchableOpacity onPress={() => NewsStore.setFavorite(item)} style={s.favoriteContainer}>
                        <MaterialCommunityIcons name="star" color={isFavorite(NewsStore.getFavorites, title) ? 'red' : 'gray'} size={24} />
                    </TouchableOpacity>}
            </View>

        </View>
    )
}))

export default RenderNews;

const s = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ECECEC',
        width: 350,
        height: 150,
        paddingVertical: 8,
        marginBottom: 8,
        marginTop: 8,
        alignItems: 'center',
        flexDirection: 'row'
    },
    widthWithImg: { maxWidth: 210 },
    widthWithoutImg: {},
    image: {
        height: 130,
        width: 110,
        marginLeft: 8,
    },
    textContainer: {
        paddingHorizontal: 10,
        height: '100%'
    },
    title: {
        maxWidth: 340,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
        height: 50
    },
    descTxt: {
        maxWidth: 340,
        textAlign: 'left',
        color: 'black',
        fontSize: 12,
        height: 70
    },
    readMoreTxt: {
        fontSize: 12,
        color: '#1E47FF'
    },
    readMoreContainer: {
        maxWidth: 340,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    favoriteContainer: {
        position: 'absolute',
        right: -1,
        top: -20,
    }

})