import React from "react";

import { render, cleanup, waitForElement, getByPlaceholderText, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByTestId, queryByText} from "@testing-library/react";
import axios from "axios";
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
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByTestId(appointment, "student-name-input"), { target : {value : "Lydia Miller-Jones"} });
    // 4.1 Try to save appointment without selecting interviewer
    fireEvent.click(getByText(appointment, "Save"))
    // 4.2 Check an error message when trying to save w/o specifying interviewer
    await waitForElement(() => queryByText(appointment, "CANNOT SAVE YOUR APPOINTMENT. PLESE SELECT INTERVIEWER"));
    expect(getByText(appointment, "CANNOT SAVE YOUR APPOINTMENT. PLESE SELECT INTERVIEWER")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    // 4.3 Re-enter the appointment
    fireEvent.change(getByTestId(appointment, "student-name-input"), { target : {value : "Lydia Miller-Jones"} });
    //5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const spots = getAllByTestId(container, "day");
    const spot = spots.find(spot => getByText(spot, "Monday"))
    expect(getByText(spot, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { container } = render(<Application />);  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    //Check if confirmation view is shown:
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    //Check that element with text "Deleting" is showing
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    //Check that interview that was removed is no longer showing
    expect(queryByText(container, "Archie Cohen")).toBeNull()
    // Check that the DayListItem with the text "Monday" has the text "2 spots remaining".
    const spots = getAllByTestId(container, "day")
    const spot = spots.find(spot => getByText(spot, "Monday"));
    expect(getByText(spot, "2 spots remaining")).toBeInTheDocument()

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    const { container } = render(<Application />);  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    //Check if edit view is shown:
    expect(getByPlaceholderText(appointment, "Archie Cohen")).toBeInTheDocument();
    fireEvent.change(getByTestId(appointment, "student-name-input"), {target : {value : "Cohen Archie"}});
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(container, "Cohen Archie"));
    expect(getByText(container, "Sylvia Palmer" )).toBeInTheDocument();
    const spots = getAllByTestId(container, "day")
    const spot = spots.find(spot => getByText(spot, "Monday"));
    expect(getByText(spot, "1 spot remaining")).toBeInTheDocument()
   
  });
  
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByTestId(appointment, "student-name-input"), {target : {value : "Cohen Archie"}});
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    await waitForElement(() => queryByText(appointment, "CANNOT SAVE YOUR APPOINTMENT. PLEASE TRY AGAIN LATER"));
    expect(getByText(appointment, "CANNOT SAVE YOUR APPOINTMENT. PLEASE TRY AGAIN LATER")).toBeInTheDocument()
    fireEvent.click(getByAltText(appointment, "Close"))
    //Check that the error has gone after clicking on Close
    expect(queryByText(appointment, "CANNOT SAVE YOUR APPOINTMENT. PLEASE TRY AGAIN LATER")).toBeNull();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {

    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"))
    fireEvent.click(getByText(appointment, "Confirm"))
    await waitForElement(() => queryByText(appointment, "CANNOT DELETE YOUR APPOINTMENT. PLEASE TRY AGAIN LATER"));
    expect(getByText(appointment, "CANNOT DELETE YOUR APPOINTMENT. PLEASE TRY AGAIN LATER")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(queryByText(appointment,"CANNOT DELETE YOUR APPOINTMENT. PLEASE TRY AGAIN LATER")).toBeNull();
    
  });

});
