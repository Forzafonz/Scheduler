import {useState, useEffect} from 'react';
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState(prevState => ({...prevState, day : day}));
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')]
    )
    .then(
      (result) => {
        const [days, appointments, interviewers] = result;
        setState(prevState => ({...prevState, days: days.data, appointments: appointments.data, interviewers: interviewers.data }))
      }
    )
  }, [])

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prevState => ({...prevState, appointments: appointments}));
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {
      return res;
    })
  }
  
  function cancelInterview(id) {

    const updatedAppointment = {...state.appointments[id], interview: null}
    const newAppointmentsList = {...state.appointments, [id]: updatedAppointment}
    return axios.delete(`api/appointments/${id}`)
    .then(() => 
      setState({...state,  appointments : newAppointmentsList}))
  }
 
  return {state, bookInterview, cancelInterview, setState, setDay}
}