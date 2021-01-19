import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { getAllResults } from '../../services/eventService'
import { initResults } from '../../redux/results'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3)
  },

}));

const Votes = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const results = useSelector( (state) => state.resultsReducer.results)
  const meetingEvent = useSelector( (state) => state.eventReducer.event)

  // Fetch results for the current event
  // Add them to Redux store 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllResults(meetingEvent.id)
        dispatch( initResults( res.suitableDates ) )

      } catch (error) {
        console.log(error.message)
      }
      
    }
    fetchData()
  }, [meetingEvent, dispatch])


  // Loop through the results and
  // return them as JSX
  const renderResults = () => {
    return results.map(event => {
      return (
        <div>
          <Typography variant="button">{event.date}:</Typography> 
          {event.people.map(u => {
            return (
              <Typography variant="caption"> {u}</Typography>
            )
          } )}
        </div>
      ) 
    })
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">Dates that works for all:</Typography>
      {results ? renderResults() : <div></div>}
        
    </div>
  );
}

export default Votes
