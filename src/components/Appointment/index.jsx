// PROPS:
// {...appointment} interviewers = {dailyInterviewers}
// {...appointment} PROP includes:
// {id:1, time: '12pm', interview: (null or Object Like { student: "Archie Cohen", interviewer: 2 })}
// Interviewers PROP include: 
// array - [{id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png'},
//  *                     {id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png'},
//  *                     {id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png'}] 
// Function: bookInterview(id, interview) 
// Function: cancelInterview(id)

import React, {Fragment, useEffect} from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form/Form';
import Status from './Status';
import Confirm from './Confrim';
import Error from './Error';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';

// Mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_NO_DATA = "ERROR_NO_DATA"



export default function Appointment(props) {

  const {id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back,  } = useVisualMode(interview ? SHOW : EMPTY)

  // Update mode after receiving websocket update
  useEffect(() => {

    if (mode === EMPTY && interview){
      transition(SHOW)
    } else if (mode === SHOW && !interview) {
      transition(EMPTY)
    }

  }, [interview, mode, transition])


  function save(name, interviewer) {
    
    if (!interviewer){
      transition(ERROR_NO_DATA)
      return;
    }
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
    .then((res) => {
      transition(SHOW)})
    .catch(() => {
      transition(ERROR_SAVE, true)
    })
  }

  function cancel() {
    
    transition(DELETE, true)
    cancelInterview(id)
    .then(() => {
      transition(EMPTY)
    })
    .catch(() => {
      transition(ERROR_DELETE, true)
    })
  }

  return (
    <Fragment>
      <article className="appointment" data-testid="appointment">
      <Header time = {time} />
      {mode === DELETE &&             <Status message = {"Deleting"}/>}
      {mode === SAVING &&             <Status message = {"Saving"}/>}
      {mode === ERROR_SAVE &&         <Error  message = {"CANNOT SAVE YOUR APPOINTMENT. PLEASE TRY AGAIN LATER"}   onClose = {() => back()}/>}
      {mode === ERROR_DELETE &&       <Error  message = {"CANNOT DELETE YOUR APPOINTMENT. PLEASE TRY AGAIN LATER"} onClose = {() => back()}/>}
      {mode === ERROR_NO_DATA &&      <Error  message = {"CANNOT SAVE YOUR APPOINTMENT. PLESE SELECT INTERVIEWER"} onClose = {() => back()}/>}
      {mode === EMPTY &&              <Empty  message = {"No Booked Appointments"} key = {id} onAdd = {() => transition(CREATE)}/>}
      {mode === EDIT &&               <Form 
          {...interview} 
          interviewers = 
          {interviewers} 
          onCancel = {() => back()} 
          onSave = {save}/>
          }
      {mode === CREATE &&             <Form 
          {...interview} 
          interviewers = {interviewers} 
          onCancel = {() => back()} 
          onSave = {save}/>
          }
      {mode === CONFIRM &&            <Confirm 
          onConfirm = {() => cancel()} 
          onCancel = {() => back()} 
          message = {"Please confirm that you want to delete your appointment"}/>
          }
      {mode === SHOW && interview &&  <Show 
          student = {interview.student} 
          interviewer = {interview.interviewer} 
          key = {id} 
          onCancel = {() => transition(CONFIRM)}
          onEdit = {() => transition(EDIT)}
          />
          }
      </article>
    </Fragment>
  )
};