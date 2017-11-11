import React, { Component } from 'react'
import TypesPage from '../../components/TypesPage'
import ChildNavBar from '../../components/ChildNavBar'
import { get } from '../../Util'
import apiUrl from '../../apiUrl'
export default class MyAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      types: [],
    }
  }

  loadCommodities = (type, currentPage) => {
    return get(apiUrl.commoditiesUrl, {
      currentPage,
      type,
    }).then(json => {
      if (json.success) {
        const types = this.state.types

        const action = {
          condition: {
            type,
          },
          data: json.data.records,
        }
        const page = {
          ...json.data,
        }
        delete page.records
        action.page = page

        const result = types.find(item => item.id === type.id)
        if (!result) {
          return
        }
        if (!result.page || action.page.current > result.page.current) {
          if (!result.commodities) {
            result.commodities = []
          }
          result.commodities = result.commodities.concat(action.data)
          result.page = action.page
          result.initialed = true
          result.hasMore = (action.page.current < action.page.pages - 1)
          this.setState({
            types: [...types]
          })
          return
        }
      }
    })
  }
  render() {

    return (
      <div>
        <ChildNavBar title="我的拍卖" />
        <div className="custom-container">
          <TypesPage types={this.state.types} loadCommodities={this.loadCommodities} />
        </div>
      </div>
    )
  }
}
