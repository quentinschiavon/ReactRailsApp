import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { allSpecies } from './Helper';

import $ from 'jquery';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    name: '',
    height:'',
    mass:'',
    eye_color:'',
    gender: '',
    planet: '',
    species: '',
    completed: false,
  });

  const species = allSpecies()

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    var id = props.id;
    var name = values.name;
    var height = values.height;
    var mass = values.mass;
    var gender = values.gender;
    var planet = values.planet
    var species = values.species
    var item = {id: id , name: name, height: height, mass: mass, gender: gender, planet: planet, species: species};
    //console.log(item);
    handleUpdate(item);


  }

  function handleUpdate(item) {

      $.ajax({
            url: `/api/v1/items/${item.id}`,
            type: 'PUT',
            data: { item: item },
            success: (data) => {
                //console.log('success ! :',data);
                props.component.setState({item:data});
                setOpen(false);

            }
        })
}

  var compteur = 0
  const handleChange = prop => event => {
    //setValues({ ...values, [prop]: event.target.value });
    values[prop] = event.target.value

    //console.log(values.name)
    //values['completed'] = ((values.name!="")&&(values.height!="")&&(values.mass!="")&&(values.eye_color!=""))
    setValues({ ...values, ['completed']: ((values.name!="")&&(values.height!="")&&(values.mass!="")&&(values.eye_color!="")&&(values.gender!="")&&(values.planet!="")&&(values.species!="")) })
    console.log(values.completed)
  };

  const handleRadioButton = event => {
    //setValues({ ...values, ['gender']:event.target.value});
    values.gender= event.target.value
    setValues({ ...values, ['completed']: ((values.name!="")&&(values.height!="")&&(values.mass!="")&&(values.eye_color!="")&&(event.target.value!="")&&(values.planet!="")&&(values.species!="")) });
  }

  const handleSelection = event => {
    //setValues({ ...values, ['gender']:event.target.value});
    values.species= event.target.value
    setValues({ ...values, ['completed']: ((values.name!="")&&(values.height!="")&&(values.mass!="")&&(values.eye_color!="")&&(event.target.value!="")&&(values.planet!="")&&(values.species!="")) });
  }

  var submit = values.completed ? <Button onClick={handleSubmit} color="primary">Submit</Button> : <Button disabled color="primary">Submit</Button>;
  return (

    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <div>
            <FormHelperText id="name">Name</FormHelperText>
            <Input
              placeholder={props.name}
              inputProps={{
                'aria-label': 'description',
              }}
              aria-describedby="name"
              onChange={handleChange('name')}
              type = "text"
            />

            <FormHelperText id="mass">Mass</FormHelperText>
            <Input
              placeholder={props.mass}
              inputProps={{
                'aria-label': 'description',
              }}
              aria-describedby="mass"
              onChange={handleChange('mass')}
              type = "number"
              error = {values.error}
            />

            <FormHelperText id="height">Height</FormHelperText>
            <Input
              placeholder={props.height}
              inputProps={{
                'aria-label': 'description',
              }}
              aria-describedby="height"
              onChange={handleChange('height')}
              type = "number"
            />

            <FormHelperText id="eye_color">Eye Color</FormHelperText>
            <Input
              placeholder={props.eye_color}
              variant="outlined"
              inputProps={{
                'aria-label': 'description',
              }}
              aria-describedby="eye_color"
              onChange={handleChange('eye_color')}
              type = "text"
            />
            <FormHelperText id="gender">Gender</FormHelperText>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={values.gender}
                onChange={handleRadioButton}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="n/a" control={<Radio />} label="None" />
              </RadioGroup>
            </FormControl>
            <FormHelperText id="origin">Origin</FormHelperText>
            <Input
              placeholder={props.origin}
              inputProps={{
                'aria-label': 'description',
              }}
              aria-describedby="origin"
              onChange={handleChange('planet')}
              type = "text"
            />
            <FormHelperText id="origin">Species</FormHelperText>
            <FormControl >
            <Select value={values.species} onChange={handleSelection}>
              {species.map(specie => (
                <MenuItem key={specie} value={specie}>
                  {specie}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {submit}
        </DialogActions>
      </Dialog>
    </div>
  );
}
