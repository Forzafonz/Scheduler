// name:String the name of the day
// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

import React from 'react';
import classNames from 'classnames';
import "./DayListItem.scss";

export default function DayListItem(props) {
  const {name, spots, setDay, selected} = props;
  const itemClass = classNames('day-list__item', {'day-list__item--selected': selected}, {'day-list__item--full': !spots})
  
  return (
    <li onClick={setDay} className = {itemClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots === 0 ? "no spots" : (spots > 1 ? (spots + " spots") : (spots + " spot") )} remaining</h3>
  </li>
  )
  
};
