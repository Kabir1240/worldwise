import styles from "./Message.module.css";

type MessageProps = {
  message: string
}

function Message({ message }: MessageProps): JSX.Element {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
