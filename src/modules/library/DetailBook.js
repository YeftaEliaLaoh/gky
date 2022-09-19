import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  FormControl,
  InputGroup,
  Modal,
  Carousel,
} from "react-bootstrap";
import { l10n } from "../../constants/language";
import { ic_back, ic_filter, ic_inbox1, ic_sortby } from "../../assets/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { img_gallery_2, book_1, book_2 } from "../../assets/images/images";
import { useAuth } from "../../auth/userAuth";
import "./LibraryCategory.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { margin, width } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useAlert } from "react-alert";
import { createCart, getItems } from "../../config/api";

export default function DetailBook() {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const images = [
    {
      imgPath: book_1,
    },
    {
      imgPath: book_1,
    },
    {
      imgPath: book_1,
    },
  ];
  const [lang, setLang] = useState("id");
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const [token, setToken] = useState(null);
  const [code, setCode] = useState("");
  const [data, setData] = useState({
    // id: 1,
    // barcode: "0401575444440",
    // kodelama: "CGA/0001A/00",
    // createddate: "2013-12-15 00:00:00",
    // updateddate: "2013-12-29 00:00:00",
    // idbook: 1,
    // idlocation: "1",
    // title: "",
    // isrent: "false",
    // is_wishlist: "false",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  let history = useHistory();
  let location = useLocation();
  let alert = useAlert();

  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    let token = localStorage.getItem("token");
    let code = localStorage.getItem("code");
    setLang(language);
    setToken(token);
    setCode(code);
    //console.log(code);
    if (location.state.id != null && token != null) {
      doGetItem(token, location.state.id);
    } else {
      history.push("/");
    }
  }, []);

  const doGetItem = (token, id) => {
    getItems(token, id)
      .then((res) => {
        if (res.data.status == "success") {
          console.log(res.data);
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const doRentBook = () => {
    alert.removeAll();
    createCart(data.id, token)
      .then((res) => {
        if (res.data.status == "success") {
          history.push("/cart_library");
        }
      })
      .catch((err) => {
        alert.show(l10n.failed_rent[lang]);
      });
  };

  const showalertsuccess = () => {
    alert.show(l10n.success_add_cart[lang], { timeout: 5000 });
  };

  const showalertfailed = () => {
    alert.show(l10n.failed_add_cart[lang], { timeout: 5000 });
  };

  const doAddCart = () => {
    alert.removeAll();
    createCart(data.id, token)
      .then((res) => {
        if (res.data.status == "success") {
          showalertsuccess();
        }
      })
      .catch((err) => {
        showalertfailed();
      });
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
            <span style={{ fontSize: 20 }}>{data.title}</span>
          </div>
        </Col>
      </Row>
      <Col>
        <Box sx={{ flexGrow: 1, justifyContent: "center" }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              height: 40,
              pl: 2,
              bgcolor: "background.default",
            }}
          ></Paper>
          
          
          <div className="text-center">
          {data.image ? (
            <Card.Img
            style={{ width: 300 }}
            src={data.image}
          ></Card.Img>
          ) : (
            <Card.Img
              style={{ width: 300 }}
              src={book_1}
            ></Card.Img>
          )
          
          }
            
          </div>
        </Box>
      </Col>
      <Row style={{ marginBottom: 80 }}>
        <Col xs="1" md="3" lg="3"></Col>
        <Col md="auto" xs="auto">
          <br />

          <h3>
            <b className="title_detail">{data.title}</b>
          </h3>
          <h4>({data.kodelama})</h4>
          {data.isrent == "false" ? (
            <li className="avaible">{l10n.available[lang]}</li>
          ) : (
            <li className="">{l10n.not_available[lang]}</li>
          )}
          {/* deskripsi di hide */}
          {/* <h3>
            <b className="title_detail">{l10n.description[lang]}</b>
          </h3>
          <h6>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </h6> */}
          <li>
            <b>{l10n.loan_time[lang]}</b>
          </li>
          <h6>{code.substring(0,3) === "002" ? 30 : 14} Hari</h6>
        </Col>
        <Col xs="1" md="2" lg="3"></Col>
      </Row>
      <Row
        style={{ position: "fixed", bottom: 20, width: "100%", left: "50%",paddingLeft:"20%",paddingRight:"20%",transform:"translateX(-47%)"}}
        className="row"
      >
        {/* <Col>
          <Button style={styles.buttonRent} onClick={() => doRentBook()}>
            {l10n.rent[lang]}
          </Button>
        </Col> */}
       <Button
            style={styles.buttonAddCart}
            onClick={() => doAddCart()}
            disabled={data.isrent == "true"}
          >
            {l10n.add_cart[lang]}
          </Button>
      </Row>
    </Container>
  );
}

const styles = {
  buttonRent: {
    width: "100%",
    borderRadius: 30,
    border: "solid",
    padding: 5,
    backgroundColor: "#FFFFF",
    fontWeight: "bold",
  },
  buttonAddCart: {
    width: "100%",
    height: "50px",
    borderRadius: 30,
    border: "solid",
    padding: 5,
    backgroundColor: "#FFFFF",
    fontWeight: "bold",
  },
};
