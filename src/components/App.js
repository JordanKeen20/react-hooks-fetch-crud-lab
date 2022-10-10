import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [info, setInfo] = useState([
    {
      "id": 1,
      "prompt": "What special prop should always be included for lists of elements?",
      "answers": ["id", "name", "key", "prop"],
      "correctIndex": 2
      }
    ]);

    useEffect(() => {
      fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setInfo(data))
    }, [])

  function addQuestions(){
   const create = {
    method:"POST",
    Headers: { "Content-Type": "application/json" },

    Body: JSON.stringify({
      "prompt": 'string',
      "answers": "array of strings",
      "correctIndex": "integer"
    })
   }
   fetch('http://localhost:4000/questions', create)
   .then(r => r.json())
   .then(nQuestions =>{const nQuestion = [...info, nQuestions];
     setInfo(nQuestion)
  })
  }

  function deleteQuestion(questId){
    const config = {
      method: "DELETE"
    };
    fetch(`http://localhost:4000/questions/${questId}`, config)
    .then(response => response.json())
    .then(()=>{
        const newList = info.filter(filInfo=>filInfo.id!== questId);
        setInfo(newList);
    })
  }
  
  function update(questId, questionsUpdate){
    console.log('UPDATE'+ questionsUpdate +' '+ questId)

    fetch(`http://localhost:4000/questions/${questId}`,{
      method: 'PATCH',
      headers: {
        'Content-type': "application/json"
      },
      body: {'correctIndex': update},
    })
    .then(r =>r.json())
    .then((questionsUpdate) => {
      const questionsUpdates = info.map((dat) => {
        if(dat.id === questId)
        return questionsUpdate;
        return info;
      })
      setInfo(questionsUpdates);
    } ,[] )
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm addQuestions= {addQuestions} /> : 
      <QuestionList 
        information = {info}
        update = {update}
        deleteQuest = {deleteQuestion}
      />}
    </main>
  );
}

export default App;


// view, add, edit, and delete quiz questions to existing quiz
//    {get, post, patch, and delete fetch}