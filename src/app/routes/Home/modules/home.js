const HOME_LOAD_BANNER = 'HOME_LOAD_BANNER'
const HOME_LOAD_AUCTIONS = 'HOME_LOAD_AUCTIONS'
const HOME_LOAD_RECOMMENDS = 'HOME_LOAD_RECOMMENDS'
const HOME_LOAD_WINNING = 'HONG_LOAD_WINNING'
import { get } from '../../../Util'
import apiUrl from '../../../apiUrl'
export const loadBanner = () => dispatch => {
  dispatch({
    type: HOME_LOAD_BANNER,
    bannerLoading: true,
  })
  fetch(apiUrl.bannerUrl, {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).then(data => {
    dispatch({
      type: HOME_LOAD_BANNER,
      banner: data,
      bannerLoading: false,
    })
  }).catch((err) => {
    dispatch({
      type: HOME_LOAD_BANNER,
      bannerLoading: false,
    })
    throw err
  })
}

export const loadAuctions = () => dispatch => {
  dispatch({
    type: HOME_LOAD_AUCTIONS,
    auctionLoading: true,
  })
  get(apiUrl.auctionUrl).then(data => {
    dispatch({
      type: HOME_LOAD_AUCTIONS,
      auctionLoading: false,
      auction: data,
    })
  }).catch(() => {
    dispatch({
      type: HOME_LOAD_AUCTIONS,
      auctionLoading: false,
    })
  })
}

export const loadRecommeds = () => dispatch => {
  dispatch({
    type: HOME_LOAD_RECOMMENDS,
    recommendsLoading: true
  })
  get(apiUrl.commoditiesUrl, {
    state: [1],
    focus: 1,
  }).then(data => {
    dispatch({
      type: HOME_LOAD_RECOMMENDS,
      recommendsLoading: false,
      recommends: data.records,
    })
  }).catch(() => {
    dispatch({
      type: HOME_LOAD_RECOMMENDS,
      recommendsLoading: false,
    })
  })
}

export const loadWinning = () => dispatch => {
  dispatch({
    type: HOME_LOAD_WINNING,
    winnersLoading: true
  })
  get(apiUrl.winnersUrl).then(data => {
    dispatch({
      type: HOME_LOAD_WINNING,
      winnersLoading: false,
      winners: data.records,
    })
  }).catch(() => {
    dispatch({
      type: HOME_LOAD_WINNING,
      winnersLoading: false,
    })
  })
}

const ACTION_HANDLERS = {
  [HOME_LOAD_BANNER]: (state, action) => ({ ...state, ...action }),
  [HOME_LOAD_AUCTIONS]: (state, action) => ({ ...state, ...action }),
  [HOME_LOAD_RECOMMENDS]: (state, action) => ({ ...state, ...action }),
  [HOME_LOAD_WINNING]: (state, action) => ({ ...state, ...action }),
}
const initialState = {
  bannerLoading: false,
  auctionLoading: true,
  recommendsLoading: true,
  winnersLoading: false,
  banner: [],
  winners: [],
}
export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}