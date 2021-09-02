
import React, {Fragment} from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import './styles.scss';


export default function Appointment(props) {
  
  const {id, time, interview} = props;
  console.log(interview);
  return (
    <Fragment>
      <article className="appointment">
      <Header time = {time} />
      {interview && <Show student = {interview.student} interviewer = {interview.interviewer} key = {id}/>}
      {!interview && <Empty message = {"No Booked Appointments"} key = {id}/>}
      </article>
    </Fragment>
  )
};