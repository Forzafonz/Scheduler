import {useEffect, useReducer} from 'react';
import reducer, {SET_DAY, SET_INTERVIEW, SET_APPLICATION_DATA} from 'reducers/application'
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = (day) => {
    
    dispatch({ type : SET_DAY, value : {day : day}})
    
  }
  // "listen" to any messages from WebSocket and if received dispath a method to update state via reducer
  useEffect(() => {

    const newSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL, "JSON")

    newSocket.onmessage = function (event) {
      const data = JSON.parse(event.data)
      if(data.type === SET_INTERVIEW) {
        const {id, interview} = data;
        dispatch({ type : SET_INTERVIEW, value : {id, interview}})
      }
    }

    return () => newSocket.close();

  }, [])
  // Called on initial launch to retrieve information from the database
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')]
    )
    .then(
      (result) => {
        const [days, appointments, interviewers] = result;
        dispatch({ type: SET_APPLICATION_DATA, value : { days: days.data, appointments: appointments.data, interviewers: interviewers.data }})
      }
    )
  }, [])
  // Function called when creating/updating interview
  function bookInterview(id, interview) {
 
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
        dispatch({ type : SET_INTERVIEW, value : {id, interview}})
    })
  }
  //Function called when removing interview
  function cancelInterview(id) {
  
    return axios.delete(`api/appointments/${id}`)
    .then(() => 
        dispatch({ type : SET_INTERVIEW, value : {id, inverview : null }}))
  }

  return {state, bookInterview, cancelInterview, setDay}
}