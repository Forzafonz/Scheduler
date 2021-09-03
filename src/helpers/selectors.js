export function getAppointmentsForDay(state, day) {
  const {days, appointments } = state;
  if (!days.length) return [];
  const selectedDayAppointments = days.filter(sday => sday.name === day)
  if (!selectedDayAppointments.length) return [];
  return selectedDayAppointments[0].appointments.map(id => appointments[id]);
}
