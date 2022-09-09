import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { l10n } from "../../constants/language";
import { ic_back } from "../../assets/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Profile.css";
import { getEditProfile, doEditProfile } from "../../config/api";
import { useAlert } from "react-alert";

export default function EditProfile() {
  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);
  const [email, set_email] = useState("");
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("");

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
    let data = {
      name,
      phone_number,
      email,
    };
    console.log(JSON.stringify(data));
    if (name == "" || phone_number == "" || email == "") {
      return alert.error(l10n.all_must_required[lang], { timeout: 2000 });
    }

    doEditProfile(name, email, phone_number, token)
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "Profile updated, please replace token") {
          alert.info(l10n.success[lang], { timeout: 2000 });
          localStorage.setItem("token", response.data.token)
          setTimeout(() => {
            history.goBack();
          },2000)
        } else {
          alert.info(l10n.something_wrong, { timeout: 2000 });
        }
      })

      .catch((err) => {
        if (err.response.data.status != null) {
          alert.error(err.response.data.message, { timeout: 2000 });
        } else {
          alert.info(l10n.something_wrong, { timeout: 2000 });
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
          <div className="titleInput">{l10n.full_name[lang]}</div>
          <div className="inputName">
            <input
              type={"text"}
              placeholder={l10n.full_name[lang]}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <br />
          <div className="titleInput">{l10n.phone_number[lang]}</div>
          <div className="inputPhone">
            <input
              type={"text"}
              placeholder={l10n.input_phone_number[lang]}
              value={phone_number}
              disabled
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <br />
          <div className="titleInput">{l10n.email[lang]}</div>
          <div className="inputEmail">
            <input
              type={"text"}
              value={email}
              disabled
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
