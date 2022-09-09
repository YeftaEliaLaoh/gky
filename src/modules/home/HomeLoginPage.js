import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BigScreen,
  DesktopOrLaptop,
  Portrait,
  Retina,
  TabletOrMobile,
  TabletOrMobileDevice,
} from "../../constants/display";
import LogoGky from "../../assets/LogoGKY.png";
import "./HomePage.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { l10n } from "../../constants/language";
import {
  img_library,
  img_colportage,
  img_room_rental,
} from "../../assets/images/images";

import {blueDark} from '../../constants/color'

const HomeLoginPage = () => {
  const [lang, setLang] = useState("id");
  const [name, setName] = useState("Aurel")

  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    changeLanguage(language);
  },[]);

  const changeLanguage = (language) => {
    setLang(language);
    localStorage.setItem("lang", language);
  };

  return (
    <Container fluid="sm">
      <Row className="justify-content-center align-items-center header">
        <Col xs="3" md="2" lg="3">
          <img src={LogoGky} alt="logo" className="logogky" />
        </Col>
        <Col md="auto" xs="auto">
          <div className="greatingHome" style={{color: blueDark}} >
            {l10n.greatingHome[lang] + ' '}
            <b className="nameUser" >
              {name}
            </b>
          </div>
        </Col>
        <Col xs="3" md="2" lg="3"></Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="2" md="2" lg="2"></Col>
        <Col md="auto" xs="auto">
          <Link
            to="/library_category"
            className="library_link justify-content-center"
          >
            <div
              style={{
                backgroundImage: `url(${img_library})`,
              }}
              className="bgLibrary"
            >
              <div className="buttonLibrary justify-content-center">
                {l10n.library[lang]}
              </div>
            </div>
          </Link>
          <br></br>
          <Link
            to="/colportage"
            className="library_link justify-content-center"
          >
            <div
              style={{
                backgroundImage: `url(${img_colportage})`,
              }}
              className="bgLibrary"
            >
              <div className="buttonLibrary justify-content-center">
                {l10n.colportage[lang]}
              </div>
            </div>
          </Link>
          <br></br>
          <Link
            to="/room_rental"
            className="library_link justify-content-center"
          >
            <div
              style={{
                backgroundImage: `url(${img_room_rental})`,
              }}
              className="bgLibrary"
            >
              <div className="buttonLibrary justify-content-center">
                {l10n.room_rental[lang]}
              </div>
            </div>
          </Link>
        </Col>
        <Col xs="2" md="2" lg="2"></Col>

        <a href="/inbox" class="floatingInbox"><img src="icons8-phone.svg" class="icon-menu" alt=""/></a>
      </Row>
    </Container>
  );
};

export default HomeLoginPage;
