import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { l10n } from "../../constants/language";
import { ic_back, ic_inbox1 } from "../../assets/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { createCart, getItems, getTandaTerima } from "../../config/api";
import { book_1 } from "../../assets/images/images";
import { useAlert } from "react-alert";
import moment from "moment";
import { blueDark } from "../../constants/color";

export default function TandaTerima() {
  var Barcode = require("react-barcode");
  Barcode.defaultProps = {
    format: "CODE128",
    renderer: "svg",
    width: 2,
    height: 50,
    displayValue: true,
    fontOptions: "",
    font: "monospace",
    textAlign: "center",
    textPosition: "bottom",
    textMargin: 2,
    fontSize: 16,
    background: "#ffffff",
    lineColor: "#000000",
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  };

  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);
  const [code, setCode] = useState("");
  const [data, setData] = useState({
    receipt_id: "000",
    sesi: "",
    rent_date: "",
    status: "succes",
    returndate: "",
    total_buku: 0,
    books: [
      {
        title: "",
      },
    ],
  });
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
    console.log(code);
    console.log(location.state.id);
    if (location.state.id != null && token != null) {
      doGetTandaTrima(token, location.state.id);
    }
  }, []);

  const doGetTandaTrima = (token, id) => {
    getTandaTerima(id, token)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "success") {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
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
            <span style={{ fontSize: 20 }}>{l10n.rental[lang]}</span>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: 5 }}>
        <Col style={{ padding: 10 }}>
          <div>
            <div style={{ color: blueDark, fontSize: 15, fontWeight: "bold" }}>
              ID
            </div>
            <Row
              style={{ justifyContent: "space-between", alignItems: "stretch" }}
            >
              <Col style={{ textAlign: "start" }}>{data.receipt_id}</Col>
            </Row>
          </div>
          <div>
            <div style={{ color: blueDark, fontSize: 15, fontWeight: "bold" }}>
              {l10n.jadwal_pengembalian[lang]}
            </div>
            <Row
              style={{ justifyContent: "space-between", alignItems: "stretch" }}
            >
              <Col style={{ textAlign: "start" }}>{data.sesi}</Col>
            </Row>
          </div>
          <div>
            <div style={{ color: blueDark, fontSize: 15, fontWeight: "bold" }}>
              {l10n.buku[lang]}
            </div>
            {data.books.map((book) => (
              <Row
                style={{
                  justifyContent: "space-between",
                  alignItems: "stretch",
                }}
              >
                <Col style={{ textAlign: "start" }}>{book.title}</Col>
              </Row>
            ))}
          </div>
          <div>
            <div style={{ color: blueDark, fontSize: 15, fontWeight: "bold" }}>
              {l10n.durasi_peminjaman[lang]}
            </div>
            {data.books.map((item, index) => (
              <Row
                style={{
                  justifyContent: "space-between",
                  alignItems: "stretch",
                }}
              >
                <Col style={{ textAlign: "start" }}>{item.title}</Col>
                <Col style={{ textAlign: "end" }}>{code.substring(0,3) === "002" ? 30 : 14 } {l10n.days[lang]}</Col>
              </Row>
            ))}
          </div>
          <div>
            <div style={{ color: blueDark, fontSize: 15, fontWeight: "bold" }}>
              {l10n.loan_date[lang]}
            </div>
            <Row
              style={{ justifyContent: "space-between", alignItems: "stretch" }}
            >
              <Col style={{ textAlign: "start" }}>{l10n.loan_date[lang]}</Col>
              <Col style={{ textAlign: "end" }}>
                {moment().format("DD MMMM YYYY")}
              </Col>
            </Row>
          </div>
          <div>
            <div style={{ color: blueDark, fontSize: 15, fontWeight: "bold" }}>
              {l10n.tanggal_pengambilan[lang]}
            </div>
            {data.books.map((item, index) => (
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
      <Row>
        <Col className="center" style={{ textAlign: "center" }}>
          <div>
            <Barcode value={data.receipt_id} className="Barcode" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="center" style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 20 }}>
            <h2>{l10n.text_tanda_trima[lang]}</h2>
          </div>
          <Button
            style={styles.buttonRent}
            onClick={() => history.replace("/")}
          >
            {l10n.done[lang]}
          </Button>
        </Col>
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
    borderRadius: 30,
    color: "#3059E1",
    borderColor: "#3059E1",
    border: "solid",
    padding: 5,
    backgroundColor: "#FFFFFF",
    fontWeight: "bold",
  },
};
