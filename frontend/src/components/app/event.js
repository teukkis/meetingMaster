import React, {useState} from 'react';
import { useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { postNewVote } from '../../services/eventService'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  eventName: {
    margin: theme.spacing(3)
  },
  dates: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(3),
  }
}));

const Event = () => {
  const classes = useStyles();
  const history = useHistory()

  const meetingEvent = useSelector( (state) => state.eventReducer.event)
  const user = useSelector( (state) => state.authReducer.user)
  const [checkboxState, setCheckboxState] = useState({})

  const handleChange = (event) => {
    setCheckboxState({ ...checkboxState, [event.target.name]: event.target.checked });
  };

  const renderDates = () => {
    meetingEvent.dates.map(d => {
      return { date: d, checked: false }
    })
    return meetingEvent.dates.map(d => {
      return (
        <FormControlLabel 
        control={<Checkbox color="primary" checked={checkboxState.checked} onChange={handleChange} name={d} />}
        label={d}
        key={d}
        />
      )
    })
  }

  const vote = async () => {
    const newVote = {
      name: user,
      votes: Object.keys(checkboxState)
    }

    await postNewVote(newVote, meetingEvent.id)
    setTimeout( () => {
      history.push('/home/events')
    }, 1000)
  }

  return (
    <div className={classes.root}>

      <div className={classes.eventName}>
        <Typography variant="h5">
          {meetingEvent ? meetingEvent.name : <div></div>}
        </Typography>
      </div>

      <div className={classes.dates}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            {meetingEvent ? renderDates() : <div></div>}
          </FormGroup>
        </FormControl>
      </div> 

      <div className={classes.button}>
        <Button variant="outlined" color="primary" onClick={vote}>
          Confirm
        </Button>
      </div>   

        
    </div>
  );
}

export default Event
