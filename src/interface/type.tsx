export type ITodo = {
  id: number;
  name: string;
  status: string;
  time: string;
};
export type ITodoState = {
  todoList: ITodo[];
  status: string;
};
export type ITodoAction = {
  type: string;
  payload: ITodo[] | ITodo | number | string;
};
