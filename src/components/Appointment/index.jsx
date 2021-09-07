// {...appointment} interviewers = {dailyInterviewers}
// {...appointment} PROP includes:
// {id:1, time: '12pm', interview: (null or Object Like { student: "Archie Cohen", interviewer: 2 })}
// Interviewers PROP include: 
// array - [{id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png'},
//  *                     {id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png'},
//  *                     {id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png'}] 
// Function: bookInterview(id, interview) 
// Function: cancelInterview(id)

import React, {Fragment} from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form/Form';
import Status from './Status';
import Confirm from './Confrim';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";



export default function Appointment(props) {
 
  const {id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back,  } = useVisualMode(interview ? SHOW : EMPTY)


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
    .then((res) => {
      transition(SHOW)})
  }

  /**
   * Function to cancel interview
   * @param {*} id - appointment id
   */

  function cancel() {
    
    transition(DELETE, true)
    cancelInterview(id)
    .then(() => {
      transition(EMPTY)}
    )
  }

  return (
    <Fragment>
      <article className="appointment">
      <Header time = {time} />
      {mode === CONFIRM && <Confirm onConfirm = {() => cancel()} onCancel = {() => back()} message = {"Please confirm that you want to delete your appointment"}/>}
      {mode === EMPTY && <Empty message = {"No Booked Appointments"} key = {id} onAdd = {() => transition(CREATE)}/>}
      {mode === DELETE && <Status message = {"Deleting"}/>}
      {mode === SAVING && <Status message = {"Saving"}/>}
      {mode === CREATE && <Form {...interview} interviewers = {interviewers} onCancel = {() => back()} onSave = {save}/>}
      {mode === SHOW && <Show student = {interview.student} interviewer = {interview.interviewer} key = {id} onCancel = {() => transition(CONFIRM)}/>}
      </article>
    </Fragment>
  )
};