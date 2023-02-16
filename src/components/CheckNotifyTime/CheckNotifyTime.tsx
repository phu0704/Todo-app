import { toast } from "react-toastify";
import { ITodo } from "../../interface/type";

export const CheckNotify = (e: ITodo[]): void => {
  const time = new Date();
  let num: number = 0;
  e.map((item) => {
    const itemTime = new Date(item.time);
    num = itemTime.getTime() - time.getTime();
    num = num / 60000;
    if (num > 0 && num <= 60) {
      toast.warning(
        "Công Việc " + item.name + " còn " + num.toFixed() + " phút nữa"
      );
    }
  });
};
export const CheckNotifyOne = (item: ITodo) => {
  const time = new Date();
  let num: number = 0;
  const itemTime = new Date(item.time);
  num = itemTime.getTime() - time.getTime();
  num = num / 60000;
  if (num > 0 && num <= 60) {
    toast.warning(
      "Công Việc " + item.name + " còn " + num.toFixed() + " phút nữa"
    );
  }
};
