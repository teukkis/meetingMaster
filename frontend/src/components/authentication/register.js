import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import clsx from 'clsx'
import Link from '@material-ui/core/Link'

import { register } from '../../services/authService'

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
  }
}))

const Register = () => {
  const classes = useStyles()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // This function will be called after clicking the register button
  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const res = await register({username: username, password: password})
      setUsername('')
      setPassword('')
      console.log(res)
      history.push('/account/login')
    } 
    catch (error) {
      console.log(error)
    }
  }

  // Push a new location to the address bar
  // Component will be rendered after routing the new location
  const moveToLogin = (event) => {
    event.preventDefault()
    history.push('/account/login')
  }


  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.typo} component="h1" variant="h3">
          Register
        </Typography>

        <form className={classes.form} onSubmit={handleRegister} noValidate>

        <Typography className={classes.helperText} variant="button">
          Username*
        </Typography>
          <FormControl
            variant="outlined"
            className={clsx(classes.margin, classes.textField)}
          >
            <Input
              value={username}
              required
              onChange={({ target }) => setUsername(target.value)}
            />
          </FormControl>

          <Typography className={classes.helperText} variant="button">Password*</Typography>
          <FormControl
            variant="outlined"
            className={clsx(classes.margin, classes.textField)}
          >
            <Input
              id="password"
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </FormControl>

          <div></div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
        <div className={classes.login}>
          <Typography variant="caption">
            <Link href="login" onClick={moveToLogin} className={classes.reglink}>
              Login
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Register