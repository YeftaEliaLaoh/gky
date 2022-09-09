import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Panel,
} from "react-bootstrap";
import { l10n } from "../../constants/language";
import { ic_back, ic_inbox1 } from "../../assets/icons";
import { Link, useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "./LibraryCategory.css";
import { getHistory } from "../../config/api";
import { useAlert } from "react-alert";
import moment from "moment";

export default function HistoryLibrary() {
  const [lang, setLang] = useState("id");
  const [data, setData] = useState([]);
  const [startdate, setStartDate] = useState(moment().format("yyyy-MM-DD"));
  const [enddate, setEndDate] = useState(moment().format("yyyy-MM-DD"));
  const [token, setToken] = useState(null);
  const alert = useAlert();

  const doGetHistory = (token) => {
    console.log(startdate);
    getHistory(startdate, enddate, token)
      .then((res) => {
        if (res.data.status == "success") {
          console.log(res.data);
          setData(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert.error("Something went wrong");
      });
  };

  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    let token = localStorage.getItem("token");
    console.log(token);
    setLang(language);
    setToken(token);
    if (token != null) {
      doGetHistory(token);
    }
  }, []);

  let history = useHistory();
  return (
    <Row style={{ maxWidth: "320px", margin: '0 auto' }}>

      <Col xs={12} style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
        <a onClick={() => history.goBack()} style={{ height: 45 }}>
          <img src={ic_back} alt="back" className="ic_back" />
        </a>
        <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: 15 }}>{l10n.history[lang]}</span>
      </Col>
      <Col xs={12}>
   
        <br></br>
        <br></br>
        <Col md="auto" xs="auto">
          <div className="justify-content-center">

            <br></br>
            <div className="text-center">
              <input
                type="date"
                className="input_date"
                onChange={(event) => {
                  setStartDate(moment(event.target.value).format("yyyy-MM-DD"));
                  doGetHistory(token);
                }}
                value={startdate}
              ></input>
              -
              <input
                type="date"
                className="input_date"
                onChange={(event) => {
                  setEndDate(moment(event.target.value).format("yyyy-MM-DD"));
                  doGetHistory(token);
                }}
                value={enddate}
              ></input>
            </div>
          </div>
          <br></br>
          {data.map((item, nomor) => (
            
              <a
                key={'list-history-'+nomor}
                style={{ width: '100%', height: 200, textDecoration: "none", cursor: 'pointer'}}
                className="list-history-items"
                onClick={() => history.push("/detail_history", {id: item.booking_id,approveDate: item.approveddate})}
              >
                <div className="panel panel-default panelhead">
                  <div className="panel-heading text-center" style={{paddingTop:'10px'}}>
                    Peminjaman Buku {nomor + 1}
                  </div>
                  <div className="panel-body panelbody">
                    {" "}
                    <Table responsive="sm">
                      <tbody>
                        <tr>
                          <td>Status Peminjaman</td>
                          <td>:</td>
                          <td>{item.approveddate !== null ? "Sedang Dipinjam" : "Belum Diambil"}</td>
                        </tr>
                        <tr>
                          <td>Jumlah Buku</td>
                          <td>:</td>
                          <td>{item.total_buku}</td>
                        </tr>
                        <tr>
                          <td>Tanggal Peminjaman</td>
                          <td>:</td>
                          <td>{item.rent_date}</td>
                        </tr>
                        <tr>
                          <td>Tanggal Pengembalian</td>
                          <td>:</td>
                          <td>{item.returndate}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
                <br></br>
              </a>
            
          ))}
        </Col>
        </Col>
      </Row>
  );
}
