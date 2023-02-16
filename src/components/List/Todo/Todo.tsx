import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, setTodos } from "../../../redux/actions";
import { statustSelector, todoListSelector } from "../../../redux/selectors";
import { ITodo } from "../../../interface/type";
import styles from "../Todo/Todo.module.css";
import Input from "../../Shared/Input/Input";
import Span from "../../Shared/Span/Span";
import { toast } from "react-toastify";
import { baseURL } from "../../../Api/api";
import DatePicker from "../../Shared/DatePicker/DatePicker";
import {
  CheckNotify,
  CheckNotifyOne,
} from "../../CheckNotifyTime/CheckNotifyTime";
import { Estatus } from "../../Enum/Enum";
export default function Todo() {
  const todoList = useSelector(todoListSelector);
  const status = useSelector(statustSelector);
  const dispatch = useDispatch();
  const courseApi: string = baseURL();
  const handleDelete = async (e: number) => {
    try {
      await axios.delete(courseApi + e);
      dispatch(deleteTodo(e));
      toast.dismiss();
      toast.success("successful delete");
    } catch (error) {
      console.log("loi xoa todo", error);
    }
  };
  const handleOnBlurName = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    id: number
  ) => {
    updateData(id, e.target.value, "");
    e.target.value = "";
  };
  const handleOnBlurTime = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ): void => {
    updateData(id, "", e.target.value);
    CheckNotify(todoList);
  };
  const updateData = (idw: number, name: string, time: string) => {
    const data: ITodo[] = todoList.map((obj: ITodo) => {
      if (obj.id === idw) {
        if (name === "") {
          name = obj.name;
          CheckNotifyOne({
            id: obj.id,
            name: name,
            status: obj.status,
            time: time,
          });
        } else time = obj.time;
        return {
          ...obj,
          id: obj.id,
          name: name,
          status: obj.status,
          time: time,
        };
      }
      return obj;
    });
    dispatch(setTodos(data));
    todoList.map((obj: ITodo) => {
      if (obj.id === idw) {
        const dt = {
          id: obj.id,
          name: name,
          status: obj.status,
          time: time,
        };

        axios.put(courseApi + idw, dt).then((data) => {});
      }
    });
  };
  const handleOnChangeCheckbox = (e: number): void => {
    let statusedit: string;
    const newState: ITodo[] = todoList.map((obj: ITodo) => {
      if (obj.id === e) {
        if (obj.status === Estatus.Active) statusedit = Estatus.Completed;
        else statusedit = Estatus.Active;
        const dt = {
          id: obj.id,
          name: obj.name,
          status: statusedit,
          time: obj.time,
        };
        axios.put(courseApi + e, dt).then((data) => {});
        return {
          ...obj,
          status: statusedit,
        };
      }
      return obj;
    });
    dispatch(setTodos(newState));
  };
  return todoList.map((item: ITodo) => {
    if (item.status === status || status === Estatus.All) {
      return (
        <div key={item.id} className={styles.todoItem}>
          <div>
            <Input
              className="checkbox"
              className2="column"
              checked={item.status === Estatus.Active ? false : true}
              type="checkbox"
              name="status"
              id="checkbox"
              placeholder=""
              onChange={() => handleOnChangeCheckbox(item.id)}
              onBlur={() => {}}
            />
          </div>
          <Input
            className="list"
            className2="column"
            checked={item.status === Estatus.Active ? false : true}
            type="text"
            name="name"
            id="itemname"
            placeholder={item.name}
            onChange={() => {}}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
              handleOnBlurName(e, item.id);
            }}
          />
          <DatePicker
            className="list"
            className2="column"
            type="datetime-local"
            name="time"
            id="id"
            defaultValue={item.time}
            onChange={() => {}}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
              handleOnBlurTime(e, item.id);
            }}
          />
          <Span
            className="column"
            id="delete"
            onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
              handleDelete(item.id)
            }
            content="X"
          />
        </div>
      );
    }
    return <div key={item.id}></div>;
  });
}
