import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Link from '@material-ui/core/Link'

import { login } from '../../services/authService'
import { setUser } from '../../redux/auth'

// Define a style for the page
const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%'
  },
  submit: {
    margin: theme.spacing(1, 1, 2),
    width: 100
  },
  typo: {
    color: '#ffffff',
    marginBottom: theme.spacing(3),
    textAlign: 'center'
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: '100%',
    background: '#ffffff',
    border: '1px solid #999999'
  },
  login: {
    margin: theme.spacing(1)
  },
  helperText: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: '#eeeeee',
  },
  reglink: {
    color: '#ffffff',
    marginLeft: theme.spacing(1)
  },
  
}))


const Login = () => {

  // Use Hooks and set the initial state
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // This function will be called after clicking the login button
  const handleLogin = async (event) => {
    event.preventDefault() // Prevents sending the form
    try {
      const res = await login({username: username, password: password})
      dispatch( setUser(res) )
      setUsername('')
      setPassword('')
      history.push('/home')
    } 
    catch (error) {
      console.log(error)
    }
  }

  // Push a new location to the address bar for registering
  // Component will be rendered after routing the new location
  const moveToRegister = (event) => {
    event.preventDefault()
    history.push('/account/register')
  }

  return (
    <div className={classes.root}>

      {/* Display the message */}
      <div className={classes.content}>
        <Typography className={classes.typo} component="h1" variant="h3">
          Login
        </Typography>

        {/* Form contains SENSORTAG_ID field, PASSWORD field, and BUTTON */}
        <form className={classes.form} onSubmit={handleLogin} noValidate>

          {/* SENSORTAG_ID field */}
          <Typography className={classes.helperText} variant="button">Username</Typography>
          <FormControl
            variant="outlined"
            className={clsx(classes.margin, classes.textField)}
          >
            <Input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </FormControl>

          {/* PASSWORD field */}
          <Typography className={classes.helperText} variant="button">Password</Typography>

          <FormControl
            variant="outlined"
            className={clsx(classes.margin, classes.textField)}
          >
            <Input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
             
            />
          </FormControl>

          {/* BUTTON */}
          <Button type="submit" variant="contained" className={classes.submit}>
            Login
          </Button>
        </form>

        {/* LINK for navigating to the register page*/}
        <div className={classes.register}>
          <Typography variant="caption">
            <Link href="register" onClick={moveToRegister} className={classes.reglink}>
              Register
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Login