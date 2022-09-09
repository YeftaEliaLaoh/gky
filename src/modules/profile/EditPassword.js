import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { l10n } from "../../constants/language";
import { ic_back } from "../../assets/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Profile.css";
import { getEditProfile, doChangePassword } from "../../config/api";
import { useAlert } from "react-alert";

export default function EditPassword() {
  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);
  const [email, set_email] = useState("");
  const [phone_number, setPhone] = useState("")
  const [data, setData] = useState({});
  const [name, setName] = useState("");

  const [new_password, set_new_password] = useState("");
  const [current_password, set_current_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");

  const [view_current_password, set_view_current_password] = useState(false)
  const [view_new_password, set_view_new_password] = useState(false)
  const [view_confirm_password, set_view_confirm_password] = useState(false)

  let history = useHistory();
  let location = useLocation();
  const alert = useAlert();
  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    let token = localStorage.getItem("token");
    setLang(language);
    setToken(token);
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    history.replace("/");
    // window.location.reload();
  };

  const changeLanguage = (language) => {
    setLang(language);

    localStorage.setItem("lang", language);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token != null) {
      getProfile(token);
    } else {
      logout();
    }
    let language = localStorage.getItem("lang");
    changeLanguage(language);
  }, []);

  const getProfile = (token) => {
    getEditProfile(token)
      .then((response) => {
        console.log(response.data);
        if ((response.data.status = "success")) {
          // setData(response.data.token);
          let data = response.data.token;
          set_email(data.email);
          setPhone(data.phone_number);
          setName(data.name);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const update = () => {
    let dataPassword = {
      password:current_password,
      new_password: new_password,
      new_password_confirmation: confirm_password,
    };

    if (current_password == "") {
      return alert.error(l10n.password_current_required[lang], { timeout: 2000 });
    } else if (new_password == ""){
      return alert.error(l10n.new_password_required[lang], { timeout: 2000 });
    } else if (new_password !== confirm_password){
      return alert.error(l10n.password_not_match[lang], { timeout: 2000 });
    }

    doChangePassword(dataPassword,token)
      .then((response) => {
        console.log(response.data);
        if (response.data.message) {
          alert.info(l10n.success[lang], { timeout: 2000 });
          setTimeout(() => {
            history.goBack();
          },2000)
        } else {
          alert.info(l10n.something_wrong, { timeout: 2000 });
        }
      })

      .catch((err) => {
        if(err.message){
          alert.error(l10n.password_current_failed[lang], { timeout: 2000 });
        } else {
          alert.info(l10n.something_wrong[lang], { timeout: 2000 });
        }
      });
  };

  return (
    <Row style={{maxWidth: "320px", margin:'0 auto'}}>

      <Col xs={12} style={{display:'flex', flexDirection: "row",alignItems: "center"}}>
        <Link to="/" style={{height:45}}>
          <img src={ic_back} alt="back" className="ic_back" />
        </Link>
        <span style={{fontSize:"16px",fontWeight:"bold", marginLeft:15}}>{l10n.Profile[lang]}</span>
      </Col>

      <Col xs={12}>
          <br />
          <div className="titleInput">{l10n.password_current[lang]}</div>
          <div className="inputPhone" style={{position:'relative'}}>
            <input
              type={view_current_password ? 'text' : 'password'}
              placeholder={l10n.password_current[lang]}
              value={current_password}
              onChange={(event) => set_current_password(event.target.value)}
            />
            <span style={{position:'absolute', top:0, right: 5, cursor: 'pointer'}} onClick={() => set_view_current_password(!view_current_password)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg>
            </span>
          </div>
          <br />
          <div className="titleInput">{l10n.password_new[lang]}</div>
          <div className="inputPhone" style={{position:'relative'}}>
            <input
              type={view_new_password ? 'text' : 'password'}
              placeholder={l10n.password_new[lang]}
              value={new_password}
              onChange={(event) => set_new_password(event.target.value)}
            />
            <span style={{position:'absolute', top:0, right: 5, cursor: 'pointer'}} onClick={() => set_view_new_password(!view_new_password)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg>
            </span>
          </div>
          <br />
          <div className="titleInput">{l10n.password_confirmation[lang]}</div>
          <div className="inputPhone" style={{position:'relative'}}>
            <input
              type={view_confirm_password ? 'text' : 'password'}
              placeholder={l10n.password_confirmation[lang]}
              value={confirm_password}
              onChange={(event) => set_confirm_password(event.target.value)}
            />
            <span style={{position:'absolute', top:0, right: 5, cursor: 'pointer'}} onClick={() => set_view_confirm_password(!view_confirm_password)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg>
            </span>
          </div>
          <br />
          <br />
          <br />
          <div className="justify-content-center align-items-center bottomArea">
            <button
              variant="primary"
              className="btnNext"
              onClick={() => update()}
            >
              <div>{l10n.save[lang]}</div>
            </button>
            <br />
            <br />
          </div>
        </Col>
      </Row>
  );
}
