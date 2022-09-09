import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { l10n } from "../../constants/language";
import { ic_back, ic_inbox } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/userAuth";
import "./Inbox.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { getMessage } from "../../config/api";
export default function Inbox() {
  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const [content, set_Content] = useState("");
  let history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token != null) {
      getNotif(token);
    }
  }, []);

  const getNotif = (token) => {
    getMessage(token)
      .then((response) => {
        console.log(response.data);
        if ((response.data.status = "success")) {
          setData(response.data.data);
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <Container>
      <Row className="header">
        <Col md="auto" xs="auto">
          <div style={{ justifyContent: "flex-start" }}>
            <a onClick={() => history.push("/")}>
              <img
                src={ic_back}
                alt="back"
                style={{
                  width: 25,
                  position: "relative",
                  marginRight: 10,
                  marginTop: -5,
                }}
              />
            </a>
            <span style={{ fontSize: 20 }}>{l10n.inbox[lang]}</span>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col md="auto" xs="auto">
          <br />
          {data.map((item,i) => (
            <List
              sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
              key={"data-inbox-"+i}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Inbox" src={ic_inbox} className="ic_inbox1" />
                </ListItemAvatar>
                <a
                  onClick={() => history.push("/inbox_detail", { data: item })}
                  className="inbox_link"
                
                >
                  <ListItemText primary={item.content} />
                </a>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
