import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { BigScreen, DesktopOrLaptop, Portrait, Retina, TabletOrMobile, TabletOrMobileDevice, } from "../../constants/display";
import LogoGky from '../../assets/LogoGKY.png';

import { Container, Row, Col, Button } from "react-bootstrap";
import { l10n } from "../../constants/language";
const ChangeLanguage = () => {
    const [lang, setLang] = useState('id');
    
    useEffect(() => {
        console.log("USEEFFECT")
        let language = localStorage.getItem('lang') || "id";
        changeLanguage(language);
    }, []);
   

    const changeLanguage = (language) => {
        setLang(language);
        localStorage.setItem('lang', language);
    }

    return (
        <>
            <Container fluid="sm">
                
                <Row>
                    <Col xs="2" md="2" lg="2">
                        
                    </Col>
                    <Col md="auto" xs="auto">
                        <Button onClick={() => changeLanguage('id')}>INDONESIA</Button>
                        <Button onClick={() =>  changeLanguage('en')}>ENGLISH</Button>
                    </Col>
                    <Col xs="2" md="2" lg="2">
                        
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default ChangeLanguage;