// @flow

import * as React from 'react'
import {JssProvider} from 'react-jss'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Main from './Main'
import Preview from './Preview'

export type Props = {
}

const Root = (props: Props): React.Node => (
  <JssProvider>
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/preview" component={Preview} />
      </Switch>
    </HashRouter>
  </JssProvider>
)

export default Root
