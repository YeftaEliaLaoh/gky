import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { l10n } from "../../constants/language";
import { ic_back } from "../../assets/icons";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useAuth } from "../../auth/userAuth";
import "./Register.css";
import { verifyUserOTP } from "../../config/api";
import { useAlert } from "react-alert";


export default function OtpRegister() {
  const [lang, setLang] = useState("id");
  const [otpregister, setotpregister] = useState("");
  const handlechange = (otpregister) => {
    setotpregister(otpregister);
  };
  let history = useHistory();
  let alert = useAlert();

  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    setLang(language);
  }, []);

  const verifyOtp = () => {
    alert.removeAll()
    if (otpregister.length == 0) {
      alert.show(l10n.all_must_required[lang])
      return;
    }
    verifyUserOTP(otpregister).then((response) => {
      console.log(response.data)
      if (response.data.status == "success") {
        alert.show(response.data.status)
        localStorage.setItem('token', response.data.token);
        history.replace('/')
        window.location.reload();
      }
    }).catch((err) => {
      console.log(err.response)
      let message = err.response.data.message;
      alert.show(message)
    })
  }
  return (
    <Row style={{ maxWidth: "320px", margin: '0 auto' }}>

      <Col xs={12} style={{display:'flex', flexDirection: "row",alignItems: "center"}}>

        <Link to="/" style={{height:45}}>
          <img src={ic_back} alt="back" className="ic_back" />
        </Link>
        <span style={{fontSize:"16px",fontWeight:"bold", marginLeft:15}}>{l10n.register[lang]}</span>

      </Col>

      <Col xs={12}>
        <br />
        <br />
        <div className="titleInput">
          <span>{l10n.kode_otp[lang]}</span>
          <span className="Input_otp">{l10n.input_otp[lang]}</span>
        </div>
        <br></br>
        <div className="otpContainer">
          <OtpInput
            className="otpInput"
            inputStyle={{}}
            value={otpregister}
            onChange={(val) => handlechange(val)}
            numInputs={6}
            separator={<span> </span>}
            isInputNum={true}
          />
        </div>
        <br />
        <div className="justify-content-center align-items-center align-items-center bottomArea">
          <button className="btnNext" onClick={() => verifyOtp()}>
            <div>{l10n.register[lang]}</div>
          </button>
          <br />
          <br />
          <div>
            {l10n.not_have_account[lang]}
            <Link to={'/reg'} className="link_register">
              <b>{"" + l10n.register[lang]}</b>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
}
