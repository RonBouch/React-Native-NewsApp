import { observable, action, computed } from "mobx";
import { persist } from 'mobx-persist'

class NewsStore {
    @persist("object") @observable news = {}
    @persist('object') @observable user = {}
    @persist('list') @observable favorites = []

    //GET
    @computed
    get getUser() {
        return this.user
    }
    @computed
    get getFavorites() {
        return this.favorites
    }

    @computed
    get getNews() {
        return this.news
    }

    //SET
    @action
    setUser(data) {
        this.user = data;
    }
    @action
    setNews(data) {
        this.news = data;
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
