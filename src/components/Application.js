import React from "react";
import "components/Application.scss";
import DayList from "./DayListItems/DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // Retrive daily Appointments and Interviewes using selectors
  const dailyAppointments = getAppointmentsForDay({appointments: state.appointments, days: state.days}, state.day)
  const dailyInterviewers = getInterviewersForDay ({interviewers: state.interviewers, days: state.days}, state.day)
  const appointments = dailyAppointments.map(appointment => (
               <Appointment 
                key = {appointment.id} 
                {...appointment}
                interview = {getInterview(state, appointment.interview)} 
                interviewers = {dailyInterviewers} 
                bookInterview = {bookInterview}
                cancelInterview = {cancelInterview}
                />)
  )

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
        {appointments}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}