import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  return (<React.Fragment>
    {props.days.map(day => <DayListItem 
      key = {day.id} 
      {...day}
      setDay = {() => props.setDay(day.id)} 
      selected={day.name === props.day}/>)}
  </React.Fragment>)
};
