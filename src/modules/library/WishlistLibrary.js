import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Modal,
  Card,
} from "react-bootstrap";
import { l10n } from "../../constants/language";
import {
  ic_back,
  ic_filter,
  ic_inbox1,
  ic_sortby,
  ic_wishlist3,
  ic_wishlist5,
  ic_checklist,
} from "../../assets/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { img_gallery_2, book_1, book_2 } from "../../assets/images/images";
import { useAuth } from "../../auth/userAuth";
import "./LibraryCategory.css";
import {
  deleteWishlist,
  getItemsCategory,
  getWishlist,
} from "../../config/api";
import { useAlert } from "react-alert";

export default function WishlistLibrary() {
  const [lang, setlang, setState] = useState("id");
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const size = {
    width: "180px",
  };

  let history = useHistory();
  let location = useLocation();
  let alert = useAlert();

  useEffect(() => {
    setIsLoading(true);
    // console.log(location.state.category);
    let language = localStorage.getItem("lang") || "id";
    let token = localStorage.getItem("token");
    setlang(language);
    setToken(token);
    if (token != null) {
      doGetWishlist(token);
    }
  }, []);

  const doGetWishlist = (token) => {
    getWishlist(token)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "success") {
          console.log(res.data);
          setData(res.data.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  };

  const setunlike = (item_id) => {
    alert.removeAll();
    if (token == null || item_id == null) {
      console.log("Error token Null");
      logout();
    }
    deleteWishlist(item_id, token)
      .then((res) => {
        console.log(res.data);
        alert.info("Success delete from wishlist", { timeout: 5000 });
      })
      .catch((err) => {
        console.log(err.response);
        alert.error("Failed delete from wishlist", { timeout: 5000 });
      });
    doGetWishlist(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    history.replace("/");
  };

  var btnvar1 = document.getElementById("btnh1");

  // const [like, setlike] = useState(false);

  const [smShow, setSmShow] = useState(false);
  const [filtershow, setfiltershow] = useState(false);
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
            <span style={{ fontSize: 20 }}>{l10n.wishlist_library[lang]}</span>
          </div>
        </Col>
      </Row>
      <br></br>
      <Row>
        {/* <div className="d-flex justify-content-around">
          <FormControl placeholder="search" className="search" />
          <img
            src={ic_sortby}
            className="ic_search"
            onClick={() => setSmShow(true)}
          />{" "}
          <img
            src={ic_filter}
            className="ic_search"
            onClick={() => setfiltershow(true)}
          />
        </div> */}
      </Row>
      <br />
      <Row>
      {isLoading && <div>Loading ...</div>}
        {data.length == 0 && !isLoading && <div>Data Is Empty</div>}
        {data.map((item, i) => (
          <Col md={3} sm={4} xs={6} key={'data-book-' + i} style={{ marginBottom: 10 }}>
            <div
              style={{
                width: '100%',
                height: 275,
                marginBottom: 5,
                borderRadius: 20,
                overflow: 'hidden',
                border: "1px solid #e5d6d6",
                position: "relative",
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
              }}
            >
              <div
                 style={{
                  position: "absolute",
                  top: 130,
                  right: 10
                }}
              >
                <div 
                  style={{
                    backgroundColor: '#fdfdfd',
                    width: '36px',
                    height: '35px',
                    borderRadius: '50%',
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                  }}
                >
                  <img
                    onClick={() => setunlike(item.id) }
                    src={ic_wishlist5}
                    style={{
                      width: 24,
                      marginTop:2,
                      cursor: "pointer"
                    }}
                  />
                </div>
               
              </div>
              
              {!item.image ? (
                <div
                  style={{
                    height: "150px",
                    overflow: "hidden"
                  }}
                  onClick={() =>
                    history.push("/detail_book", { id: item.id })
                  }
                >
                  <img src={book_1} style={{maxWidth: "100%"}} />
                </div>
              ) : (
                <div
                  style={{
                    height: "150px",
                    overflow: "hidden"
                  }}
                  onClick={() =>
                    history.push("/detail_book", { id: item.id })
                  }
                >
                  <img
                    src={"https://gkypluit.church/storage/" + item.image}
                    style={{maxWidth: "100%"}}
                  />
                </div>

              )}
              <div style={{ padding: 10, backgroundColor: "white", fontSize: "13px"}}>
                <div
                  style={{
                    marginBottom: 0,
                    maxLines: 2,
                  }}
                >
                  {item.title != null && item.title.length > 25
                    ? item.title.substring(0, 25) + "..."
                    : item.title}
                </div>
                <div
                  style={{ marginBottom: 5, fontSize: 12 }}
                >
                  ({item.kodelama})
                </div>
                <div style={{ padingLeft: 0 }}>
                  <span
                    style={{
                      color: item.isrent == "false" ? "green" : "black", marginLeft: 0, fontWeight: "600"
                    }}
                  >
                    {item.isrent == "false"
                      ? l10n.available[lang]
                      : l10n.not_available[lang]}
                  </span>
                </div>
              </div>
            </div>

          </Col>
        ))}
      </Row>
      {/* modal filter */}
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        fullscreen="true"
        class=" container_modal"
        style={{ bottom: 0 }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <FormControl placeholder="search" className="textbox_filter" />
            <div class="d-flex justify-content-between w-100">
              {" "}
              <FormControl
                placeholder="search"
                className="textbox_filter"
              />{" "}
              <FormControl placeholder="search" className="textbox_filter" />
            </div>
            <FormControl placeholder="search" className="textbox_filter" />
            <FormControl placeholder="search" className="textbox_filter" />
            <FormControl placeholder="search" className="textbox_filter" />
          </div>
          <div className="d-flex justify-content-between w-100">
            <button className="btnFilter">Reset</button>
            <button className="btnFilter">Cari</button>
          </div>
        </Modal.Body>
      </Modal>
      {/* modal sortby */}
      <Modal
        size="sm"
        show={filtershow}
        onHide={() => setfiltershow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        fullscreen="true"
        class=" container_modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Sortby</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Lorem Ipsum 1</p>
            <hr></hr>
            <p>Lorem Ipsum 1</p>
            <hr></hr>
            <p>
              Lorem Ipsum 1{" "}
              <img
                src={ic_checklist}
                style={{ float: "Right", width: 30 }}
              ></img>
            </p>

            <hr></hr>
            <p>Lorem Ipsum 1</p>
            <hr></hr>
          </div>
          <div className="d-flex justify-content-between w-100">
            <button className="btnFilter">Reset</button>
            <button className="btnFilter">Cari</button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
