import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { l10n } from "../../constants/language";
import { ic_back, ic_copy } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { softRed } from "../../constants/color";

const BayarMember = () => {
    const [lang, setLang] = useState("id");
    const [date, setDate] = useState("20 Desember 2022 17 : 50 : 00")
    const [no_va, set_no_va] = useState("8291217612791972891")
    let history = useHistory();
    let location = useLocation();
    const alert = useAlert();


    useEffect(() => {
        let language = localStorage.getItem("lang") || "id";
        setLang(language);

        if(location.state?.fromDaftarMember === undefined) {
            history.push('/')
        }
    }, []);


    return (
        <Container>
            <Row className="header">
                <Col md="auto" xs="auto">
                    <div style={{ justifyContent: "flex-start" }}>
                        <a onClick={() => history.push('/')}>
                            <img src={ic_back} alt="back" style={{ width: 25, position: "relative", marginRight: 10, marginTop: -5 }} />
                        </a>
                        <span style={{ fontSize: 20 }}>{l10n.pembayaran[lang]}</span>
                    </div>
                </Col>
            </Row><br />
            <br/>
            <Row>
                <Col className="center" style={{display:'flex',alignItems: "center", justifyContent: "center",height: "80vh"}}>
                    <div className="justify-content-center align-items-center bottomArea">
                        <b>Silakan Mengunjungi</b><br/>
                        <b>Perpustakaan untuk Melakukan</b><br/>
                        <b>Pembayaran dan Aktivasi Member</b>
                    </div>
                    {/* <div className="justify-content-center align-items-center bottomArea">
                        <button
                            variant="primary"
                            className="btnNext"
                            // onClick={() => history.push("/tanda_terima_member")}
                            onClick={() => history.push("/inbox")}
                        >
                            <div>{l10n.lihat_status_pembayaran[lang]}</div>
                        </button>
                    </div> */}
                </Col>
            </Row>
        </Container>
    );
}
export default BayarMember;