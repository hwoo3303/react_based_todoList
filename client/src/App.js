import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {
  const [todoText, setTodoText] = useState('');     // 할일 작성 TEXT
  const [todoList, setTodoList] = useState([]);     // TODO-LIST
  const [modTodoText, setModTodo] = useState("");   // 할일 수정 TEXT

  // Todo-list 조회 및 동기화
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) =>{
      setTodoList(response.data);
    });
  }, [todoList]);

  // 새로운 Todo 추가
  const todoAdd = () =>{
    // 공백입력 방지
    if(todoText.replace(' ', '') !== (null || "")){
      Axios.post("http://localhost:3001/api/insert", {
        todoText: todoText,
      });

      setTodoList([
        ...todoList, 
        {todoText: todoText}
      ]);
    } else{
      alert("입력후 추가해주세요.");    
    }
  };
  
  // 선택된 Todo 삭제
  const deleteTodo = (todoId) => {
    if(window.confirm("해당 Todo를 완료처리 하시겠습니까?") === true){
      Axios.delete(`http://localhost:3001/api/delete/${todoId}`);
      alert("완료되었습니다.");
    }
  };

  // 선택된 Todo 수정
  const updateTodo = (todoId) => {
    
    if(window.confirm("해당 Todo를 수정하시겠습니까?") === true){
        Axios.put("http://localhost:3001/api/update", {
        todoTextId: todoId, 
        modTodoText: modTodoText,
      });
      alert("수정되었습니다.");
      setModTodo("");
    }
  };

  return (
    <div className="App">
      <h1>HJ's TO-DO LIST</h1>
        <div className="form">
          <input type="text" name="todoText" id="todoInput" placeholder="할일을 입력해주세요." onChange={(e)=>{
            setTodoText(e.target.value);
          }}/>

          <button onClick={todoAdd} className="todo-button" id="addBtn" type="submit">
              <i className="fas fa-plus-square"></i>
          </button>
          <div className="todo-container">
          {todoList.map((val) => {
            // 수정버튼 style
            const udtBtnStyle = {
              color: "white",
              background: "teal",
              padding: "0px 60px 0px 55px",
              margin:"0px 50px 0px 50px",
              border: "1px solid teal",
              borderRadius: ".25rem",
              fontSize: "1rem",
              lineHeight: 2.5,
              opacity:0.8,
            };
            // 삭제버튼 style
            const delBtnStyle = {
              background: "skyblue",
              padding: "0px 60px 0px 55px",
              margin:"0px 50px 0px 50px",
              border: "1px solid skyblue",
              borderRadius: ".25rem",
              fontSize: "1rem",
              lineHeight: 2.5,
            };
            return(
              <div className="card">
                <input type="text" id="updateInput" placeholder={val.TODO_TEXT} onChange={(e) => {
                  setModTodo(e.target.value);
                }}/>
                <div>
                <button id="deleteBtn" style={delBtnStyle} onClick={() => {deleteTodo(val.TODO_ID)}}>완료
                </button>
                
                <button id="updateBtn" style={udtBtnStyle} onClick={() => {updateTodo(val.TODO_ID)}}>수정</button>
                </div>
              </div>
            );
          })}
          </div> 
        </div>
      </div>
  );
}

export default App;
