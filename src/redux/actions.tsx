import { ITodo } from "../interface/type";
export const addTodo = (data: ITodo) => {
  return {
    type: "addTodo",
    payload: data,
  };
};
export const setTodos = (data: ITodo[]) => {
  return {
    type: "setTodos",
    payload: data,
  };
};
export const deleteTodo = (id: number) => {
  return {
    type: "deleteTodo",
    payload: id,
  };
};
export const getApi = (data: ITodo[]) => {
  return {
    type: "getApi",
    payload: data,
  };
};
export const setStatus = (data: string) => {
  return {
    type: "setStatus",
    payload: data,
  };
};
