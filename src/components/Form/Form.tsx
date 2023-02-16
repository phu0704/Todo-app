import React, { useRef, useState } from "react";
import styles from "../Form/Form.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../redux/actions";
import { ITodo, ITodoState } from "../../interface/type";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import { baseURL } from "../../Api/api";
import DatePicker from "../Shared/DatePicker/DatePicker";
import {
  CheckNotify,
  CheckNotifyOne,
} from "../CheckNotifyTime/CheckNotifyTime";

export default function Form() {
  const refName = useRef(() => {});
  const refPicker = useRef(() => {});
  const dispatch = useDispatch();
  const todoList = useSelector((state: ITodoState) => state.todoList);
  const [inputData, setInputData] = useState({
    id: 2,
    name: "",
    status: "Active",
    time: "",
  });
  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    refName.current = () => {
      e.target.value = "";
    };
  };
  const handleOnChangeDatePicker = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    refPicker.current = () => {
      e.target.value = "";
    };
  };
  const handleOnSubmit = async () => {
    if (inputData.name === "" || inputData.time === "") {
      toast("Please fill in the full name and duration of the job");
    } else {
      let newId: number = 1;
      if (todoList.length > 0) newId = todoList[todoList.length - 1].id + 1;
      const newTodo: ITodo = {
        id: newId,
        name: inputData.name,
        status: "Active",
        time: inputData.time,
      };
      try {
        const res = await axios.post(baseURL(), {
          id: newId,
          name: inputData.name,
          status: "Active",
          time: inputData.time,
        });
        dispatch(addTodo(newTodo));
        setInputData({
          id: newId,
          name: "",
          status: "Active",
          time: "",
        });
        toast.success("Add Success");
        CheckNotifyOne(newTodo);
      } catch (error) {
        toast.error("Error Add Todo");
      }
      CheckNotify(todoList);
      refName.current();
      refPicker.current();
    }
  };
  return (
    <div className="form-container">
      <h1 id={styles.logo}>TO DO</h1>
      <Input
        className="form"
        className2=""
        checked={false}
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        onChange={handleOnChangeName}
        onBlur={() => {}}
      />
      <DatePicker
        className="form"
        className2=""
        type="datetime-local"
        name="time"
        id="time"
        defaultValue=""
        onChange={handleOnChangeDatePicker}
        onBlur={() => {}}
      />
      <Button
        className=""
        id="add"
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          handleOnSubmit();
        }}
        content="+"
      />
    </div>
  );
}
