import React, { useEffect }  from 'react'
import { Route, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton';
import ForwardArrowIcon from '@material-ui/icons/NavigateNext';
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Event from './event'
import { getAllEvents, getEvent } from '../../services/eventService'
import { initEvents } from '../../redux/events'
import { setEvent } from '../../redux/event'
import Votes from './votes'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflowY: 'auto',
    maxHeight: 530,
  },
}));


const Events = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const events = useSelector( (state) => state.eventsReducer.events)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialEvents = await getAllEvents()
        dispatch( initEvents(initialEvents) )

      } catch (error) {
        console.log(error.message)
      }
      
    }
    fetchData()
  }, [dispatch])

  // display all information of the event corresponding to the clicked event
  const openEvent = async (event, id) => {
    event.preventDefault()
    const res = await getEvent(id)
    dispatch( setEvent(res) )
    history.push(`/home/events/${id}`)
  }

  const renderRows = () => {
      return events.map(e => {
        return (
          <ListItem
            key={e.id}
                
          >
            <ListItemText primary={e.name} />

            <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  aria-label="comments"
                  onClick={(event) => openEvent(event, e.id)}
                  >
                  <ForwardArrowIcon />
                </IconButton>
              </ListItemSecondaryAction>

          </ListItem>
      )
    })
  }

  return (
    <div className={classes.root}>
      <Route exact path="/home/events/:id">
        <Event />
        <Votes />
      </Route>
      <Route exact path="/home/events">
        <List className={classes.list} component="nav">
          {events ? renderRows() : <div>No events</div>}
        </List>
      </Route>
    </div>
  )
}

export default Events
