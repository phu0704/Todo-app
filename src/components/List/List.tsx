import styles from "../List/List.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../redux/actions";
import { ITodo } from "../../interface/type";
import Todo from "./Todo/Todo";
import { statustSelector, todoListSelector } from "../../redux/selectors";
import Button from "../Shared/Button/Button";
import { Estatus } from "../Enum/Enum";
export default function List() {
  const dispatch = useDispatch();
  const todoList = useSelector(todoListSelector);
  const status = useSelector(statustSelector);
  const handleCount = (): JSX.Element => {
    let active = 0;
    let all = 0;
    const newState = todoList.map((obj: ITodo) => {
      if (obj.status === Estatus.Active) {
        active++;
      }
      all++;
    });
    if (status === Estatus.Completed) {
      return (
        <h3 className={styles.count}>
          {all - active} completed items / {all} items
        </h3>
      );
    }
    return (
      <h3 className={styles.count}>
        {active} active items / {all} items
      </h3>
    );
  };
  const handleCheckstatus = (): JSX.Element => {
    return (
      <div>
        <Button
          className="checkstatus"
          id={status === Estatus.All ? "Check" : ""}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            dispatch(setStatus(Estatus.All));
          }}
          content={Estatus.All}
        />
        <Button
          className="checkstatus"
          id={status === Estatus.Active ? "Check" : ""}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            dispatch(setStatus(Estatus.Active));
          }}
          content={Estatus.Active}
        />
        <Button
          className="checkstatus"
          id={status === Estatus.Completed ? "Check" : ""}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            dispatch(setStatus(Estatus.Completed));
          }}
          content={Estatus.Completed}
        />
      </div>
    );
  };
  return (
    <div className="list-container">
      {handleCheckstatus()}
      {handleCount()}
      {Todo()}
    </div>
  );
}
