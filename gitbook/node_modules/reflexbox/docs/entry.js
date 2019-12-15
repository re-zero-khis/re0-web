
import React from 'react'
import ReactDOM from 'react-dom'
import data from './data'
import Root from './components/Root'

ReactDOM.render(<Root {...data} />, document.getElementById('app'))

