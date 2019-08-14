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
    height:'10vh'
  },
  text: {
    color: "#feda4a",
    fontFamily: [ '"Star Jedi"','arial'].join(','),
    fontSize: 50,

  },
  button: {
    textDecoration: "none",
    marginLeft  : 'auto',
    marginRight : 'auto'
  }
})

class Header extends React.Component {
  render () {
    const{ classes } = this.props
    return (
      <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <a href="/" className={classes.button}><Typography className={classes.text}>
            Star Wars
          </Typography></a>
       </Toolbar>
      </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header)
