import Services from './services'

export default {
  getWechatSignature({ commit }, url) {
    return Services.getWechatSignature(url)
  },
  getUserByOAuth({ commit }, url) {
    return Services.getUserByOAuth(url)
  },
  async fetchHouses({ state }) {
    const res = await Services.fetchHouses()
    console.log(res)
    state.houses = res.data.data
    return res
  },
  async fetchCities({ state }) {
    const res = await Services.fetchCities()
    console.log(res)
    state.cities = res.data.data
    return res
  },
  async fetchCharacters({ state }) {
    const res = await Services.fetchCharacters()
    console.log(res)
    state.characters = res.data.data
    return res
  }
}
