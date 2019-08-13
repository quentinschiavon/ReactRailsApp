import React from "react"
import PropTypes from "prop-types"

import FormDialog from './Form'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import {getImageUrl} from './Helper';

const styles = theme => ({
  root: {
    height: '85vh',
  },
  card: {
    display: 'flex',
    height:550,
    width: 900,
    marginRight: "auto",
    marginLeft: "auto"
  },
  spacer: {
    height:60,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  content: {
    textAlign: 'left',
  },
  cover: {
    width: 400,
    height: 550

  },
  textMain: {
    color: "#000000",
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
    fontWeight: 'bold',
    fontSize: 50,
  },
  textSecondary: {
    color: "#777777",
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
    fontSize: 20,
    marginTop:"25px"
  },
  backButton: {
    position: "absolute",
    left: 0,
    color: "#777777",
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
    fontSize: 15,
    '&:hover':{
      color: "#feda4a",
      transition: '.3s ease'
    }
  },
  backIcon: {
    width: 50,
    height:50
  },
  icon: {
    width: 100,
    height:100
  },
  button: {
    color: "#777777",
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
    fontSize: 20,
    margin: 20,
    '&:hover':{
      color: "#feda4a",
      transition: '.3s ease'
    }
  },
  groupButton: {
    marginLeft  : 'auto',
    marginRight : 'auto'
  },
  favIcon: {
    width: 50,
    height:50,
  },
})

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state =  { item: [] ,id: props.match.params.id}
  };

  componentDidMount() {
    //console.log("Component mounted");
    fetch('/api/v1/item/'+this.state.id)
			.then(response => response.json())
			.then(data => {
        //console.log(data)
				this.setState({item: data })
		})
    //$.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
  };

  render() {

    //var item = this.state.item
    const{ classes } = this.props
    var id = Number(this.state.id)
    var img = getImageUrl(id)
    var next = (id+1)%87
    var page_next = '/item/'+next
    if (id==1){
      var prev = 87
    }
    else{
      var prev = id-1
    }
    var page_prev = '/item/'+prev

    if(this.state.item.gender=='n/a'){
      var gender = 'none'
    }
    else{
      var gender = this.state.item.gender
    }
    //form = FormDialog()
    var favIcon = (localStorage.getItem(this.state.id)==='true') ? <StarBorderIcon className={classes.favIcon}/> : ''
    return(
        <div className={classes.root}>
          <Button className={classes.backButton} href='/'>
            <KeyboardBackspace className={classes.backIcon} />
            Return
          </Button>
          <div className={classes.spacer}></div>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image={img}
              title="item image"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography className={classes.textMain}>
                  {this.state.item.name}
                  {favIcon}
                </Typography>
                <Typography className={classes.textSecondary}>
                  height(cm): {this.state.item.height}
                </Typography>
                <Typography className={classes.textSecondary}>
                  mass(kg): {this.state.item.mass}
                </Typography>
                <Typography className={classes.textSecondary}>
                  eye color: {this.state.item.eye_color}
                </Typography>
                <Typography className={classes.textSecondary}>
                  gender: {gender}
                </Typography>
                <Typography className={classes.textSecondary}>
                  origin: {this.state.item.planet}
                </Typography>
                <Typography className={classes.textSecondary}>
                  species: {this.state.item.species}
                </Typography>
              </CardContent>
              <CardActions>
                <FormDialog
                id={this.state.item.id}
                name={this.state.item.name}
                mass={this.state.item.mass}
                height={this.state.item.height}
                eye_color={this.state.item.eye_color}
                origin={this.state.item.planet}
                species={this.state.item.species}
                component={this}
                />
              </CardActions>
            </div>
          </Card>
          <div className={classes.groupButton}>
            <Button className={classes.button} href={page_prev}>
              <KeyboardArrowLeft className={classes.icon} />
              Prev
            </Button>
            <Button className={classes.button} href={page_next}>
              Next
              <KeyboardArrowRight className={classes.icon} />
            </Button>
          </div>
        </div>
    )
  }
}
export default withStyles(styles)(Item)
