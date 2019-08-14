import React from "react"
import PropTypes from "prop-types"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: "#000000",
    height:'5vh'
  },
  text: {
    color: "rgb(75, 213, 238)",
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
    fontSize: 12,
    marginLeft  : 'auto',
    marginRight : 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  }
})

class Footer extends React.Component {
  render () {
    const{ classes } = this.props
    return (
      <div className={classes.root}>
          <Typography className={classes.text}>
            Developed a long time ago, in a galaxy far, far away.... by Quentin Schiavon, data from SWAPI, assets from starwars-visualguide.com
          </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Footer)
