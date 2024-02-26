



function TodoAdder({handleAddTodo, handlTodoText,todoList,todo}) {

    return(<div className="todo-adder">
    <input
      className="todoInput"
      type="text"
      placeholder="Please add the task"
      value={todo}
      onChange={(e) => handlTodoText(e.target.value)}
      onKeyUp={e => { if (e.key === "Enter") handleAddTodo(e.target) }}
    />
    <input
      className="todoaddbtn"
      type="submit"
      value="Add Todo"
      onClick={(e) => handleAddTodo(e.target)}
    />
  </div>)
}

export default TodoAdder;
