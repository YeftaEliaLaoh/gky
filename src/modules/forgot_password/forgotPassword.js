import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { l10n } from "../../constants/language";
import { ic_back } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/userAuth";
import "./ForgotPassword.css";
import { postForgotPassword } from "../../config/api";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const [lang, setLang] = useState("id");

  const [email, set_email] = useState("");

  let history = useHistory();
  let location = useLocation();
  const alert = useAlert();

  let submitForgotPassword = () => {
    if (email.length == 0) {
      alert.show(l10n.all_must_required[lang], { timeout: 5000 });
      alert.removeAll();
      return;
    }
    postForgotPassword(email)
      .then((response) => {
        console.log(response);
        if (response.status == "200") {
          alert.show(l10n.success_email[lang]);
          //history.push("/");
        }
        else{
          alert.show(l10n.failed_email[lang]);
        }
      })
      .catch((err) => {
        console.log(err.response);
        let message = err.response.data.message;
        if (message.email != null) {
          alert.show(message.email[0]);
        } else {
          alert.show(l10n.something_wrong[lang]);
        }
      });
  };

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
            <span>{l10n.forgot_password[lang]}</span>
          </div>
        </Col>
        <Col xs="1" md="2" lg="3"></Col>
      </Row>
      <Row>
        <Col xs="1" md="3" lg="3"></Col>
        <Col md="auto" xs="auto">
          <div className="textLabelInput" >
            <p>Masukkan Email Anda yang Terdaftar, Kami Akan Segera Mengirimkan Password Baru ke Email Anda</p>
          </div>
          <div className="titleInput">{l10n.email[lang]}</div>
          <div className="inputEmail">
            <input
              type={"text"}
              placeholder={l10n.email[lang]}
              value={email}
              onChange={(event) => set_email(event.target.value)}
            />
          </div>
          <br />
          <br />
          <br />
          <div className="justify-content-center align-items-center bottomArea">
            <button
              variant="primary"
              className="btnNext"
              onClick={() => submitForgotPassword()}
            >
              <div>{l10n.send[lang]}</div>
            </button>
            <br />
            <br />
          </div>
        </Col>
        <Col xs="1" md="2" lg="3"></Col>
      </Row>
    </Container>
  );
};
export default ForgotPassword;
