// @flow
/* eslint-env browser */

import * as React from 'react'
import classNames from 'classnames'
import type {RouterHistory, Location} from 'react-router-dom'
import Options from './Options'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import Close from '@material-ui/icons/Close'
import Print from '@material-ui/icons/Print'
import createStyled from 'material-ui-render-props-styles'
import qs from 'qs'

const drawerWidth = 256

const styles = {
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'left ease 200ms',
  },
  rootMenuOpen: {
    left: drawerWidth,
  },
  toolbar: {
    padding: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    flex: '1 1 auto',
  },
  preview: {
    border: 'none',
    transition: 'margin ease-out 0.2s',
  },
}

const MainStyles = createStyled(styles, {name: 'Main'})

export type Props = {
  history: RouterHistory,
  location: Location,
}

function convertQuery(query: Object): string {
  let result = []
  for (let key in query) {
    result.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
  }
  return result.join('&')
}

function print() {
  window.frames['preview'].focus()
  window.frames['preview'].print()
}

export default class Main extends React.Component<Props> {
  closeMenu = () => this.setQuery({showMenu: false})

  setQuery = (replacements: {[key: string]: any}) => {
    const {history, location: {pathname, search}} = this.props
    const query = qs.parse(search.substring(1))
    history.replace({
      pathname,
      search: `?${qs.stringify({...query, ...replacements})}`
    })
  }

  render(): React.Node {
    const {location: {search}} = this.props
    const query = qs.parse(search.substring(1))
    const menuOpen = query.menuOpen === 'true'

    const previewUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}#/preview/?${convertQuery(query)}`

    return (
      <MainStyles>
        {({classes}) => (
          <div className={classNames(classes.root, {[classes.rootMenuOpen]: menuOpen})}>
            <AppBar position="static">
              <Toolbar className={classes.toolbar}>
                <IconButton color="inherit" onClick={() => this.setQuery({menuOpen: !menuOpen})}>
                  <Menu />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.title}>
                  Scoops Mailing Labels
                </Typography>
                <IconButton color="inherit" onClick={print}>
                  <Print />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="persistent"
              anchor="left"
              open={menuOpen}
              classes={{paper: classes.drawerPaper}}
            >
              <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                  <IconButton color="inherit" onClick={() => this.setQuery({menuOpen: false})}>
                    <Close />
                  </IconButton>
                  <Typography variant="title" color="inherit" className={classes.title}>
                    Options
                  </Typography>
                  <IconButton color="inherit" onClick={print}>
                    <Print />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Options
                {...query}
                onChange={(prop: string, newValue: any) => this.setQuery({[prop]: newValue})}
              />
            </Drawer>
            <iframe
              id="preview"
              name="preview"
              className={classes.preview}
              src={previewUrl}
              width="100%"
              height="100%"
            />
          </div>
        )}
      </MainStyles>
    )
  }
}
