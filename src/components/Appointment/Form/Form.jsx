// The Form component should take the following props:
// name:String
// interviewers:Array of Objects: [{id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png'}, {id: 10, name: 'Samantha Stanic', avatar: 'https://i.imgur.com/okB9WKC.jpg'} ]
// interviewer:Number
// onSave:Function
// onCancel:Function


import React, {useState} from 'react';
import Button from 'components/Button/Button';
import InterviewerList from 'components/Interviewers/InterviewerList';
import '../styles.scss'

export default function Form(props) {
  
  const {student, interviewer, interviewers, onSave, onCancel} = props;
  const [studentName, setName] = useState(student || "");
  const [interviewerName, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");


  const reset = () => {
    setInterviewer(null);
    setName("");
    setError("");
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  const updateName = (event) => {
    setName(event.target.value)
  }

  function validate() {
    if (studentName === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    setError("")
    onSave(studentName, interviewerName ? interviewerName.id : null)
  }
  


  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        data-testid="student-name-input"
        onChange={updateName}
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value = {(()=>{
          if (studentName) {
            return studentName
          } else {
            return ''
          }
        })()
      }
        placeholder = {(()=>{
          if (studentName) {
            return studentName
          } else {
            return "Enter Student Name"
          }
        })()}
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={interviewers} value={interviewerName} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick = {() => cancel()}>Cancel</Button>
      <Button confirm onClick = {() => validate()}>Save</Button>
    </section>
  </section>
</main>

  )
};