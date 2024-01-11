import { RefObject, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import axios from "axios";
import { Client } from "twilio-chat";
import { useLocation, useNavigate } from "react-router-dom";
import ChatItem from "../components/ChatItem";
import { tokenUrl } from "../apiUrl/apiUrl";

interface State {
  token: string;
  text: string;
  messages: Message[];
  loading: boolean;
  channel: any;
}

interface Message {
  sid?: string;
  author: string;
  body: string;
  dateCreated: string;
}

interface Styles {
  textField: React.CSSProperties;
  textFieldContainer: React.CSSProperties;
  gridItem: React.CSSProperties;
  gridItemChatList: React.CSSProperties;
  gridItemMessage: React.CSSProperties;
  sendButton: React.CSSProperties;
  sendIcon: React.CSSProperties;
  mainGrid: React.CSSProperties;
}

const ChatScreen = () => {
  const [state, setState] = useState<State>({
    token: "",
    text: "",
    messages: [],
    loading: true,
    channel: null,
  });
  const styles: Styles = {
    textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
    textFieldContainer: { flex: 1, marginRight: 12 },
    gridItem: { paddingTop: 12, paddingBottom: 12 },
    gridItemChatList: { overflow: "auto", height: "70vh" },
    gridItemMessage: { marginTop: 12, marginBottom: 12 },
    sendButton: { backgroundColor: "#3f51b5", cursor: "pointer" },
    sendIcon: { color: "white", cursor: "pointer" },
    mainGrid: { paddingTop: 100, borderWidth: 1 },
  };
  const navigate = useNavigate();
  const location = useLocation();
  const scrollDiv: RefObject<HTMLDivElement> = useRef(null);

  const joinChannel = async (channel: any) => {
    if (channel && channel.channelState.status !== "joined") {
      await channel.join();
    }

    const messages = await channel.getMessages();

    const formattedMessages = messages.items.map((message: any) => {
      return {
        sid: message.sid,
        author: message.author,
        body: message.body,
        dateCreated: message.dateCreated,
      };
    });
    console.log("Previous messages:", formattedMessages);

    setState((prevState) => ({
      ...prevState,
      channel: channel,
      messages: formattedMessages,
      loading: false,
    }));

    channel.on("messageAdded", handleMessageAdded);
    scrollToBottom();
  };

  const handleMessageAdded = (message: Message) => {
    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (scrollDiv.current) {
      setTimeout(() => {
        const scrollHeight = scrollDiv.current?.scrollHeight || 0;
        const height = scrollDiv.current?.clientHeight || 0;
        const maxScrollTop = scrollHeight - height;
        if (scrollDiv.current) {
          scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
      }, 0);
    }
  };

  const getToken = async (email: string) => {
    const response = await axios.get(`${tokenUrl}${email}`);
    const { data } = response;
    return data.token;
  };

  useEffect(() => {
    const { state } = location || {};
    const { room, email } = state || {};
    let token = "";

    if (!email || !room) {
      navigate("/");
    }

    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    const TokenApiCall = async () => {
      try {
        token = await getToken(email);
        if (token) {
          setState((prev) => ({ ...prev, token: token }));
        }
      } catch {
        throw new Error("Unable to get token, please reload this page");
      }
      // finally {
      //   setState((prev) => ({ ...prev, loading: false }));
      // }
      const client = new Client(token);
      client.on("tokenAboutToExpire", async () => {
        const newToken = await getToken(email);
        client.updateToken(newToken);
      });

      client.on("tokenExpired", async () => {
        const newToken = await getToken(email);
        client.updateToken(newToken);
      });
      try {
        const channel = await client.getChannelByUniqueName(room);
        console.log({ channel });
        joinChannel(channel);
      } catch (err) {
        try {
          const channel = await client.createChannel({
            uniqueName: room,
            friendlyName: room,
          });

          joinChannel(channel);
        } catch (err) {
          console.log({ err });
          throw new Error("Unable to create channel, please reload this page");
        }
      }
    };
    TokenApiCall();
  }, []);

  const sendMessage = () => {
    if (state.text && state.channel) {
      setState((prev) => ({ ...prev, loading: true }));
      state.channel.sendMessage(state.text.trim());
      setState((prev) => ({ ...prev, text: "", loading: false }));
    } else {
      console.log("Message not sent. Text or channel is missing.");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Backdrop open={state?.loading} style={{ zIndex: 99999 }}>
          <CircularProgress style={{ color: "white" }} />
        </Backdrop>

        <AppBar elevation={10}>
          <Toolbar>
            <Typography variant="h6">
              {`Room: ${location?.state?.room}, User: ${location?.state?.email}`}
            </Typography>
          </Toolbar>
        </AppBar>

        <CssBaseline />

        <Grid container direction="column" style={styles.mainGrid}>
          <Grid item style={styles.gridItemChatList} ref={scrollDiv}>
            <List dense={true}>
              {state.messages &&
                state.messages.map((message, index: number) => (
                  <ChatItem
                    key={index}
                    message={message}
                    email={location.state.email}
                  />
                ))}
            </List>
          </Grid>

          <Grid item style={styles.gridItemMessage}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item style={styles.textFieldContainer}>
                <TextField
                  required
                  style={styles.textField}
                  placeholder="Enter message"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={state?.text}
                  disabled={state?.channel ? false : true}
                  onChange={(event) =>
                    setState((prev) => ({ ...prev, text: event.target.value }))
                  }
                />
              </Grid>

              <Grid item>
                <IconButton
                  style={styles.sendButton}
                  onClick={sendMessage}
                  disabled={!state.channel}
                >
                  <Send style={styles.sendIcon} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ChatScreen;
