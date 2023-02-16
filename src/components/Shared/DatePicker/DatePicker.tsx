import styles from "../DatePicker/DatePicker.module.css";
export default function DatePicker(props: {
  className: string;
  className2: string;
  type: string;
  name: string;
  id: string;
  defaultValue: string;
  onChange: Function;
  onBlur: Function;
}) {
  return (
    <input
      className={`${styles[props.className]} ${styles[props.className2]}`}
      type={props.type}
      name={props.name}
      id={`${styles[props.id]}`}
      defaultValue={props.defaultValue}
      onChange={(e) => {
        props.onChange(e);
      }}
      onBlur={(e) => {
        props.onBlur(e);
      }}
    />
  );
}
