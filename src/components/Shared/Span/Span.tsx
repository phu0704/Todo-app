import styles from "../Span/Span.module.css";
export default function Span(props: {
  className: string;
  id: string;
  onClick: Function;
  content: string;
}) {
  return (
    <span
      className={`${styles[props.className]}`}
      id={`${styles[props.id]}`}
      onClick={(e) => props.onClick()}
    >
      {props.content}
    </span>
  );
}
