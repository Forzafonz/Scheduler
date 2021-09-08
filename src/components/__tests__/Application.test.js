import React from "react";

import { render, cleanup, waitForElement, act, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByTestId} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {

    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByTestId(appointment, "student-name-input"), { target : {value : "Lydia Miller-Jones"} });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
    const spots = getAllByTestId(container, "day");
    const spot = spots.find(spot => getByText(spot, "Monday"))
    expect(getByText(spot, "no spots remaining")).toBeInTheDocument();

  });

});
