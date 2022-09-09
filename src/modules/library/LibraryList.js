import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Modal,
  Card,
  Pagination,
} from "react-bootstrap";
import { l10n } from "../../constants/language";
import {
  ic_akun1,
  ic_back,
  ic_shop_cart,
  ic_floating_2,
  ic_history1,
  ic_sortby,
  ic_wishlist1,
  ic_filter,
  ic_wishlist3,
  ic_wishlist5,
  ic_checklist,
} from "../../assets/icons";

import { useHistory, useLocation } from "react-router-dom";
import { book_1 } from "../../assets/images/images";
import { Fab, Action } from "react-tiny-fab";
import "./LibraryCategory.css";
import {
  createWishlist,
  deleteWishlist,
  getpublisher,
  getAuthor,
  getItemsFilter,
} from "../../config/api";
import { useAlert } from "react-alert";
import Select from "react-select";
export default function LibraryList() {
  const [lang, setlang] = useState("id");
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, set_page] = useState(1);
  const [last_page, set_last_page] = useState(1);
  const [loacationId, setLocationId] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [parentId, setParentId] = useState("");
  const [like, setLikes] = useState("");
  const [idpublisher, set_idpublisher] = useState("");
  const [idauthor, set_idauthor] = useState("");
  const [listpublisher_value, set_list_publisher_value] = useState(null);
  const [listauthor_value, set_list_author_value] = useState(null);
  const [listpublisher, set_list_publisher] = useState([]);
  const [listauthor, set_list_author] = useState([]);
  const [title_filter, set_title_filter] = useState("");


  let history = useHistory();
  let location = useLocation();
  let alert = useAlert();

  useEffect(() => {
    setIsLoading(true);
    let language = localStorage.getItem("lang") || "id";
    let token = localStorage.getItem("token");
    let takeCurrentPage = page;

    setlang(language);
    setToken(token);
    setLocationId(location.state.idlocation);
    setCategoryId(location.state.category);
    setParentId(location.state.idParent);

    if (localStorage.getItem('currentPage'))
      takeCurrentPage = localStorage.getItem('currentPage');

    if (token != null) {
      publishername();
      Authorname();
      doGetfilter(
        token,
        location.state.idlocation,
        location.state.category,
        like,
        idpublisher,
        idauthor,
        location.state.idParent,
        takeCurrentPage
      );
    }
  }, []);


  const PaginationBasic = ({ current_page, last_page }) => {
    let active = current_page;
    let items = [];
    let lengthPage = last_page > 3 ? 3 : last_page;
    for (let number = 1; number <= last_page; number++) {
      if (number === active) {
        items.push(
          <Pagination.Item key={"number-page-active-" + number} active={number === active}>
            {number}
          </Pagination.Item>
        );
      } else {
        if (number === 1 || number === last_page) {
          items.push(<Pagination.Ellipsis key={"number-page-dot-" + number} />);
        }

        if (active + 1 === number || active - 1 === number) {
          items.push(
            <Pagination.Item
              onClick={() => doGetfilter(
                token,
                location.state.idlocation,
                location.state.category,
                like,
                idpublisher,
                idauthor,
                location.state.idParent,
                number)}
              key={"number-page-not-active-" + number}
              active={number === active}
            >
              {number}
            </Pagination.Item>
          );
        }
      }
    }

    return (
      <Pagination size="md" className="mt-3" style={{ justifyContent: 'center', paddingLeft: 0 }} key="main-pagination">
        <Pagination.First
          key={"first"}
          onClick={() => doGetfilter(
            token,
            location.state.idlocation,
            location.state.category,
            like,
            idpublisher,
            idauthor,
            location.state.idParent,
            1
          )}
        />
        <Pagination.Prev
          key={"prev"}
          onClick={() => doGetfilter(
            token,
            location.state.idlocation,
            location.state.category,
            like,
            idpublisher,
            idauthor,
            location.state.idParent,
            page - 1)}
        />
        {items}
        <Pagination.Next
          key={"next"}
          onClick={() => doGetfilter(
            token,
            location.state.idlocation,
            location.state.category,
            like,
            idpublisher,
            idauthor,
            location.state.idParent,
            page + 1)}
        />
        <Pagination.Last
          key={"last"}
          onClick={() => doGetfilter(
            token,
            location.state.idlocation,
            location.state.category,
            like,
            idpublisher,
            idauthor,
            location.state.idParent,
            last_page)}
        />
      </Pagination>
    );
  };

  const setunlike = (item_id) => {
    alert.removeAll();
    if (token == null || item_id == null) {
      logout();
    }
    deleteWishlist(item_id, token)
      .then(() => {
        alert.info("Success delete from wishlist", { timeout: 5000 });
      })
      .catch((err) => {
        console.log(err.response);
        alert.error("Failed delete from wishlist", { timeout: 5000 });
      });
    doGetfilter(
      token,
      location.state.idlocation,
      location.state.category,
      like,
      idpublisher,
      idauthor,
      location.state.idParent,
      1
    );
  };

  const setlike = (item_id) => {
    alert.removeAll();
    if (token == null || item_id == null) {
      logout();
    }
    createWishlist(item_id, token)
      .then(() => {
        alert.success("Success add to wishlist", { timeout: 5000 });
      })
      .catch((err) => {
        alert.error("Failed add to wishlist", { timeout: 5000 });
      });
    doGetfilter(
      token,
      location.state.idlocation,
      location.state.category,
      like,
      idpublisher,
      idauthor,
      location.state.idParent,
      1
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    history.replace("/");
  };

  const Authorname = () => {
    getAuthor(token)
      .then((res) => {
        let datapublisher = res.data.data || [];
        let newauthor = [];
        for (let i = 0; i < datapublisher.length; i++) {
          newauthor.push({
            value: datapublisher[i].id,
            label: datapublisher[i].name,
          });
        }
        set_list_author(newauthor);
      });
  };

  const publishername = () => {
    getpublisher(token)
      .then((res) => {
        let datapublisher = res.data.data || [];
        let newpublisher = [];
        for (let i = 0; i < datapublisher.length; i++) {
          newpublisher.push({
            value: datapublisher[i].id,
            label: datapublisher[i].name,
          });
        }
        set_list_publisher(newpublisher);
      });
  };

  const doGetfilter = (
    token,
    loacationId,
    categoryId,
    like,
    idpublisher,
    idauthor,
    parentId,
    page
  ) => {
    getItemsFilter(token, loacationId, categoryId, parentId, page, like, idpublisher, idauthor)
      .then((res) => {
        if (res.data.status == "success") {
          setData(res.data.data.data);
          set_page(res.data.data.current_page);
          set_last_page(res.data.data.last_page);
          localStorage.setItem('currentPage', res.data.data.current_page);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

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
            <span style={{ fontSize: 20 }}>{l10n.library[lang]}</span>
          </div>
        </Col>
      </Row>
      <br></br>
      <Row>
        <div className="d-flex justify-content-around">
          <FormControl
            style={{maxWidth:600}}
            placeholder="Search"
            className="search"
            onChange={(event) => {
              setLikes(event.target.value);
              doGetfilter(
                token,
                location.state.idlocation,
                location.state.category,
                like,
                idpublisher,
                idauthor,
                location.state.idParent,
                1
              );
            }}
            value={like}
          />
          <div style={{width:180}}>
          <img
            src={ic_sortby}
            className="ic_search"
            style={{marginLeft:15}}
            onClick={() => setSmShow(true)}
          />{" "}


          <img src={ic_shop_cart} 
            style={{marginLeft:15,width:"40px"}}
            onClick={() => history.push("/cart_library")} />
        </div>
        </div>
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
                    onClick={() =>
                      item.is_wishlist == "true"
                        ? setunlike(item.id)
                        : setlike(item.id)
                    }
                    src={
                      item.is_wishlist == "true" ? ic_wishlist5 : ic_wishlist3
                    }
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
                    history.push("/detail_book", { id: item.id, currentPage: page })
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
                    history.push("/detail_book", { id: item.id, currentPage: page })
                  }
                >
                  <img
                    src={"https://andtechnology.online/storage/" + item.image}
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

      {
        (!isLoading && data.length !== 0) && (
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <PaginationBasic current_page={page} last_page={last_page} />
          </Row>
        )
      }

      {/* modal filter */}
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        fullscreen="true"
        className=" container_modal"
        style={{
          bottom: 0,
          left: "auto",
          right: "auto",
          top: "auto",
          position: "fixed",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* <FormControl
              placeholder="Title"
              style={{ marginBottom: 10 }}
              onChange={(event) => {
                set_title_filter(event.target.value);
              }}
              value={title_filter}
            /> */}
            <h2>{set_idpublisher}</h2>
            <Select
              options={listpublisher}
              placeholder="Publisher"
              className="textbox_filter"

              onChange={(e) => { set_idpublisher(e.value); set_list_publisher_value(e) }}
              value={listpublisher_value}

            />

            <Select
              options={listauthor}
              placeholder="Author"
              className="textbox_filter"
              blurInputOnSelect={false}
              onChange={(e) => { set_idauthor(e.value); set_list_author_value(e) }}
              value={listauthor_value}
            />
            <br></br>
          </div>
          <div className="d-flex justify-content-between w-100">
            <button
              onClick={() => {
                set_title_filter("");
                set_list_publisher_value(null)
                set_list_author_value(null)
                set_idpublisher("")
                set_idauthor("")
              }}
              className="btnFilter"
            >
              Reset
            </button>
            <button onClick={() => {
              doGetfilter(
                token,
                location.state.idlocation,
                location.state.category,
                like,
                idpublisher,
                idauthor,
                location.state.idParent,
                1); setSmShow(false)
            }} className="btnFilter">
              Cari
            </button>
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
        className=" container_modal"
        bottom
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
