import React from 'react'
import PropTypes from 'prop-types'
const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (
  <svg
    className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
    {...restProps}
  >
    <use xlinkHref={type} /> {/* svg-sprite-loader@0.3.x */}
    {/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@latest */}
  </svg>
)

CustomIcon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg']),
}

export default CustomIcon