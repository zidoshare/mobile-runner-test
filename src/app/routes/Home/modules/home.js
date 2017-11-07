const HOME_LOAD_BANNER = 'HOME_LOAD_BANNER'
const HOME_LOAD_AUCTIONS = 'HOME_LOAD_AUCTIONS'
const HOME_LOAD_RECOMMENDS = 'HOME_LOAD_RECOMMENDS'
const HOME_LOAD_WINNING = 'HONG_LOAD_WINNING'
import {get} from '../../../Util'
import apiUrl from '../../../apiUrl'
export const loadBanner = () => dispatch => {
  dispatch({
    type:HOME_LOAD_BANNER,
    bannerLoading:true,
  })
  get(apiUrl.bannerUrl).then(json => {
    if(json.success){
      dispatch({
        type:HOME_LOAD_BANNER,
        banner:json.data,
        bannerLoading:false,
      })
    }else{
      dispatch({
        type:HOME_LOAD_BANNER,
        bannerLoading:false,
      })
    }
  })
}

export const loadAuctions = () => dispatch => {
  dispatch({
    type:HOME_LOAD_AUCTIONS,
    auctionLoading:true,
  })
  get(apiUrl.auctionUrl).then(json => {
    if(json.success){
      dispatch({
        type:HOME_LOAD_AUCTIONS,
        auctionLoading:false,
        auction:json.data,
      })
    }else{
      dispatch({
        type:HOME_LOAD_AUCTIONS,
        auctionLoading:false,
      })
    }
  })
}

export const loadRecommeds = () => dispatch => {
  dispatch({
    type:HOME_LOAD_RECOMMENDS,
    recommendsLoading:true
  })
  get(apiUrl.recommendsUrl).then(json => {
    if(json.success){
      dispatch({
        type:HOME_LOAD_RECOMMENDS,
        recommendsLoading:false,
        recommends:json.data,
      })
    }else{
      dispatch({
        type:HOME_LOAD_RECOMMENDS,
        recommendsLoading:false,
      })
    }
  })
}

export const loadWinning = () => dispatch => {
  dispatch({
    type:HOME_LOAD_WINNING,
    winningLoading:true
  })
  get(apiUrl.winnersUrl).then(json => {
    if(json.success){
      dispatch({
        type:HOME_LOAD_WINNING,
        winningLoading:false,
        winners:json.data,
      })
    }else{
      dispatch({
        type:HOME_LOAD_WINNING,
        winningLoading:false,
      })
    }
  })
}

const ACTION_HANDLERS = {
  [HOME_LOAD_BANNER]:(state,action) => ({...state,...action}),
  [HOME_LOAD_AUCTIONS]:(state,action) => ({...state,...action}),
  [HOME_LOAD_RECOMMENDS]:(state,action) => ({...state,...action}),
}

const initialState = {
  bannerLoading:false,
  auctionLoading:false,
  recommendsLoading:false,
  winningLoading:false,
  banner:['http://odp22tnw6.bkt.clouddn.com/v2/ccas/banner.jpg','http://odp22tnw6.bkt.clouddn.com/v2/ccas/banner.jpg'],
  auction:{
    imageUrl:'http://odp22tnw6.bkt.clouddn.com/2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg',
    endTime:1541572385005,
  },
  recommends:[{
    head:'http://odp22tnw6.bkt.clouddn.com/',
    url:'2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg',
    name:'名称',
    price:100,
    endTime:1541572385005,
  },{
    head:'http://odp22tnw6.bkt.clouddn.com/',
    url:'2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg',
    name:'名称',
    price:100,
    endTime:1541572385005,
  },{
    head:'http://odp22tnw6.bkt.clouddn.com/',
    url:'2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg',
    name:'名称',
    price:100,
    endTime:1541572385005,
  },{
    head:'http://odp22tnw6.bkt.clouddn.com/',
    url:'2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg',
    name:'名称',
    price:100,
    endTime:1541572385005,
  },{
    head:'http://odp22tnw6.bkt.clouddn.com/',
    url:'2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg',
    name:'名称',
    price:100,
    endTime:1541572385005,
  },{
    head:'http://odp22tnw6.bkt.clouddn.com/',
    url:'2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg',
    name:'名称',
    price:100,
    endTime:1541572385005,
  },],
  winners:[{

  },{

  },{

  },{

  },{

  },{
    
  }]
}
export default (state = initialState,action) => {
  const handler = ACTION_HANDLERS[action.type]
  
  return handler ? handler(state, action) : state
}