import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadMessages } from '../../reducers/message'
import CommoditiesList from '../../components/CommoditiesList'
import ChildNavBar from '../../components/ChildNavBar'
export class Messages extends Component {
  static propTypes = {
    ms: PropTypes.object.isRequired,
    loadMessages: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  componentDidMount(){
    this.props.loadMessages()
  }
  render() {
    const { messages, hasMore, loading, page } = this.props.ms
    const setting = {
      dataSource: messages || [],
      hasMore: hasMore == null ? false : hasMore,
      loadDataSource: this.props.loadMessages.bind(this),
      loading: loading,
      page: page || {},
      history: this.props.history,
      type:'message',
    }
    return (
      <div>
        <ChildNavBar title="消息中心" />
        <div className="custom-container">
          <CommoditiesList {...setting} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ms: state.ms,
})

const mapDispatchToProps = {
  loadMessages,
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
