
import TodoAdder from "../components/TodoAdder";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TODO = () => {
const [todoList, setTodoList] = useState([...JSON.parse(localStorage.getItem("todolist"))]);
const [todo, setTodo] = useState("");
localStorage.setItem("todolist",JSON.stringify([...todoList]));
console.log(JSON.parse(localStorage.getItem("todolist")));

//--------------------------
  const isCompleted = (item,index)=>{
    if(!item.isCompleted){
      
    }
    todoList[index].completed=!item.completed;
    setTodoList(todoList.map((td,mapIndex)=>mapIndex===index?{...td,editable:false}:td));
  }

  const deleteItem=(index)=>{
    todoList.splice(index,1)
    setTodoList([...todoList])
    // setTodoList(todoList.filter((index,arrIndex)=>index !== arrIndex))
  }
  const prepareDeleted=(index)=>{
    setTodoList(todoList.map((td,mapIndex)=>mapIndex===index?{...td,isAboutToDeleted:true}:{...td,editable:false,isAboutToDeleted:false}))
    // setTodoList(todoList.filter((index,arrIndex)=>index !== arrIndex))
  }
  const makeEditable=(index,element)=>{
    setTodoList(todoList.map((td,mapIndex)=>mapIndex===index?{...td,editable:true}:{...td,editable:false,isAboutToDeleted:false}))
  }
  const saveEdit=(index,element)=>{
    console.log(element.previousSibling)
    todoList[index].text=element.previousSibling.value;
    todoList[index].editable=false;
    setTodoList([...todoList])
  }
  const cancelEdit=(index,element)=>{
    setTodoList(todoList.map((td,mapIndex)=>mapIndex===index?{...td,editable:false,isAboutToDeleted:false}:td))
    // text:td.text,
  }

  const delAll=()=>{
    setTodoList([])
  }
  const delSel=()=>{
    setTodoList(todoList.filter((td)=>!td.completed));
  }
//-0--------------
  const handlTodoText = (value) => {
    setTodo(value);
  };

  const handleAddTodo = (target) => {
    if (todo.length) {
      
      const data = {
        id: uuidv4(),
        text: todo,
        completed: false,
        editable:false,
        isAboutToDeleted: false,
      };
      setTodoList([...todoList, data]);
      // document.querySelector(".todoInput").focus();\
      target.parentElement.childNodes[0].focus();
    } else {
      window.alert("You need type something inside todo input");
    }
    setTodo("");
  };


  return (
    <div className="todo-container">
      <div className="todo-container-form">
        <div className="todo-form-title">This is a todo list</div>
        <TodoAdder handlTodoText={handlTodoText} handleAddTodo={handleAddTodo} todoList={todoList} todo={todo}/>
        <div className="del-bar" style={{margin:'10px'}}><button className="delete-all delete-button" type="button" onClick={delAll} >delete all</button><button className="delete-completed edit-button " type="button" onClick={delSel}>delete selected</button></div>
        <div className="todo-list-array">
          {todoList?.map((item, index) => <div className={`single-todo ${item.completed ? 'completed' : ''}`} key={item.id}>
            <div className="serial-no">{index+1}</div>
            <div className="button"><input type="checkbox" name="" className="checkbox " onClick={()=>isCompleted(item,index)} defaultChecked={!item.completed?"":true} /></div>
            {!item.editable?<div className="todo-content" style={{textDecoration:`${item?.completed ? "line-through" : ''}`}}> {item.text}</div>:<input className="input-editable" type="text" defaultValue={item.text} autoFocus/>}
            {!item.completed?(!item.editable?(!item.isAboutToDeleted?<div className="edit-button" onClick={(e)=>makeEditable(index,e.target)}>edit</div>:<div className="cancel-button" onClick={(e)=>cancelEdit(index,e.target)}>cancel</div>):<div onClick={(e)=>saveEdit(index,e.target)} className="save-button">save</div>):!item.isAboutToDeleted?"":<div className="cancel-button" onClick={(e)=>cancelEdit(index,e.target)}>cancel</div>}
            {!item.editable?(item.isAboutToDeleted?<div className="sure-button" onClick={()=>deleteItem(index)}>sure</div>:<div className="delete-button" onClick={()=>prepareDeleted(index)}>delete</div>):<div className="cancel-button" onClick={(e)=>cancelEdit(index,e.target)}>cancel</div>}
            </div>
            )}
        </div>
      </div>
    </div>
    
  );
};

export default TODO;
