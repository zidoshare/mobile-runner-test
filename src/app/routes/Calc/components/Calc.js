import React from 'react'
import PropTypes from 'prop-types'
export const Calc = (props) => {
  const {result,add} = props
  console.log(props)
  return (
    <div>
      <button onClick={function(){
        add(10)
      }}>加数字</button>
      <div>
        {result}
      </div>
    </div>
  )
}

Calc.propTypes = {
  add:PropTypes.func.isRequired,
  result:PropTypes.number.isRequired,
}

export default Calc