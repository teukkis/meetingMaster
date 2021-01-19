import axios from 'axios'

const PORT = process.env.REACT_APP_PORT
const BASE_URL = process.env.REACT_APP_BASE_URL
const API_VERSION = process.env.REACT_APP_API_VERSION
const URL = `${BASE_URL}:${PORT}/${API_VERSION}/event`

// Fetch all events
export const getAllEvents = async () => {
  try {
    const token = getToken()
    const response = await axios.get(
    `${URL}/list`, 
    {
      headers: { Authorization: token.token }
    }
  )
  return response.data

  } catch (error) {
    console.log(error)
  }
}

// Fetch only one event, based on the id
export const getEvent = async (id) => {
  try {
    const token = getToken()
    const response = await axios.get(
    `${URL}/${id}`, 
    {
      headers: { Authorization: token.token }
    }
  )
  return response.data

  } catch (error) {
    console.log(error)
  }
  
}


export const getAllResults = async (id) => {
  try {
    const token = getToken()
    const response = await axios.get(
    `${URL}/${id}/results`, 
    {
      headers: { Authorization: token.token }
    }
  )
  return response.data

  } catch (error) {
    console.log(error)
  }
  
}


export const postNewVote = async ( vote, id ) => {
  try {
    const token = getToken()

    const conf = {
      headers: {
        Authorization: token.token
      }
    }
  
    const response = await axios.post( `${URL}/${id}/vote`, vote, conf )
    return response.data

  } catch (error) {
  console.log(error) 
  }
  
}


export const createNewEvent = async ( newEvent ) => {
  try {
    const token = getToken()

    const conf = {
      headers: {
        Authorization: token.token
      }
    }
  
    const response = await axios.post( `${URL}`, newEvent, conf )
    return response.data

  } catch (error) {
    console.log(error)
  }
  
}


const getToken = () => {
  const currentUserJSON = window.localStorage.getItem('currentUser')
  if (currentUserJSON) {
    return JSON.parse(currentUserJSON)
  }
  else {
    return null
  }
}