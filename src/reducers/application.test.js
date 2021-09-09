import { isTaggedTemplateExpression } from "@babel/types"
import reducer from "reducers/application"

describe("Reducer", () => {
  it("throws an error with an unsupported type", () => {

    const state = { day: "Monday", days: [], appointments: {}, interviewers: {} };
    const action = {type : "WRONG_STATE"}
    const errorMessage = `Tried to reduce with unsupported action type: ${action.type}`
    expect(() => reducer(state, action)).toThrow(errorMessage);

  })

})