// {...appointment} interviewers = {dailyInterviewers}
// {...appointment} PROP includes:
// {id:1, time: '12pm', interview: (null or Object Like { student: "Archie Cohen", interviewer: 2 })}
// Interviewers PROP include: 
// array - [{id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png'},
//  *                     {id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png'},
//  *                     {id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png'}] 
// Function: bookInterview(id, interview) 

import React, {Fragment, useEffect} from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form/Form';
import Status from './Status';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"



export default function Appointment(props) {
  const { mode, transition, back,  } = useVisualMode(props.interview ? SHOW : EMPTY)

  const {id, time, interview, interviewers, bookInterview } = props;

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
    .then((res) => transition(SHOW))
  }
  console.log(interview)
  return (
    <Fragment>
      <article className="appointment">
      <Header time = {time} />
      {mode === SHOW && <Show student = {interview.student} interviewer = {interview.interviewer} key = {id}/>}
      {mode === EMPTY && <Empty message = {"No Booked Appointments"} key = {id} onAdd = {() => transition(CREATE)}/>}
      {mode === CREATE && <Form {...interview} interviewers = {interviewers} onCancel = {() => back()} onSave = {save}/>}
      {mode === SAVING && <Status message = {"Saving"}/>}
      </article>
    </Fragment>
  )
};