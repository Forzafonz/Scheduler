import { updateSpots } from 'helpers/selectors';

// const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = function (state, action) {

  const setDay = (state, action) =>{
    return {...state, day: action.value.day}
  }

  const setApplicationData = (state,action) => {
    const {days, appointments, interviewers} = action.value
    return {...state, days, appointments, interviewers }
  }

  const setInterview = (state, action) => {
    const {interview, id} = action.value
    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state.days, appointments, id)
    return {...state, appointments, days}
  }

  const actions = {

    [SET_DAY]: setDay,
    [SET_APPLICATION_DATA]: setApplicationData,
    [SET_INTERVIEW]: setInterview,
    "default": () => {
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`)}
  }

  return actions[action.type] ? actions[action.type](state, action) : actions["default"]()

}

export { reducer as default, SET_DAY, SET_INTERVIEW, SET_APPLICATION_DATA };