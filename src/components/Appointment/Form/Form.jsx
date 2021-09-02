// The Form component should take the following props:
// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function


import React, {useState} from 'react';
import Button from 'components/Button/Button';
import InterviewerList from 'components/Interviewers/InterviewerList';
import '../styles.scss'

export default function Form(props) {

  const {name, interviewer, interviewers, onSave, onCancel} = props;
  const [studentName, setName] = useState(name || "");
  const [interviewerName, setInterviewer] = useState(interviewer || null);

  const reset = () => {
    setInterviewer(null);
    setName("");
  }

  const cancel = () => {
    reset();
    onCancel();
  }
  console.log(studentName)
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder = {(()=>{
          if (studentName) {
            console.log("No i am here!")
            return studentName
          } else {
            console.log("I am here")
            return "Enter Student Name"
          }
        })()}
      />
    </form>
    
    <InterviewerList interviewers={interviewers} value={interviewerName} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick = {() => cancel()}>Cancel</Button>
      <Button confirm onClick = {onSave}>Save</Button>
    </section>
  </section>
</main>

  )
};