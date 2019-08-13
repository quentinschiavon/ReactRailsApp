import React from "react";
import PropTypes from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import ImportExport from '@material-ui/icons/ImportExport';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import {getImageUrl} from './Helper';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "#ffffff",
    marginTop: "20px",
  },
  gridList: {
    width:650,
    height: '85vh',
  },
  iconNotfav: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  iconFav: {
    color: '#feda4a',
  },
  tile: {

    '&:hover':{
      height: 260,
      width:210,
    }
  },
  overlay: {
    textAlign:'center'
  },
  title: {
    color: "#ffffff",
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
  },
  filters: {
    position:'absolute',
    left: '10px',
    marginTop:'auto',
    marginBottom: 'auto',
    borderRight: '1px solid #777777',
    textAlign: 'left',
  },
  filterButton:{
    color: "#777777",
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
    fontSize: 12,
    margin: 5,
  },
  filterButtonClicked:{
    color: "rgb(75, 213, 238)",
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
    fontSize: 12,
    margin: 5,
  },
  filterIcon:{
    width: 20,
    height:20,
  },
  filterText: {
    color: "#777777",
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
    fontSize: 18,
  },
  favorites: {
    position: 'absolute',
    right:0,
    marginTop:'auto',
    marginBottom: 'auto',
  },
  radioButton: {
    color: "#777777",
  },
  checked: {
    '&$checked':{
      color: "rgb(75, 213, 238)",
    }
  },
  radio: {
    fontFamily: [ '"Pathway Gothic One"','sans-serif'].join(','),
    fontSize: 12,
  },
  spacer: {
    marginTop: "20px",
  }
});

var values = {
  url: 'api/v1/sort/',
  g: '',
  s: '',
  o: '',
  orderNameClicked: false,
  orderMassClicked: false,
  orderHeightClicked: false,
  favoritesClicked: false,

};

const handleSort = (prop1,prop2,prop3) => event => {
  (prop1==='g')? values.g = event.target.value : values[prop1] = prop2
  //console.log(values)
  sort(prop3)
  if (prop2==='name'){
    values.orderNameClicked = true
    values.orderMassClicked = false
    values.orderHeightClicked = false
    values.favoritesClicked = false
  }else if (prop2==='mass'){
    values.orderNameClicked = false
    values.orderMassClicked = true
    values.orderHeightClicked = false
    values.favoritesClicked = false
  }else if (prop2==='height'){
    values.orderNameClicked = false
    values.orderMassClicked = false
    values.orderHeightClicked = true
    values.favoritesClicked = false
  }else if (prop1==='o') {
    values.orderNameClicked = false
    values.orderMassClicked = false
    values.orderHeightClicked = false
    values.favoritesClicked = false
  }
};

const handleFavorites = (id,elem,data) => event => {
  if (localStorage.getItem(id)==='true') {
    localStorage.removeItem(id);
  }else {
    localStorage.setItem(id,'true');
  }
  elem.setState({items: data});
}

const findFavorites = elem => event => {
  var res = []
  values.orderNameClicked = false
  values.orderMassClicked = false
  values.orderHeightClicked = false
  values.g = ''
  values.favoritesClicked = !(values.favoritesClicked)
  if (values.favoritesClicked){

    elem.state.items.forEach(function (item){
      //console.log(item)
      if (localStorage.getItem(item.id)==='true'){
        res.push(item);
      }
    })
    elem.setState({items: res })
  }else {
    fetch('/api/v1/items')
			.then(response => response.json())
			.then(data => {
        //console.log(data)
				elem.setState({items: data })
		})
  }


  //console.log(res)
}
//localStorage.clear()
function sort(elem){
  var g = (values.g != '') ? ('g='+values.g):'';
  //console.log(g)
  var s = (values.s != '') ? ('s='+values.s):'';
  //console.log(s)
  var o = (values.o != '') ? ('o='+values.o):'';
  //console.log(o)
  var url = values.url + g + ':' + s  + '&' + o;
  console.log(url)
  fetch(url)
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      elem.setState({items: data })
  })
}
class AllItems extends React.Component {


  constructor(props) {
    super(props);

    this.state =  { items: []}

  };

  componentDidMount() {
    //console.log("Component mounted");
    values = {
      url: 'api/v1/sort/',
      g: '',
      s: '',
      o: '',
      orderNameClicked: false,
      orderMassClicked: false,
      orderHeightClicked: false,
    }

    fetch('/api/v1/items')
			.then(response => response.json())
			.then(data => {
        //console.log(data)
				this.setState({items: data })
		})
    //$.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
  };

  render() {

    const{ classes } = this.props

    var that = this

    var orderNameButton = (values.orderNameClicked) ? <Button className={classes.filterButtonClicked} onClick={handleSort('o','',this)}><ImportExport className={classes.filterIcon} />Name</Button> : <Button className={classes.filterButton} onClick={handleSort('o','name',this)}><ImportExport className={classes.filterIcon} />Name</Button>
    var orderHeightButton = (values.orderHeightClicked) ? <Button className={classes.filterButtonClicked} onClick={handleSort('o','',this)}><ImportExport className={classes.filterIcon} />Height</Button> : <Button className={classes.filterButton} onClick={handleSort('o','height',this)}><ImportExport className={classes.filterIcon} />Height</Button>
    var orderMassButton = (values.orderMassClicked) ? <Button className={classes.filterButtonClicked} onClick={handleSort('o','',this)}><ImportExport className={classes.filterIcon} />Mass</Button> : <Button className={classes.filterButton} onClick={handleSort('o','mass',this)}><ImportExport className={classes.filterIcon} />Mass</Button>
    var favoritesFilterButton = (values.favoritesClicked) ? <Button className={classes.filterButtonClicked} onClick={findFavorites(this)}><StarBorderIcon className={classes.filterIcon} />My Favorites</Button> : <Button className={classes.filterButton} onClick={findFavorites(this)}><StarBorderIcon className={classes.filterIcon} />My Favorites</Button>
    var filtersMenu = (values.favoritesClicked) ? "":<Grid className={classes.filters}>
      <Typography className={classes.filterText}>Filters</Typography>
      <FormHelperText className={classes.spacer}>ORDER</FormHelperText>
      <Grid item>
        {orderNameButton}
      </Grid>
      <Grid item>
        {orderMassButton}
      </Grid>
      <Grid item>
        {orderHeightButton}
      </Grid>
      <Grid item>
        <FormHelperText className={classes.spacer}>GENDER</FormHelperText>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={values.g}
          onChange={handleSort('g','',this)}
          className={classes.radioButton}
        >
          <FormControlLabel value="female" classes={{label: classes.radio}} control={<Radio classes={{checked: classes.checked}} />} label="FEMALE" />
          <FormControlLabel value="male" classes={{label: classes.radio}} control={<Radio classes={{checked: classes.checked}} />} label="MALE" />
          <FormControlLabel value="" classes={{label: classes.radio}} control={<Radio classes={{checked: classes.checked}} />} label="ALL" />

        </RadioGroup>
      </Grid>
    </Grid>
    var items= this.state.items.map((item) => {
        //console.log(item.id)
        var url = '/item/'+item.id
        var img = getImageUrl(item.id);

        var favIcon = (localStorage.getItem(item.id)==='true') ? <Tooltip title="remove from favorites"><IconButton aria-label={'info about ${item.name}'} className={classes.iconFav} onClick={handleFavorites(item.id,this,this.state.items)}><StarBorderIcon/></IconButton></Tooltip> : <Tooltip title="add to favorites"><IconButton aria-label={'info about ${item.name}'} className={classes.iconNotfav} onClick={handleFavorites(item.id,this,this.state.items)}><StarBorderIcon/></IconButton></Tooltip>

        return (
            <GridListTile key={item.id} classes = {{tile: classes.tile}}>
              <a href={url}>
                <img src={img} alt={item.name} width={'100%'} />

              </a>
              <GridListTileBar
                classes = {{title: classes.title}}
                title={item.name}
                actionIcon={favIcon}
              />
            </GridListTile>
        )
    });
    return(
        <div className={classes.root} >
          <GridList className={classes.gridList} cellHeight={250} spacing={30} cols={3}>
             {items}
          </GridList>
          {filtersMenu}
          <div className={classes.favorites}>
            {favoritesFilterButton}
          </div>
        </div>
    )
  }
}
export default withStyles(styles)(AllItems)
