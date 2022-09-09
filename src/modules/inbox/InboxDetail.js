import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { l10n } from "../../constants/language";
import { ic_back, ic_inbox1 } from "../../assets/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/userAuth";
import "./Inbox.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getMessage } from "../../config/api";

export default function InboxDetail() {
  const [lang, setLang] = useState("id");
  const [data, setData] = useState({});

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (location.state.data != null) {
      setData(location.state.data);
    }
  });
  return (
    <Container>
      <Row className="header">
        <Col md="auto" xs="auto">
          <div style={{ justifyContent: "flex-start" }}>
            <a onClick={() => history.goBack()}>
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
          <List
            sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemText primary={data.content} />
            </ListItem>
          </List>
        </Col>
      </Row>
    </Container>
  );
}
