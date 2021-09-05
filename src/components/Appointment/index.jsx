
import React, {Fragment, useEffect} from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form/Form';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  const {id, time, interview, interviewers} = props;
  // console.log("Appointment props:", props)

  return (
    <Fragment>
      <article className="appointment">
      <Header time = {time} />
      {mode === SHOW && <Show student = {interview.student} interviewer = {interview.interviewer} key = {id}/>}
      {mode === EMPTY && <Empty message = {"No Booked Appointments"} key = {id} onAdd = {() => transition(CREATE)}/>}
      {mode === CREATE && <Form {...interview} interviewers = {interviewers} onCancel = {() => back()}/>}
      </article>
    </Fragment>
  )
};