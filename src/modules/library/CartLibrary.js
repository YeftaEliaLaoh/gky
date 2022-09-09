import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { l10n } from "../../constants/language";
import { ic_back, ic_inbox1, ic_trash } from "../../assets/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { book_1 } from "../../assets/images/images";
import { blueDark } from "../../constants/color";
import { useAlert } from "react-alert";
import { bookRent, getCarts, doDeleteCart } from "../../config/api";
import moment from "moment";

export default function CartLibrary() {
  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [sesi_id, set_sesi_id] = useState(1);
  const [disableBtn, setDisableBtn] = useState(false);
  let history = useHistory();
  let location = useLocation();
  let alert = useAlert();
  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    let token = localStorage.getItem("token");
    setLang(language);
    setToken(token);
    if (token != null) {
      doGetCart(token);
    }
  }, []);

  const doGetCart = (token) => {
    getCarts(token)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "success") {
          setData(res.data.data);
          setTotal(res.data.total);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const doRentBook = () => {
    alert.removeAll();
    bookRent(sesi_id, token)
      .then((res) => {
        if (res.data.status == "success") {
          alert.success(res.data.status, { timeout: 5000 });
          history.push("/tanda_terima", { id: res.data.message.booking_id });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.status == "success") {
          alert.success(err.response.data.status, { timeout: 5000 });
          history.push("/tanda_terima", {id: err.response.data.message.booking_id});
        } else {
          alert.error(
            l10n.failed_rent[lang] + " " + err.response.data.message,
            { timeout: 7000 }
          );
        }
      });
  };

  const DeleteCart = (id) => {
    setDisableBtn(true);
    alert.removeAll();
    console.log("masuk delete id " + id);
    doDeleteCart(id, token)
      .then((res) => {
        console.log(JSON.stringify(res));
        console.log(res.data);
        if (res.data.status == "success") {
          showalertdelete();
          doGetCart(token);
        } else {
          faileddeletebook();
        }
        setDisableBtn(false);
      })
      .catch((err) => {
        faileddeletebook();
        setDisableBtn(false);
        console.log(err.response);
      });
  };

  const showalertdelete = () => {
    alert.success(l10n.success_delete_book[lang], { timeout: 5000 });
  };

  const faileddeletebook = () => {
    alert.show(l10n.failed_delete_book[lang], { timeout: 5000 });
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
            <span style={{ fontSize: 20 }}>{l10n.cart[lang]}</span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md="auto" xs="auto">
          <List
            sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
          >
            {data.map((item) => (
              <ListItem alignItems="flex-start">
                <ListItemAvatar style={{width: "80px", height: "80px", overflow: "hidden"}}>
                  <img src={item.image || book_1} width={80} />
                </ListItemAvatar>
                <List alignItems="flex-start" style={{ marginLeft: 5 }}>
                  <h4 style={{ color: blueDark, fontWeight: "bold" }}>
                    {item.title}
                  </h4>
                  <div>({item.kodelama})</div>
                </List>
                <a 
                  onClick={() => !disableBtn ? DeleteCart(item.cart_id) : null } >
                  <img
                    src={ic_trash}
                    width={30}
                    style={{ position: "absolute", left: 300, top:50 }}
                  />
                </a>
              </ListItem>
            ))}
          </List>
        </Col>
      </Row>
      <Row style={{ marginBottom: 80 }}>
        <Col>
          <div>
            <h4 style={{ color: blueDark, fontWeight: "bold" }}>
              Jadwal Pengambilan
            </h4>
            <select
              style={{ border: "none", width: "100%" }}
              onChange={(event) => set_sesi_id(event.target.value)}
            >
              <option value={1}>Sesi 1 ( 08:00 - 12.00 )</option>
              <option value={2}>Sesi 2 ( 17.00 - 19.00 )</option>
            </select>
            <hr />
          </div>
          <div>
            <h4 style={{ color: blueDark, fontWeight: "bold" }}>
              Info Peminjaman
            </h4>
            <Row
              style={{ justifyContent: "space-between", alignItems: "stretch" }}
            >
              <Col style={{ textAlign: "start" }}> Total Barang</Col>
              <Col style={{ textAlign: "end" }}>{total} Pcs</Col>
            </Row>
          </div>
          <div>
            <h4 style={{ color: blueDark, fontWeight: "bold" }}>
              Durasi Peminjaman
            </h4>
            {data.map((item, index) => (
              <Row
                style={{
                  justifyContent: "space-between",
                  alignItems: "stretch",
                }}
              >
                <Col style={{ textAlign: "start" }}>{item.title}</Col>
                <Col style={{ textAlign: "end" }}>14 Hari</Col>
              </Row>
            ))}
          </div>
          <div>
            <h4 style={{ color: blueDark, fontWeight: "bold" }}>
              Tanggal Peminjaman
            </h4>
            <Row
              style={{ justifyContent: "space-between", alignItems: "stretch" }}
            >
              <Col style={{ textAlign: "start" }}>Tanggal Peminjaman</Col>
              <Col style={{ textAlign: "end" }}>
                {moment().format("DD MMMM YYYY")}
              </Col>
            </Row>
          </div>
          <div>
            <h4 style={{ color: blueDark, fontWeight: "bold" }}>
              Tanggal Pengambilan
            </h4>
            {data.map((item, index) => (
              <Row
                style={{
                  justifyContent: "space-between",
                  alignItems: "stretch",
                }}
              >
                <Col style={{ textAlign: "start" }}>{item.title}</Col>
                <Col style={{ textAlign: "end" }}>
                  {moment(moment().day(7)).format("DD MMMM YYYY")}
                </Col>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    
     <Row
        style={{ position: "fixed", bottom: 20, width: "100%", left: "50%",paddingLeft:"20%",paddingRight:"20%",transform:"translateX(-47%)"}}
        className="row"
      >
         <Button
            style={
              {
                width: "100%",
                height: "50px",
                borderRadius: 30,
                border: "solid",
                padding: 5,
                backgroundColor: "#FFFFF",
                fontWeight: "bold",
              }
            }
            onClick={() => doRentBook()}
            disabled={data.isrent == "true"}
          >
            {l10n.rent[lang]}
          </Button>

      </Row>
    </Container>
  );
}
