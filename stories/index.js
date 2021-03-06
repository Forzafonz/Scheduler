import React, {Fragment} from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "components/Button/Button.jsx";
import DayListItem from "components/DayListItems/DayListItem";
import DayList from "components/DayListItems/DayList";
import InterviewerListItem from "components/Interviewers/InterviewerListItem";
import InterviewerList from "components/Interviewers/InterviewerList";
import Appointment from "components/Appointment";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confrim";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form/Form";

import "index.scss";



storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked1")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked2")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module) 
.addParameters({
  backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
})
.add("Unselected", () => <DayListItem name="Monday" spots={5} />) 
.add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
.add("Full", () => <DayListItem name="Monday" spots={0} />)
.add("Clickable", () => (
  <DayListItem name="Tuesday" setDay={() => action("setDay")("Tuesday")} spots={5} /> 
));

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));


  const interviewer = {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
  };
  
  storiesOf("InterviewerListItem", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    })
    .add("Unselected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
      />
    ))
    .add("Selected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected
      />
    ))
    .add("Clickable", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => action("setInterviewer")(interviewer.id)}
      />
    ));

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      setInterviewer={action("setInterviewer")}
    />
  ));
    
storiesOf("Appointment", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Appointment", () => <Appointment />)
.add("Appointment with Time", () => <
  Appointment
    time = "12pm" />)
.add("Header", () => <Header time = "12pm" />)
.add("Empty", () => <
  Empty 
  onAdd={action("onmAdd")} />)
.add("Show", () => <
  Show 
    onEdit= {action("onEditCalledFromAppointment")}
    onDelete = {action("onDeleteCalledFromAppointment")}
    student = {"Lydia Miller-Jones"}
    interviewer = {interviewers[0]} />)
.add("Confirm", () => <
  Confirm 
    onCancel={action("onCancelCalledFromAppointment")}
    onConfirm = {action("onConfirmCalledFromAppointment")}
    message = "Delete the appointment" />)
.add("Status", () => <
  Status 
    message = {"Deleting!"} />)
.add("Error", () => <
    Error 
    message={"Could not delete appointment"}
    onClose={action("onClose")} />)
.add("Edit", () => <
    Form 
    name={"Lydia Miller-Jones"}
    interviewers = {interviewers}
    interviewer = {3}
    onSave = {action("onSave")}
    onCancel={action("onCancel")} />)
.add("Create", () => <
    Form 
    interviewers = {interviewers}
    onSave = {action("onSave")}
    onCancel={action("onCancel")} />)
.add("Appointment Empty", () => (
    <Fragment>
    <Appointment id={1} time="12pm" />
    <Appointment id="last" time="1pm" />
    </Fragment>
    ))
.add("Appointment Booked", () => (
  <Fragment>
    <Appointment
      id={1}
      time="12pm"
      interview={{ student: "Lydia Miller-Jones", interviewer }}
    />
    <Appointment id="last" time="1pm" />
  </Fragment>
))
    