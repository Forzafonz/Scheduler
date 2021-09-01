import React from 'react';
import classNames from 'classnames';
import "./DayListItem.scss";

export default function DayListItem(props) {
  const itemClass = classNames('day-list__item', {'day-list__item--selected': props.selected}, {'day-list__item--full': !props.spots})
  
  return (
    <li onClick={() => props.setDay(props.name)} className = {itemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots === 0 ? "no spots" : (props.spots > 1 ? (props.spots + " spots") : (props.spots + " spot") )} remaining</h3>
  </li>
  )
  
};
