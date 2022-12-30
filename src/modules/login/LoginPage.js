import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { l10n } from "../../constants/language";
import { ic_back } from "../../assets/icons";
import { Link } from "react-router-dom";

import { useAuth } from "../../auth/userAuth";
import "./LoginPage.css";
import { postLogin } from "../../config/api";
import { getMemberKelas } from "../../config/api";
import { useAlert } from "react-alert";

export default function LoginPage() {
  const [lang, setLang] = useState("id");

  const [phone_number, set_phone_number] = useState("");
  const [password, set_password] = useState("")
  const [view_password, set_view_password] = useState(false)

  const history = useHistory();
  const alert = useAlert();

  let login = () => {
    if (phone_number.length == 0) {
      alert.show(l10n.input_phone_number_required[lang]);
      alert.removeAll();
      return;
    }

    if (password.length == 0) {
      alert.show(l10n.input_password_required[lang]);
      alert.removeAll();
      return;
    }

    postLogin(phone_number, password)
      .then((response) => {
        //console.log(response.data.status);
        if (response.data.status === "success") {
          localStorage.setItem('token', response.data.token);
          getMemberKelas(response.data.token)
            .then((responseMember) => {
              //console.log(responseMember.data.status);
              if (responseMember.data.status === "success") {
                localStorage.setItem('code', responseMember.data.code);
                console.log(responseMember.data.code);
                alert.show(responseMember.data.status)
                history.replace('/')
                window.location.reload();
              }
         })
         .catch((err) => {
           console.log(err.response);
           alert.show(err.response.data.message);
         });
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert.show(err.response.data.message);
      });
    alert.removeAll();
  };

  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    setLang(language);
  }, []);

  return (
    <Row style={{maxWidth: "320px", margin:'0 auto'}}>

      <Col xs={12} style={{display:'flex', flexDirection: "row",alignItems: "center"}}>
        <Link to="/" style={{height:45}}>
          <img src={ic_back} alt="back" className="ic_back" />
        </Link>
        <span style={{fontSize:"16px",fontWeight:"bold", marginLeft:15}}>{l10n.login[lang]}</span>
      </Col>

      <Col xs={12}>
        <br />
        <br />
        <div className="titleInput">{l10n.phone_number[lang]}</div>
        <div className="inputPhone">
          <input
            type={"text"}
            placeholder={l10n.input_phone_number[lang]}
            onChange={(event) => set_phone_number(event.target.value)}
          />
          {/* <hr/> */}
        </div>
        <div className="titleInput mt-4">{l10n.password[lang]}</div>
        <div className="inputPhone" style={{position:'relative'}}>
          <input
            type={view_password ? 'text' : 'password'}
            placeholder={l10n.input_password[lang]}
            onChange={(event) => set_password(event.target.value)}
          />
          <span style={{position:'absolute', top:0, right: 5, cursor: 'pointer'}} onClick={() => set_view_password(!view_password)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg>
          </span>
        </div>
        <br />
        <br />
        <div className="justify-content-center align-items-center bottomArea">
          <button className="btnNext" onClick={() => login()}>
            <div>{l10n.next[lang]}</div>
          </button>
          <br />
          <br />
          <div>
            {l10n.not_have_account[lang]}
            <Link to={"/register"} className="link_register">
              <b>{" " + l10n.register[lang]}</b>
            </Link>
          </div>
          <div style={{ marginTop: 20 }}>
            <Link to={"/forgot_password"} className="link_register">
              <b>{" " + l10n.forgot_password[lang] + " ?"}</b>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
}
