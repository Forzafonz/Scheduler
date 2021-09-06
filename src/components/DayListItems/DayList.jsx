// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  return (<React.Fragment>
    {props.days.map(day => <DayListItem 
      key = {day.id} 
      {...day}
      setDay = {() => props.setDay(day.name)} 
      selected={day.name === props.day}/>)}
  </React.Fragment>)
};
