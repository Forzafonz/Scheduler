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
 
    const setUpdateSlots = state.appointments[id].interview;
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {
      if (!setUpdateSlots) {
        const days = updateSpots(id, true)
        setState(prevState => ({...prevState, appointments: appointments, days}))
      } else {
        setState(prevState => ({...prevState,  appointments: appointments}))
      }
    })
  }

  function cancelInterview(id) {
  
    const updatedAppointment = {

      ...state.appointments[id], 
         interview: null}

    const newAppointmentsList = {

      ...state.appointments, 
      [id]: updatedAppointment}


    const days = updateSpots(id)
    return axios.delete(`api/appointments/${id}`)
    .then(() => 
      setState({...state,  appointments : newAppointmentsList , days}))
  }

  /** Function to increase/decrease number of spots based on Appointment id
   * 
   * @param {*} id - id of aoppointment
   * @param {*} increase - indicates if number of spots should increase. Default to 'false'
   * @returns {array} - return array of days with updated spots
   */
  function updateSpots(id, increase = false) {

    const day = Math.floor(id / 5);
    let spots = state.days[day].spots + 1;
    
    if (increase) {
      spots -= 2;
    }

    const dayUpdate = {
      ...state.days[day], 
      spots }

    const days = state.days.map((selectedDay, index) => index === day ? dayUpdate : selectedDay)

    return days;

  }

 
  return {state, bookInterview, cancelInterview, setState, setDay}
}