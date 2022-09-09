import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { l10n } from "../../constants/language";
import { ic_back, ic_inbox } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/userAuth";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "./LibraryCategory.css";
import { blueDark } from "../../constants/color";

export default function Rental(){
    const[lang, setlang] = useState("id");
    let history =  useHistory();
    return (
        <Container>
            <Row className="header">
                
            </Row>
        </Container>
    )
}