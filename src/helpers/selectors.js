
export function getAppointmentsForDay(state, day) {
  const {days, appointments } = state;
  if (!days.length) return [];
  const selectedDayAppointments = days.filter(sday => sday.name === day)
  if (!selectedDayAppointments.length) return [];
  return selectedDayAppointments[0].appointments.map(id => appointments[id]);
}


/**
 * @param {object} state - state object, from which only interviewers is required: {"1": {  "id": 1,"name": "Sylvia Palmer","avatar": "https://i.imgur.com/LpaY82x.png" }
 * @param {object} interview - interview object like: { student: "Lydia Miller-Jones", interviewer: 1 }
 * @returns {object} - object like {  "student": "Lydia Miller-Jones", "interviewer": {  "id": 1, "name": "Sylvia Palmer", "avatar": "https://i.imgur.com/LpaY82x.png"} }
 */

export function getInterview(state, interview) {
  const { interviewers } = state;
  if (interview === null) return null;
  const interviewerId = interview.interviewer;
  const interviewerDetails = interviewers[interviewerId];
  return Object.assign({}, {student: interview.student}, {interviewer : interviewerDetails});
}

