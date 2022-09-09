import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { l10n } from "../../constants/language";
import { ic_back } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/userAuth";
import "./Register.css";
import { postRegistration } from "../../config/api";
import { useAlert } from "react-alert";

const Register = () => {
  const [lang, setLang] = useState("id");

  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [password, set_password] = useState("");
  const [password_confirmation, set_password_confirmation] = useState("")
  const [view_password, set_view_password] = useState(false)
  const [view_password_confirmation, set_view_password_confirmation] = useState(false)

  let history = useHistory();
  let location = useLocation();
  const alert = useAlert();

  let register = () => {
    if (name.length == 0 || email.length == 0 || phone_number.length == 0 || password.length == 0 || password_confirmation.length == 0) {
      alert.show(l10n.all_must_required[lang], { timeout: 2000 });
      alert.removeAll();
      return;
    }
    postRegistration(name, email, phone_number, password, password_confirmation)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "success") {
          alert.show(response.data.message || "successfully process your registration", {
            onOpen: () => {
              history.push("/login");
            },
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        let message = err.response.data.message;
        if (message.email != null) {
          alert.show(message.email[0]);
        } else if (message.phone_number != null) {
          alert.show(message.phone_number[0]);
        } else if (message.name != null) {
          alert.show(message.name[0]);
        } else if (message.password != null) {
          alert.show(message.password[0]);
        } else if (message.password_confirmation != null) {
          alert.show(message.password_confirmation[0]);
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

    <Row style={{ maxWidth: "320px", margin: '0 auto' }}>

      <Col xs={12} style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
        <Link to="/" style={{ height: 45 }}>
          <img src={ic_back} alt="back" className="ic_back" />
        </Link>
        <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: 15 }}>{l10n.register[lang]}</span>
      </Col>
      <Col xs={12}>
        <br />
        <br />
        <div className="titleInput">{l10n.full_name[lang]}</div>
        <div className="inputName">
          <input
            type={"text"}
            placeholder={l10n.full_name[lang]}
            value={name}
            onChange={(event) => set_name(event.target.value)}
          />
        </div>
        <br />
        <div className="titleInput">{l10n.phone_number[lang]}</div>
        <div className="inputPhone">
          <input
            type={"text"}
            placeholder={l10n.input_phone_number[lang]}
            value={phone_number}
            onChange={(event) => set_phone_number(event.target.value)}
          />
        </div>
        <br />
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
        <div className="titleInput">{l10n.password[lang]}</div>
        <div className="inputEmail" style={{position:'relative'}}>
          <input
             type={view_password ? 'text' : 'password'}
            placeholder={l10n.password[lang]}
            value={password}
            onChange={(event) => set_password(event.target.value)}
          />
          <span style={{position:'absolute', top:0, right: 5, cursor: 'pointer'}} onClick={() => set_view_password(!view_password)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg>
          </span>
        </div>
        <br />
        <div className="titleInput">{l10n.password_confirmation[lang]}</div>
        <div className="inputEmail" style={{position:'relative'}}>
          <input
            type={view_password_confirmation ? 'text' : 'password'}
            placeholder={l10n.password_confirmation[lang]}
            value={password_confirmation}
            onChange={(event) => set_password_confirmation(event.target.value)}
          />
          <span style={{position:'absolute', top:0, right: 5, cursor: 'pointer'}} onClick={() => set_view_password_confirmation(!view_password_confirmation)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg>
          </span>
        </div>
        <br />
        <br />
        <br />
        <div className="justify-content-center align-items-center bottomArea">
          <button
            variant="primary"
            className="btnNext"
            onClick={() => register()}
          >
            <div>{l10n.next[lang]}</div>
          </button>
          <br />
          <br />
          <div>
            {l10n.have_account[lang]}
            <Link to={"/login"} className="link_login">
              <b>{" " + l10n.login[lang]}</b>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default Register;
