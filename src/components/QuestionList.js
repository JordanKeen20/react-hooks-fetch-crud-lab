import React from "react";
import QuestionItem from './QuestionItem'

function QuestionList({information, update, deleteQuestion}) {

  const display = information.map((quest) => {
    return <QuestionItem question = {quest} update = {update} deleteQuestion ={deleteQuestion}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
        <ul>
        {/* display QuestionItem components here after fetching */}
        {display}
        </ul>
    </section>
  );
}

export default QuestionList;
