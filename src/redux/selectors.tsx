import {  ITodoState } from "../interface/type";
export const todoListSelector =(state: ITodoState) => state.todoList;
export const statustSelector =(state: ITodoState) => state.status;
