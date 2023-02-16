import styles from "../Input/Input.module.css";
export default function Input(props: {
  className: string;
  className2: string;
  checked: boolean;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  onChange: Function;
  onBlur: Function;
}) {
  return (
    <input
      className={`${styles[props.className]} ${styles[props.className2]}`}
      checked={props.checked}
      type={props.type}
      name={props.name}
      id={`${styles[props.id]}`}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.onChange(e);
      }}
      onBlur={(e) => {
        props.onBlur(e);
      }}
    />
  );
}
