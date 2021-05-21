import { observable, action, computed } from "mobx";
import { persist } from 'mobx-persist'

class NewsStore {
    @persist("object") @observable news = {}
    @persist('list') @observable favorites = []
    @observable name = null

    //GET
    @computed
    get getName() {
        return this.name
    }
    @computed
    get getFavorites() {
        return this.favorites
    }

    @computed
    get getNews() {
        return this.news
    }
    @action
    setNews(data) {
        console.log("news", data)
        this.news = data;
    }
    @action
    setName(data) {
        this.name = data;
    }
    @action
    setFavorite(data) {
        let newFavorite = []
        let removeFromFavorite = false
        this.favorites.map(f => {
            if (data.title != f.title) {
                newFavorite.push(f)
            } else {
                removeFromFavorite = true
            }
        })
        if (!removeFromFavorite) {
            newFavorite.unshift(data)
        }
        this.favorites = newFavorite
    }
}

const newsStore = new NewsStore();
export default newsStore;
