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

export default function TandaTerimaMember() {
    const [lang, setLang] = useState("id");
    const [token, setToken] = useState(null);
    const [data, setData] = useState({
        "sesi": "Sesi 1 ( 08.00 - 12.00 )",
        "rent_date": "2022-02-13",
        "status": "pending",
        "returndate": "2022-02-27",
        "total_buku": 1,
        "books": [
            {
                "title": "Tuhan Gembalaku"
            }
        ]
    })
    const [nama, setNama] = useState("");
    let history = useHistory();
    let location = useLocation();
    let alert = useAlert();

    useEffect(() => {
        let language = localStorage.getItem("lang") || "id";
        let token = localStorage.getItem("token");
        let profile = localStorage.getItem("profile");
        console.log(JSON.stringify(profile))
        profile = JSON.parse(profile)
        setNama(profile.name)
        setLang(language);
        setToken(token)
        if (token != null) {
            // doGetTandaTrima(token, location.state.id)
        }
    }, [])

    // const doGetTandaTrima = (token, id) => {
    //     getTandaTerima(id, token).then((res) => {
    //         if (res.data.status == "success") {
    //             setData(res.data.data)
    //         }
    //     }).catch((err) => {
    //         console.log(err.response)
    //     })
    // }

    return (
        <Container>
            <Row className="header">
                <Col md="auto" xs="auto">
                    <div style={{ justifyContent: "flex-start" }}>
                        <a onClick={() => history.goBack()}>
                            <img src={ic_back} alt="back" style={{ width: 25, position: "relative", marginRight: 10, marginTop: -5 }} />
                        </a>
                        <span style={{ fontSize: 20 }}>{l10n.rental[lang]}</span>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginBottom: 80 }}>
                <Col style={{padding: 10}}>
                    <div>
                        <div style={{ color: blueDark, fontSize: 15, fontWeight: "bold" }}>{l10n.message_tanda_terima_pendaftaran[lang]}</div>
                    </div>
                    <br/>
                    <div>
                        <p>Sejumlah :<br/>
                            <b style={{ color: "red", fontSize: 15, fontWeight: "bold" }}>Rp. 20.0000</b>
                        </p>
                    </div>
                    <div>
                        <p>Atas Nama :<br/>
                            <b style={{ color: blueDark, fontSize: 15, fontWeight: "bold" }}>{nama}</b>
                        </p>
                    </div>
                    <div>
                        <p>Catatan :<br/>
                            <b style={{ color: blueDark, fontSize: 15, fontWeight: "bold" }}>Pendaftaran Anggota</b>
                        </p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="center" style={{ textAlign: "center" }}>
                    <Button style={styles.buttonRent} onClick={() => history.replace('/profile')}>
                        {l10n.done[lang]}
                    </Button>
                </Col>
            </Row>
        </Container>
    );



}

const styles = {
    buttonRent: {
        width: '100%',
        borderRadius: 30,
        border: 'solid',
        padding: 5,
        backgroundColor: "#FFFFF",
        fontWeight: "bold",
    },
    buttonAddCart: {
        width: '100%',
        borderRadius: 30,
        color: "#3059E1",
        borderColor: "#3059E1",
        border: 'solid',
        padding: 5,
        backgroundColor: "#FFFFFF",
        fontWeight: "bold",
    }
}