import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { l10n } from "../../constants/language";
import { getParentCategory } from "../../config/api";
import { Fab, Action } from "react-tiny-fab";
import {
  ic_akun,
  ic_akun1,
  ic_back,
  ic_shop_cart,
  ic_floating,
  ic_floating_2,
  ic_history1,
  ic_inbox1,
  ic_wishlist1,
  ic_wishlist5,
  ic_wishlist3,
  ic_filter,
  ic_sortby,
} from "../../assets/icons";
export default function MainCategory() {
  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  let history = useHistory();
  let location = useLocation();

  localStorage.setItem('currentPage', 1);

  useEffect(() => {
    let language = localStorage.getItem("lang") || "id";
    let token = localStorage.getItem("token");
    if (token != null) {
      getMainCategory(token);
    }
  }, [location]);

  const getMainCategory = (token) => {
    getParentCategory(token)
      .then((response) => {
        console.log(response.data);
        if ((response.data.status = "success")) {
          setData(response.data.data);
          console.log(response.data);
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
            <span style={{ fontSize: 20 }}>{l10n.library[lang]}</span>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        {data.map((item, i) => (

          item.is_enabled ? (
            <Col md={3} sm={4} xs={6} key={'category_main-' + i} style={{ marginBottom: 10 }}>

              <div
                onClick={() =>
                  history.push("library_list", { id: location.state.id, idParent: item.id, idlocation: location.state.id })
                }
                style={{ padding: 15, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', border: "1px solid #e5d6d6", borderRadius: 15, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
                key={'category_main-' + i}
              >
                <div style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>{item.name}</div>
              </div>

            </Col>
          ) : (
            <Col md={3} sm={4} xs={6} key={'category_main-' + i} style={{ marginBottom: 10 }}>

              <div
                style={{ padding: 15, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', border: "1px solid #e5d6d6", borderRadius: 15, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', background: "#f0f0f0" }}
                key={'category_main-' + i}
              >
                <div style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>{item.name}</div>
              </div>

            </Col>
          )

        ))}
      </Row>
      <Fab style={{ bottom: 50, right: 20 }} icon={<img src={ic_floating_2} />}>
        <Action
          onClick={() => history.push("/history_library")}
          style={{ right: 0, bottom: 0 }}
        >
          <img src={ic_history1} />
        </Action>
        <Action
          onClick={() => history.push("/wishlist_library")}
          style={{ right: 65, bottom: -120 }}
        >
          <img src={ic_wishlist1} />
        </Action>
        <Action
          onClick={() => history.push("/profile")}
          style={{ right: 0, bottom: -245 }}
        >
          <img src={ic_akun1} />
        </Action>
      </Fab>
    </Container>
  );
}
