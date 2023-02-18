import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ic_back } from "../../assets/icons";
import { l10n } from "../../constants/language";

export default function HapusAkun() {
    const [lang, setLang] = useState("id");
    const [token, setToken] = useState(null);
    const history = useHistory()

    const hapusAkun = () => {
    };

    return (
        <Container>
            <Row className="header">
                <Col md="auto" xs="auto">
                    <div style={{ justifyContent: "flex-start" }}>
                        <a onClick={() => history.goBack()}>
                            <img src={ic_back} alt="back" style={{ width: 25, position: "relative", marginRight: 10, marginTop: -5 }} />
                        </a>
                        <span style={{ fontSize: 20 }}>{l10n.delete_account[lang]}</span>
                    </div>
                </Col>
            </Row><br />
            <div className="center" style={{ width: "100%", padding: 30 }}>
            <div style={{ alignItems: "center", justifyContent: "center" }} className="row">
                 Are you sure?
                </div>
                <div style={{ width: "100%", alignItems: "center", justifyContent: "center" }} className="row">
                    <Button style={{
                        width: '40%',
                        borderRadius: 30,
                        border: 'solid',
                        padding: 5,
                        backgroundColor: "#FFFFF",
                        fontWeight: "bold",
                        alignSelf: "center"
                    }} onClick={() => hapusAkun()}>
                        {l10n.delete[lang]}
                    </Button>
                </div>
            </div>
        </Container>
    )
}