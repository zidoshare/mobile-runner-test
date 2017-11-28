import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { get } from '../../Util'
import apiUrl from '../../apiUrl'
import ChildNavBar from '../../components/ChildNavBar'
import { ActivityIndicator } from 'antd-mobile'
export default class MessageInfo extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = ({
      message: {},
      loading: false,
    })
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.setState({
      loading: true,
    })
    get(apiUrl.messageOneUrl, {
      messageId: id,
    }).then(message => {
      this.setState({
        message,
        loading: false,
      })
    })
  }

  render() {
    const { message, loading } = this.state
    return (
      loading ? <ActivityIndicator toast text="正在加载" /> : <div>
        <ChildNavBar title={message.title} />
        <div className="custom-container" style={{
          textIndent: '2em',
        }}>
          <p>{message.content}</p>
        </div>
      </div>
    )
  }
}
