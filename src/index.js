/* @flow */
/* eslint-env browser */

import * as React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

const root = document.getElementById('root')
if (!root) throw new Error('unable to find root element')
ReactDOM.render(<Root />, root)
