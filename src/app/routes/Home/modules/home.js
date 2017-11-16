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
  get(apiUrl.bannerUrl).then(data => {
    dispatch({
      type: HOME_LOAD_BANNER,
      banner: data,
      bannerLoading: false,
    })
  }).catch(() => {
    dispatch({
      type: HOME_LOAD_BANNER,
      bannerLoading: false,
    })
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
  get(apiUrl.commoditiesUrl).then(data => {
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
      winners: data,
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
}

const initialState = {
  bannerLoading: false,
  auctionLoading: true,
  recommendsLoading: true,
  winnersLoading: false,
  banner: ['http://odp22tnw6.bkt.clouddn.com/v2/ccas/banner.jpg', 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/banner.jpg'],
  winners: [{

  }, {

  }, {

  }, {

  }, {

  }, {

  }]
}
export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}