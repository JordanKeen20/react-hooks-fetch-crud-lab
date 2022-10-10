import React from "react";

function QuestionItem({ question, update, deleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  
  
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


  function handleDeleteion(){
    deleteQuestion(id)
  }


  function clickUpdate (e){
    const nCorrectAns = e.target.value;
    update(id, nCorrectAns)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onClick = {clickUpdate}>{options}</select>
      </label>
      <button onClick = {handleDeleteion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
