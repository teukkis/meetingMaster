import React from 'react'
import { Route } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

import Login from './login'
import Register from './register'
import bgImage from '../../images/baseBackground.jpg'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  container: {
    paddingTop: theme.spacing(12),
    width: '25vw'
  },
  paper: {
    width: 300,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    background: 'linear-gradient(40deg, #15008c99 30%, #0064d499 70%)',
    minHeight: 330
  }
}))

const Base = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="sm">
        <Route exact path="/account/login">
          <Paper className={classes.paper} elevation={12}>
            <Login />
          </Paper>
        </Route>
        <Route path="/account/register">
          <Paper className={classes.paper} elevation={12}>
            <Register />
          </Paper>
        </Route>
      </Container>
    </div>
  )
}

export default Base