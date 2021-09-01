
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';

export default function InterviewerList(props) {

 
  const {interviewers, interviewer, setInterviewer} = props
  const interviewersList = interviewers.map(interv => <InterviewerListItem 
    key = {interv.id} {...interv} 
    selected = {interviewer === interv.id ? true : false}
    setInterviewer = {() => setInterviewer(interv.id)}/>)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  )

}