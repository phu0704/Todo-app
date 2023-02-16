import { ITodo, ITodoAction, ITodoState } from "../interface/type";
const initState: ITodoState = {
  todoList: [{ id: 2, name: "Test", status: "Active", time: "" }],
  status: "ALL",
};
const rootReducer = (state: ITodoState = initState, action: ITodoAction) => {
  switch (action.type) {
    case "getApi":
      return {
        ...state,
        todoList: action.payload as ITodo[],
      };
    case "addTodo":
      return {
        ...state,
        todoList: [...state.todoList, action.payload as ITodo],
      };

    case "setTodos":
      return {
        ...state,
        todoList: action.payload as ITodo[],
      };
    case "deleteTodo":
      return {
        ...state,
        todoList: [
          ...state.todoList.filter(
            (item: ITodo) => item.id !== (action.payload as number)
          ),
        ],
      };
    case "setStatus":
      return {
        ...state,
        status: action.payload as string,
      };
    default:
      return state;
  }
};
export default rootReducer;
