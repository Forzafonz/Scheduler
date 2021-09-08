import {useEffect, useReducer} from 'react';
import { updateSpots } from 'helpers/selectors';
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = function (state, action) {

  const setDay = (state, action) =>{
    return {...state, day: action.value.day}
  }

  const setApplicationData = (state,action) => {
    const {days, appointments, interviewers} = action.value
    return {...state, days, appointments, interviewers }
  }

  const setInterview = (state, action) => {
    const {interview, id} = action.value
    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state.days, appointments, id)
    return {...state, appointments, days}
  }

  const actions = {

    [SET_DAY]: setDay,
    [SET_APPLICATION_DATA]: setApplicationData,
    [SET_INTERVIEW]: setInterview,
    "default": () => {
      throw new Error() `Tried to reduce with unsupported action type: ${action.type}`}
  }

  return actions[action.type](state, action) || actions("default")

}

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

  function bookInterview(id, interview) {
 
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
        dispatch({ type : SET_INTERVIEW, value : {id, interview}})
    })
  }

  function cancelInterview(id) {
  
    return axios.delete(`api/appointments/${id}`)
    .then(() => 
        dispatch({ type : SET_INTERVIEW, value : {id, inverview : null }}))
  }

  return {state, bookInterview, cancelInterview, setDay}
}