import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Fab, Action } from "react-tiny-fab";

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
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { l10n } from "../../constants/language";
import {
  img_library,
  img_colportage,
  img_room_rental,
} from "../../assets/images/images";

import { blueDark, yellow } from "../../constants/color";
import { ic_inbox } from "../../assets/icons";
import { getEditProfile, getLocations } from "../../config/api";
import { useAlert } from "react-alert";

const HomePage = () => {
  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [showLocationLibrary, setShowLocationLibrary] = useState(false);
  const [locations, setLocations] = useState([]);
  const alert = useAlert();
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    let takeToken = localStorage.getItem("token");
    changeLanguage(language);
    setToken(takeToken);
    if (takeToken != null) {
      getProfile(takeToken);
      doGetLocations(takeToken);
    } else {
      logout();
    }
  }, []);

  const getProfile = (tokenData) => {
    getEditProfile(tokenData)
      .then((response) => {

        if (response.data.status == "success") {
          if (response.data.token != null) {
            localStorage.setItem(
              "profile",
              JSON.stringify(response.data.token)
            );
            setName(response.data.token.name);
          } else {
            logout();
          }
        }
      })
      .catch((err) => {
        console.log("ERROR getProfile");
        console.log(err.response);
      });
  };

  const doGetLocations = (tokenData) => {
    getLocations(tokenData)
      .then((response) => {
        if (response.data.status == "success") {
          setLocations(response.data.data);
        }
      })
      .catch((err) => {
        console.log("ERROR doGetLocations");
        console.log(err.response);
      });
  };

  const changeLanguage = (language) => {
    setLang(language);
    localStorage.setItem("lang", language);
  };

  const toPage = (page, data = {}) => {
    history.push(page, data);
  };

  const selectLocationLibrary = () => {
    if (token == null) {
      alert.error(l10n.please_login[lang], { timeout: 5000 });
    } else {
      handleShowModalLibrary();
    }
  };

  const handleCloseModalLibrary = () => setShowLocationLibrary(false);
  const handleShowModalLibrary = () => setShowLocationLibrary(true);

  const LocationList = (props) => {
    return (
      <>
        {locations.map((location, i) => (
          <div onClick={() => toPage(props.path, { id: location.id })} key={'list-loc-'+i}>
            <h3>{location.name}</h3>
            <hr />
          </div>
        ))}
      </>
    );
  };

  return (
    <Container fluid="sm">
      {/* Modal Library */}
      <Modal
        size="sm"
        show={showLocationLibrary}
        onHide={handleCloseModalLibrary}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: yellow }}>
          <Modal.Title>{l10n.select_location[lang]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {token != null && <LocationList path={"/category"} />}
        </Modal.Body>
 
      </Modal>
    
      <Row className="justify-content-center">
        <div className="headerlogo">
          <div className="logogky">
            <img src={LogoGky} alt="logo" style={{maxWidth:'50px', maxHeight:'50px'}} />
          </div>
          

          {token != null ? (
            <>
              <>
                {" "}
                <label className="labelhome">
                  <b style={{ color: blueDark }} className="labelhello">
                    {l10n.greatingHome[lang] + " "}
                  </b>{" "}
                  {name}
                </label>
              </>
            </>
          ) : (
            <>
              <Link
                className="link_login_register"
                to="/login"
                style={{
                  color: blueDark,
                  fontSize: "large",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                {l10n.login[lang]}
              </Link>
              {" / "}
              <Link
                to="/register"
                style={{
                  color: blueDark,
                  fontSize: "large",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                {l10n.register[lang]}
              </Link>
            </>
          )}
        </div>
        <Col md="auto" xs="auto" className="flex flex-col">
          <div
            
            className="listLiblary justify-content-center mt-2"
          >
            <div
              onClick={() => selectLocationLibrary()}
              style={{
                backgroundImage: `url(${img_library})`,
              }}
              className="bgLibrary"
            >
              <div className="buttonLibrary justify-content-center">
                {l10n.library[lang]}
              </div>
            </div>
          </div>
          <br></br>
          {/* <div className="listLiblary justify-content-center disable">
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
          </div>
          <br></br>
          <div className="listLiblary justify-content-center disable">
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
          </div> */}
          {token != null && (
            <Fab
              // alwaysShowTitle={true}
              onClick={() => history.push("/inbox")}
              icon={<img src={ic_inbox} className="icon-inbox" />}
            ></Fab>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
