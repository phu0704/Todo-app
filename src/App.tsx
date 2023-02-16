import React, { useEffect} from "react";
import "./App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getApi} from "./redux/actions";
import { todoListSelector } from "./redux/selectors";
import { baseURL } from "./Api/api";
import { CheckNotify } from "./components/CheckNotifyTime/CheckNotifyTime";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await axios.get(baseURL());
        dispatch(getApi(res.data));
        CheckNotify(res.data);
      } catch (error) {
        console.log("loi get api");
      }
    };
    getTodo();
  }, []);
  const todoList = useSelector(todoListSelector);
  function myTimer() {
    toast.dismiss();
    CheckNotify(todoList);
  }
  setInterval(myTimer, 300000);
  return (
    <div className="container">
      <ToastContainer />
      <Form />
      <List />
    </div>
  );
}

export default App;
