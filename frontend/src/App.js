import React, { useEffect } from 'react'
import { useSelector} from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'

import Base from './components/authentication/base'
import Container from './components/app/container'


const App = () => {
  const history = useHistory()
  const user = useSelector( (state) => state.authReducer )

  // Force a new location if JWT is undefined
  useEffect( () => {
    if (user.token === undefined) {
      history.push('/account/login')
    }
  }, [user, history])

  return (
    <div>
      <Switch>
        
          <Route path="/account" render={() => <Base />} />
          <Route path="/home" render={() => <Container />} />
          <Route path="/" render={() => history.push('/account/login')} />
      </Switch>
    </div>
  )
}

export default App;
