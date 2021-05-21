import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from "react-native";
import { inject, observer } from "mobx-react";
import { RenderNews } from "../../components";

@inject('NewsStore')
@observer
export default class News extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const { NewsStore } = this.props
        const getNews = NewsStore.getNews
        return (
            <View style={s.container}>
                <Image style={s.image} source={{
                    uri: 'https://limousineuara.com/wp-content/uploads/2018/01/news-limousine-uara.jpg'
                }} />

                {getNews.data && getNews.data.length &&
                    <FlatList
                        data={getNews.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <RenderNews
                                item={item}
                                navigation={this.props.navigation}
                            />} />}
            </View>
        )
    }
}
const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: '100%'
    },
    image: {
        height: 100,
        width: 350,
        marginBottom: 8,
        borderWidth: 1
    },

})