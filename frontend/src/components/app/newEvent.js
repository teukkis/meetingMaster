import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add'
import Chip from '@material-ui/core/Chip';

import { createNewEvent } from '../../services/eventService'


const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4)
  },
  nameField: {
    width: 250,
    paddingBottom: theme.spacing(3),

  },
  header: {
    marginBottom: theme.spacing(3),

  },
  dateSelect: {
    width: 250,

  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2)

  },
  addedDates: {
    marginTop: theme.spacing(2)
  },
  chip: {
    display: 'block',
    textAlign: 'center',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  }
}));

const NewEvent = () => {
  const classes = useStyles();
  const history = useHistory()
  const [dates, setDates] = useState([])
  const [currentDate, setCurrentDate] = useState('')
  const [eventName, setEventName] = useState('')

  // Fired after add button is clicked
  // Store all the dates as an array
  const addDate = (event) => {
    event.preventDefault()
    setDates(dates.concat(currentDate))
  }

  // Post a new event object to the backend
  // and push a new location if all went well
  const createEvent = async (event) => {
    event.preventDefault()

    try {
      const newEvent = {
        name: eventName,
        dates: dates
      }
  
      await createNewEvent(newEvent)
      setTimeout( () => {
        history.push('/home/events')
      }, 1000)
      
    } catch (error) {
      console.log(error)
    }
    
  }

  // Return dates as "chip elements" 
  const renderDates = () => {
    return dates.map((d,i) => <Chip className={classes.chip} key={i} label={d} color="primary" variant="outlined" />)
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h5">
          Create a meeting
        </Typography>
      </div>
      <div className={classes.nameField}>
        <TextField 
        fullWidth 
        id="standard-basic" 
        label="Name for the event" 
        value={eventName}
        onChange={({ target }) => setEventName(target.value)}
        />
      </div>
      <div className={classes.dateSelect}>
      <form noValidate>
        <TextField
          id="datetime-local"
          label="Time for the meeting"
          type="datetime-local"
          value={currentDate}
          onChange={({ target }) => setCurrentDate(target.value)}
          className={classes.dateSelect}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={addDate}
          className={classes.button}
          startIcon={<AddIcon />}
        >
        Add date
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={createEvent}
          className={classes.button}
          startIcon={<SaveIcon />}
        >
        Save
        </Button>
      </form>
      </div>
      <div className={classes.addedDates}>
        {renderDates()}
      </div>

    </div>
  )
}

export default NewEvent
