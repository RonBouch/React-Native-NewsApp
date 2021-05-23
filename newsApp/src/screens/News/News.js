import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { inject, observer } from "mobx-react";
import { RenderNews } from "../../components";
import Dropdown from 'react-native-modal-select-option';
import uniq from 'lodash/uniq';



@inject('NewsStore')
@observer
export default class News extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: 0, label: 'All' },
      isShowingOptions: false,
      getNewsAfterFilter: [],
      dropdownData: []
    }
  }

  componentDidMount() {
    const { NewsStore } = this.props
    let dropdownData = this.getDropdownData()
    this.setState({ getNewsAfterFilter: NewsStore.getNews.data, dropdownData })
  }

  _onSelect(item, isShow) {
    const { NewsStore } = this.props
    let newsAfterFilter = item.value == 0 ? NewsStore.getNews.data : NewsStore.getNews.data.filter(n => n.category == item.value)
    this.setState({
      getNewsAfterFilter: newsAfterFilter,
      isShowingOptions: isShow,
      selectedOption: item,
    });
  }

  getDropdownData = () => {
    const { NewsStore } = this.props
    const getNews = NewsStore.getNews && NewsStore.getNews.data
    let getCategories = []
    if (getNews)
      getCategories = (uniq(getNews.map(n => n.category))).map(c => c && { value: c, label: c })
    getCategories.unshift({ value: 0, label: 'All' })
    return { options: getCategories, label: 'Choose category', animationType: 'none' }
  }


  render() {
    const { getNewsAfterFilter, dropdownData, isShowingOptions, selectedOption } = this.state
    return (
      <View style={s.container}>
        <Image style={s.image} source={{
          uri: 'https://limousineuara.com/wp-content/uploads/2018/01/news-limousine-uara.jpg'
        }} />
        <View style={s.dropdownContainer}>
          <Dropdown {...dropdownData}
            onShow={(value) => this.setState({ isShowingOptions: value })}
            onSelect={this._onSelect.bind(this)}
            isShowingOptions={isShowingOptions}
            selectedOption={selectedOption}
          />
        </View>

        {getNewsAfterFilter && !!getNewsAfterFilter.length &&
          < FlatList
            data={getNewsAfterFilter}
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
  dropdownContainer: { padding: 10, width: '100%' },

})