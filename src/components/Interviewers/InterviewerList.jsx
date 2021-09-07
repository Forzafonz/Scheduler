
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';

export default function InterviewerList(props) {
  
  const {interviewers, value, onChange} = props
  const interviewersList = interviewers.map(interviewer => <InterviewerListItem 
    key = {interviewer.id} 
    {...interviewer} 
    selected = {value && value.id === interviewer.id}
    onChange = {() => onChange(interviewer)}/>)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  )

}