import React from "react";
import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import { inject, observer } from "mobx-react";
import { RenderNews } from "../../components";
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import isEmpty from "lodash/isEmpty";

const Favorite = inject('NewsStore')(observer((props) => {
    const { NewsStore } = props

    const initUser = async (token) => {
        const { NewsStore } = props
        await fetch(`https://graph.facebook.com/me?fields=id,name,first_name,last_name,gender,picture.type(large),cover&access_token=${token}`)
            .then((response) => response.json())
            .then((userData) => { NewsStore.setUser(userData) })
            .catch(() => { console.log('ERROR GETTING DATA FROM FACEBOOK') })
    }

    return (
        <View style={s.container}>
            {!isEmpty(NewsStore.getUser) && NewsStore.getUser.picture &&
                <>
                    <Text style={s.helloUser}>Hello {NewsStore.getUser.name}</Text>
                    < Image style={s.image} source={{
                        uri: NewsStore.getUser.picture.data.url
                    }} />
                </>}

            {!!NewsStore.getFavorites.length && !isEmpty(NewsStore.getUser) ?
                <FlatList
                    data={NewsStore.getFavorites}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <RenderNews
                            addFavoriteIcon
                            item={item}
                            navigation={props.navigation}
                        />} /> :
                <Text style={s.noResTxt}>{isEmpty(NewsStore.getUser) ? 'Please log in to continue.' : 'No-Results'}</Text>}

            <View style={s.facebookLoginContainer}>
                <LoginButton
                    publishPermissions={['publish_actions']}
                    readPermissions={['public_profile']}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then((data) => {
                                    initUser(data.accessToken)
                                });
                            }
                        }}
                    onLogoutFinished={() => NewsStore.setUser({})} />
            </View>

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
    },
    helloUser: { fontSize: 18, fontWeight: 'bold' },
    facebookLoginContainer: { bottom: 0, marginTop: 10 },
    image: {
        marginVertical: 12,
        borderRadius: 200,
        width: 150,
        height: 150
    },
})