import { ListItem } from "@mui/material";
import { CSSProperties } from "react";
 
interface Message {
  sid?: string;
  author: string;
  body: string;
  dateCreated: string;
}
 
interface Props {
  message: Message;
  email: string;
}
 
interface Styles {
  listItem: (isOwnMessage: boolean) => CSSProperties;
  container: (isOwnMessage: boolean) => CSSProperties;
  author: CSSProperties;
  timestamp: CSSProperties;
}
 
const ChatItem = ({ message, email }: Props) => {
  const isOwnMessage = message.author === email;
 
  const styles: Styles = {
    listItem: (isOwnMessage: boolean) => ({
      flexDirection: "column",
      alignItems: isOwnMessage ? "flex-end" : "flex-start",
    }),
    container: (isOwnMessage: boolean) => ({
      maxWidth: "75%",
      borderRadius: 12,
      padding: 16,
      color: "white",
      fontSize: 12,
      backgroundColor: isOwnMessage ? "#054740" : "#262d31",
    }),
    author: { fontSize: 10, color: "gray" },
    timestamp: { fontSize: 8, color: "white", textAlign: "right" as const, paddingTop: 4 },
  };
 
  return (
    <ListItem style={styles.listItem(isOwnMessage)}>
      <div style={styles.author}>{message.author}</div>
      <div style={styles.container(isOwnMessage)}>
        {message.body}
        <div style={styles.timestamp}>
          {new Date(message.dateCreated).toLocaleString()}
        </div>
      </div>
    </ListItem>
  );
};
 
export default ChatItem;