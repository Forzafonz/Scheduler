import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayListItems/DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
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
        console.log("Interviewers: ", interviewers.data)
        setState(prevState => ({...prevState, days: days.data, appointments: appointments.data}))
      }
    )
  }, [])

  const dailyAppointments = getAppointmentsForDay({appointments: state.appointments, days: state.days}, state.day)
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
        {dailyAppointments.map(appointment => (<Appointment key = {appointment.id} {...appointment}/>)
      )}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Tony Dove",
      interviewer: { 
        id: 3, 
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png" }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Fernando Alonso",
      interviewer: { 
        id: 5, 
        name: "Sven Jones", 
        avatar: "https://i.imgur.com/twYrpay.jpg" }
    }
  },
];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];