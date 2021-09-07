//props
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection

import React from 'react';
import './InterviewerListItem.scss';
import classNames from 'classnames';


export default function InterviewerListItem(props) {
  const {id, name, avatar, selected, onChange} = props;
  const itemClass = classNames("interviewers__item", {"interviewers__item--selected" : selected})
  
  return (
    <li className = {itemClass} 
    onClick = {() => onChange(id)} 
    {...selected}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt="{name}"
    />
    {selected && name}
  </li>
  )

};