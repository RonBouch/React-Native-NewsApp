import { observable, action, computed } from "mobx";
import { persist } from 'mobx-persist'

class NewsStore {
    @persist @observable favorites = null
    @observable name = null

    //GET
    @computed
    get getName() {
        return this.name
    }
    @computed
    get getFavorite() {
        return this.favorites
    }

    @action
    setName(data) {
        this.name = data;
    }
    @action
    setFavorite(data) {
        this.favorites = data;
    }
}

const newsStore = new NewsStore();
export default newsStore;
