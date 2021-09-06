import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayListItems/DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  const dailyAppointments = getAppointmentsForDay({appointments: state.appointments, days: state.days}, state.day)
  const dailyInterviewers = getInterviewersForDay ({interviewers: state.interviewers, days: state.days}, state.day)
  console.log(dailyInterviewers)

  const setDay = (day) => {
    setState(prevState => ({...prevState, day : day}));
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
       
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      

      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => (<Appointment key = {appointment.id} {...appointment} interviewers = {dailyInterviewers}/>)
      )}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
