/**
 * @param {object} state "state" object from which only "days" object is required: [{id: 1,name: "Monday",appointments: [1, 2, 3]}, {  id: 2,  name: "Tuesday",  appointments: [4, 5]}]
 * @param {string} day day as a string: "Tuesday"
 * @returns {array} array [{id:1, time: '12pm', interview: null}, {id:2, time: '1pm', interview: null}]  
 */

export function getAppointmentsForDay(state, day) {
  const {days, appointments } = state;
  if (!days.length) return [];
  const selectedDayAppointments = days.filter(sday => sday.name === day)
  if (!selectedDayAppointments.length) return [];
  return selectedDayAppointments[0].appointments.map(id => appointments[id]);
}

/**
 * @param {object} state "state" object from which only "interviewers" object is required: {"1": {  "id": 1,"name": "Sylvia Palmer","avatar": "https://i.imgur.com/LpaY82x.png" }
 * @param {object} interview interview object like: { student: "Lydia Miller-Jones", interviewer: 1 }
 * @returns {object} object like {  "student": "Lydia Miller-Jones", "interviewer": {  "id": 1, "name": "Sylvia Palmer", "avatar": "https://i.imgur.com/LpaY82x.png"} }
 */

export function getInterview(state, interview) {
  const { interviewers } = state;
  if (interview === null) return null;
  const interviewerId = interview.interviewer;
  const interviewerDetails = interviewers[interviewerId];
  return Object.assign({}, {student: interview.student}, {interviewer : interviewerDetails});
}

/**
 * @param {object} state - "state" object from which only "interviewers" object is required: {"1": {  "id": 1,"name": "Sylvia Palmer","avatar": "https://i.imgur.com/LpaY82x.png" }
 * @param {object} day - day as a string: "Tuesday"
 * @returns {Array} array - [{id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png'},
 *                     {id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png'},
 *                     {id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png'}] 
 */

export function getInterviewersForDay(state, day) {
  const {days, interviewers  } = state;
  if (!days.length) return [];
  const selectedinterviewers = days.filter(sday => sday.name === day)
  if (!selectedinterviewers.length) return [];
  return selectedinterviewers[0].interviewers.map(id => interviewers[id]);
}