
export const isFavorite = (favorites, title) => {
    return favorites.findIndex(f => f.title == title) != -1
}

export const withQuery = (url, params) => {
    let query = Object.keys(params)
        .filter(k => !!params[k])
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&')
    url += (url.indexOf('?') === -1 ? '?' : '&') + query
    return url
}