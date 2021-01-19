import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/LockOutlined';

import Events from './allEvents'
import NewEvent from './newEvent'
import { removeUser } from '../../redux/auth'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    marginLeft: "28%",
    marginTop: theme.spacing(10),
    minWidth: 600,
    width: "40%"
  },
  logout: {
    textAlign: 'bottom'
  }
}));

const Container = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory()

  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderContent = (value) => {
    switch (value) {
      case 'events':
        return history.push('/home/events')
      case 'newEvent':
        return history.push('/home/new')
      default:
        return 
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch( removeUser() )
    history.push('/account/login')
  }

  useEffect( () => {
    history.push('/home/events')
  }, [history])

  return (
    <div>
      <Paper className={classes.paper}>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab onClick={() => renderContent('events')} label="All events" />
          <Tab onClick={() => renderContent('newEvent')} label="Create event"/>
        </Tabs>
        
        <Route path="/home/events" component={Events} />
        <Route path="/home/new" component={NewEvent} />
        
      </div>
      <div className={classes.logout}>
        <IconButton onClick={handleLogout} color="inherit">
          <LockIcon />
        </IconButton>
      </div>
        
      </Paper>
    </div>
  );
}

export default Container
