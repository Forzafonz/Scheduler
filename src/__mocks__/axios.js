import { fixtures } from "./testdata";

export default {
  defaults: { baseURL: "" },
  get: jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days
      });
    }

    if (url === "/api/appointments") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.appointments
      });
    }

    if (url === "/api/interviewers") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.interviewers
      });
    }
  }),
  put : jest.fn((url, id) => {
    if (url === '/api/appointments/1' || url === '/api/appointments/2') {
      return Promise.resolve({
        status: 204,
        statusText: "No Content",
      })
    }
  }),
  delete : jest.fn((url, id) => {
    if (url === `api/appointments/2`) {
      return Promise.resolve({
        status: 204,
        statusText: "No Content"
      })
    }
  })

}
