// @flow

import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import createStyled from "material-ui-render-props-styles"
import type { Classes } from "material-ui-render-props-styles"

const styles = {
  root: {
    padding: 8,
  },
  labels: {
    width: '100%',
  },
}

type Props = {
  +labels?: ?string,
  +onChange?: ?(field: string, newValue: ?string) => any,
}

const OptionsStyles = createStyled(styles, {name: 'Options'})

const Options = (props: Props): React.Node => (
  <OptionsStyles>
    {({classes}: {classes: Classes<typeof styles>}) => {
      const onChange = props.onChange || ((field: string, newValue: ?string) => {})
      return (
        <div className={classes.root}>
          <TextField
            className={classes.labels}
            label="labels"
            multiline
            rows={10}
            value={props.labels}
            onChange={e => onChange('labels', e.target.value)}
          />
        </div>
      )
    }}
  </OptionsStyles>
)

export default Options
