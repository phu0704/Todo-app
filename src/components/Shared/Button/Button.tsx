import styles from "../Button/Button.module.css";
export default function Button(props: {
  id: string;
  onClick: Function;
  content: string;
  className: string;
}) {
  return (
    <button
      type="submit"
      className={`${styles[props.className]}`}
      id={`${styles[props.id]}`}
      onClick={(e) => props.onClick(e)}
    >
      {props.content}
    </button>
  );
}
