// @flow

import * as React from 'react'
import type {Location} from 'react-router-dom'
import {createSelector} from 'reselect'
import qs from 'qs'

import createStyled from "material-ui-render-props-styles"
import type { Classes } from "material-ui-render-props-styles"

const selectLabels = createSelector(
  (props: Props) => props.location.search,
  (search: string): React.Node => {
    const {labels} = qs.parse(search.substring(1))
    const result = []
    const labelRx = /"((.|\r\n|\r|\n)+?)"/g
    let match
    while ((match = labelRx.exec(labels)) !== null) {
      if (!match[1].trim()) continue
      result.push(
        <div>
          {match[1].split(/\r\n|\r|\n/g).map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      )
    }
    return result
  },
)

export type Props = {
  +location: Location,
}

const styles = {
  tableContainer: {
    padding: '0.5in 0.125in',
  },
  table: {
    borderCollapse: 'collapse',
    width: '8.5in',
    '& > tbody > tr': {
      '& > td': {
        width: '2.5in',
        height: '0.75in',
        padding: '0.125in',
      }
    },
  },
}

const PreviewStyles = createStyled(styles, {name: 'Preview'})

const Preview = (props: Props): React.Node => (
  <PreviewStyles>
    {({classes}: {classes: Classes<typeof styles>}) => {
      const labels = selectLabels(props)
      const tables = []
      let rows = []
      let i = 0
      while (i < labels.length) {
        rows.push(
          <tr key={rows.length}>
            <td>{labels[i++]}</td>
            <td>{labels[i++]}</td>
            <td>{labels[i++]}</td>
          </tr>
        )
        if (rows.length === 10 || i >= labels.length) {
          tables.push(
            <div key={tables.length} className={classes.tableContainer}>
              <table className={classes.table}>
                <tbody>
                  {rows}
                </tbody>
              </table>
            </div>
          )
          rows = []
        }
      }
      return (
        <React.Fragment>
          {tables}
        </React.Fragment>
      )
    }}
  </PreviewStyles>
)

export default Preview
