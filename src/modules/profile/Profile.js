import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { ic_back, ic_edit, ic_logo } from "../../assets/icons";
import { img_card, img_photo } from "../../assets/images/images";
import { l10n } from "../../constants/language";
import "./Profile.css";
import { checkMember, getEditProfile, checkProfile, doExtendMembership } from "../../config/api";
import { blueDark, blueLight } from "../../constants/color";
import { useAlert } from "react-alert";

export default function Profile() {
  const Barcode = require("react-barcode");
  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);
  const [data, setData] = useState({});
  const [isMember, setIsMember] = useState(false);
  const [barcode, setBarcode] = useState('null');
  const [dateMember, setDateMember] = useState('-');

  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.replace("/");
  };

  const changeLanguage = (language) => {
    setLang(language);

    localStorage.setItem("lang", language);
  };

  const alert = useAlert();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token != null) {
      getProfile(token);
      getIsMember(token);
      getIsProfile(token);
      setToken(token)
    } else {
      logout();
    }
    let language = localStorage.getItem("lang");
    changeLanguage(language);
  }, []);

  const getProfile = (token) => {
    getEditProfile(token)
      .then((response) => {
        if ((response.data.status = "success")) {
          setData(response.data.token);
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert.info(err.response.data.message, { timeout: 5000 });
        }
      });
  };

  const getIsMember = (token) => {
    checkMember(token)
      .then((res) => {
        if (res.data.status == "allowed") {
          setIsMember(false);
        }
      })
      .catch((err) => {
        if (err.response.data.status == "denied") {
          setIsMember(true);
        }
        if (err.response.data.message) {
          alert.info(err.response.data.message, { timeout: 5000 });
        }
      });
  };

  const getIsProfile = (token) => {
    checkProfile(token)
      .then((res) => {
        if (res.data?.data?.code) {
          setBarcode(res.data?.data?.code)
          setDateMember(res.data?.data?.memberend)
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert.info(err.response.data.message, { timeout: 5000 });
        }
      });
  };

  const beginExtendMembership = (token) => {
    doExtendMembership(token)
      .then((response) => {

        if (response.data.message) {
          alert.info(l10n.success[lang], { timeout: 5000 });
          setTimeout(() => {
            history.goBack();
          },2000)
        } else {
          alert.info(l10n.something_wrong, { timeout: 5000 });
        }

      })
      .catch((err) => {
        alert.info(l10n.something_wrong[lang], { timeout: 5000 });

      });
  };

  Barcode.defaultProps = {
    format: "CODE128",
    renderer: "svg",
    width: 1,
    height: 20,
    displayValue: true,
    fontOptions: "",
    font: "monospace",
    textAlign: "center",
    textPosition: "bottom",
    textMargin: 2,
    fontSize: 10,
    background: "#ffffff",
    lineColor: "#000000",
    marginTop: 35,
    marginLeft: 10,
    marginRight: 10,
  };
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
            <span style={{ fontSize: 20 }}>{l10n.Profile[lang]}</span>
          </div>
        </Col>
      </Row>
      <Row style={{ Width: 300 }}>
        <Col className="d-flex justify-content-around">
          <Row style={{ marginLeft: 0, marginRight: 0 }} className="d-flex justify-content-around">
            <div className="d-flex flex-column">
              <br />
              <br />
              <div className="justify-content-center align-items-center bottomArea">
                <div className="container_profile">
                  <img
                    src={ic_logo}
                    height={150}
                    width={150}
                    style={{ borderRadius: 100 }}
                  />
                  <a
                    className="edit_icon"
                    onClick={() => history.push("/edit_photo")}
                  >
                    <img src={ic_edit} class="icon_edit" />
                  </a>
                </div>
              </div>
              <br />
              <div className="justify-content-center align-items-center bottomArea d-flex flex-column">
                {l10n.greatingHome[lang]}
                <b> {data.name}</b>
                <br></br>
                {!isMember ? (
                  <>
                    <b>Non Membership</b>
                    <br></br>
                    <br></br>
                    {/* startcardmembership */}

                    <button
                      style={{
                        padding: 5,
                        backgroundColor: blueLight,
                        border: "none",
                        borderRadius: 30,
                        color: "white",
                        fontWeight: "bold",
                        paddingRight: 10,
                        paddingLeft: 10,
                      }}
                      onClick={() => history.push("/daftar_member")}
                    >
                      <div>{l10n.regis_membership[lang]}</div>
                    </button>
                    <div
                      style={{
                        width: 290,
                        marginBottom: 20,
                      }}
                    ></div>
                    <></>
                    <br />
                    <br />
                  </>
                ) : (
                  <>
                    <b>S/d {dateMember}</b>
                    <div>
                      <br></br>
                      <div className="circle_logo">
                        <img
                          src={ic_logo}
                          style={{
                            width: 30,
                            position: "relative",
                            marginTop: 7,
                            marginLeft: 1,
                          }}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            marginTop: 10,
                            position: "absolute",
                            marginLeft: 89,
                            width: 98,
                            textAlign: "justify",
                            color: blueDark,
                            fontFamily: "sans-serif",
                            fontSize: 20,
                          }}
                        >
                          Library
                        </p>
                        <p
                          style={{
                            marginTop: 35,
                            position: "absolute",
                            marginLeft: 89,
                            textAlign: "justify",
                            color: blueDark,
                            fontFamily: "sans-serif",
                            fontSize: 20,
                          }}
                        >
                          Member Card
                        </p>
                        <div
                          style={{
                            position: "absolute",
                            width: 250,
                            marginTop: 80,
                            marginLeft: 20,
                          }}
                        >
                          <label>
                            {" "}
                            <b
                              style={{
                                color: blueLight,
                                fontSize: 16,
                              }}
                            >
                              {" "}
                              {data.name}
                            </b>
                          </label>
                          <br></br>
                          {
                            barcode !== 'null' && (
                              <Barcode
                                value={barcode}
                                className="Barcode"
                              />
                            )
                          }

                        </div>

                        <img
                          src={img_card}
                          style={{
                            width: 290,
                            marginBottom: 20,
                          }}
                        />
                      </div>
                    </div>
                    {/* endcardmembership */}

                    <button
                      style={{
                        padding: 5,
                        backgroundColor: blueLight,
                        border: "none",
                        borderRadius: 30,
                        color: "white",
                        fontWeight: "bold",
                        paddingRight: 10,
                        paddingLeft: 10,
                      }}
                      onClick={() => beginExtendMembership(token)}
                    >
                      <div>{l10n.renew_membership[lang]}</div>
                    </button>
                  </>
                )}
              </div>
            </div>
            <br></br>
            <br></br>
            <div>
              <br></br>
              <a
                className="profile_link"
                onClick={() => history.push("/edit_profile")}
              >
                <p>
                  <b>{l10n.edit_profile[lang]}</b>
                </p>
              </a>
              <hr></hr>
              <a
                className="profile_link"
                onClick={() => history.push("/edit_password")}
              >
                <p>
                  <b>{l10n.change_password[lang]}</b>
                </p>
              </a>
              <hr></hr>
              <a
                className="profile_link"
                onClick={() => history.push("/ganti_bahasa")}
              >
                <p>
                  <b>{l10n.change_language[lang]}</b>
                </p>
              </a>
              <hr></hr>
            </div>
            <Col xs="1" md="2" lg="3"></Col>
          </Row>
        </Col>
      </Row>
      <div className="justify-content-center align-items-center bottomArea">
        <button
          onClick={() => logout()}
          className="btn "
          style={{ width: "100px", fontSize: 15, fontWeight: "bold", marginBottom: "15px" }}
        >
          Log Out
        </button>
      </div>
    </Container>
  );
}
