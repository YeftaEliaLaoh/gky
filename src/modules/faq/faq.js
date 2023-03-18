import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { l10n } from "../../constants/language";
import { ic_back } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/userAuth";
import "./FAQ.css";
import { postForgotPassword } from "../../config/api";
import { useAlert } from "react-alert";

const FAQ = () => {
  const [lang, setLang] = useState("id");


  let history = useHistory();
  let location = useLocation();
  const alert = useAlert();

  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    setLang(language);
  }, []);

  return (
    <Container>
      <Row className="align-items-center header">
        <Col xs="1" md="3" lg="3"></Col>
        <Col md="auto" xs="auto">
          <div className="title">
            <Link to="/">
              <img src={ic_back} alt="back" className="ic_back" />
            </Link>
            <span>{l10n.faq[lang]}</span>
          </div>
        </Col>
        <Col xs="1" md="2" lg="3"></Col>
      </Row>
      <Row>
        <Col xs="1" md="3" lg="3"></Col>
        <Col md="auto" xs="auto">
          <div className="textLabelInput" >
            <p>{l10n.welcome_faq[lang]}</p>
            
            <li><strong>{l10n.q1[lang]}</strong>
            <ul>{l10n.a1[lang]}</ul>
            </li>
            <li><strong>{l10n.q2[lang]}</strong>
            <ul>{l10n.a2[lang]}</ul>
            </li>
            <li><strong>{l10n.q3[lang]}</strong>
            <ul>{l10n.a3[lang]}</ul>
            </li>
            <li><strong>{l10n.q4[lang]}</strong>
            <ul>{l10n.a4[lang]}</ul>
            </li>
            <li><strong>{l10n.q5[lang]}</strong>
            <ul>{l10n.a5[lang]}</ul>
            </li>
            <li><strong>{l10n.q6[lang]}</strong>
            <ul>{l10n.a6[lang]}</ul>
            </li>
            <li><strong>{l10n.q7[lang]}</strong>
            <ul>{l10n.a7[lang]}</ul>
            </li>
            <li><strong>{l10n.q8[lang]}</strong>
            <ul>{l10n.a8[lang]}</ul>
            </li>
            <li><strong>{l10n.a9[lang]}</strong>
            <ul>{l10n.a9[lang]}</ul>
            </li>
            <li><strong>{l10n.q10[lang]}</strong>
            <ul>{l10n.a10[lang]}</ul>
            </li>
            <li><strong>{l10n.q11[lang]}</strong>
            <ul>{l10n.a11[lang]}</ul>
            </li>
            <li><strong>{l10n.q12[lang]}</strong>
            <ul>{l10n.a12[lang]}</ul>
            </li>
          </div>
        </Col>
        <Col xs="1" md="2" lg="3"></Col>
      </Row>
    </Container>
  );
};
export default FAQ;
