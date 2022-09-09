import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Pagination,
  Card,
  FormControl,
  Modal,
  select,
} from "react-bootstrap";
import { l10n } from "../../constants/language";
import { useAlert } from "react-alert";
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
import { Link, useHistory, useLocation } from "react-router-dom";
import { img_gallery_2, book_1 } from "../../assets/images/images";
import { useAuth } from "../../auth/userAuth";
import "./LibraryCategory.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Fab, Action } from "react-tiny-fab";
import Select from "react-select";
import {
  getCategories,
  searchCategory,
  getpublisher,
  getItemsCategory,
} from "../../config/api";

export default function LibraryCategory() {
  const [lang, setLang] = useState("id");
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const [categories, set_categories] = useState([]);
  const [page, set_page] = useState(1);
  const [last_page, set_last_page] = useState(1);
  const [loacationId, setLocationId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [filtershow, setfiltershow] = useState(false);
  const [idpublisher, set_idpublisher] = useState("");
  const [idauthor, set_idauthor] = useState("");
  const [like, setLikes] = useState("");
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    let language = localStorage.getItem("lang") || "id";
    let token = localStorage.getItem("token");
    setLang(language);
    setToken(token);
    localStorage.setItem('currentPage',1);
    console.log('lalalala')
    
    if (token != null) {
      setLocationId(location.state.id);
      console.log(location.state)
      doGetCategories(token, location.state.id, page);
      doGetItems(
        token,
        location.state.idlocation,
        location.state.category,
        like,
        idpublisher,
        idauthor
      );
    }
    if (like != null) {
      getsearchCategory(token);
    }
  }, []);

  const doGetCategories = (token, location_id, page) => {
    console.log("doGetCategories " + page);
    getCategories(token, location_id, page)
      .then((res) => {
        console.log(res.data);
        if ((res.data.status = "success")) {
          console.log(res.data.data.data)
          set_categories(res.data.data.data);
          set_page(res.data.data.current_page);
          set_last_page(res.data.data.last_page);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  };

  const getsearchCategory = (token, like) => {
    // console.log(loacationId);
    console.log(like);
    searchCategory(token, loacationId, like)
      .then((res) => {
        if (res.data.status == "success") {
          console.log(res.data);
          setData(res.data.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
      });
  };

  const publisher = (token, like) => {
    getpublisher(token)
      .then((res) => {
        if ((res.data.status = "success")) {
          setData(res.data.token);
        }
      })
      .catch((err) => {
        console.err(err.res);
      });
  };

  const doGetItems = (
    token,
    loacationId,
    categoryId,
    like,
    idpublisher,
    idauthor
  ) => {
    getItemsCategory(
      token,
      loacationId,
      categoryId,
      like,
      idpublisher,
      idauthor
    )
      .then((res) => {
        if (res.data.status == "success") {
          // console.log(res.data);
          setData(res.data.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
      });
  };

  const PaginationBasic = ({ current_page, last_page }) => {
    let active = current_page;
    let items = [];
    let lengthPage = last_page > 3 ? 3 : last_page;
    for (let number = 1; number <= last_page; number++) {
      if (number === active) {
        items.push(
          <Pagination.Item key={number} active={number === active}>
            {number}
          </Pagination.Item>
        );
      } else {
        if (number === 1 || number === last_page) {
          items.push(<Pagination.Ellipsis />);
        }

        if (active + 1 === number || active - 1 === number) {
          items.push(
            <Pagination.Item
              onClick={() => doGetCategories(token, loacationId, number)}
              key={number}
              active={number === active}
            >
              {number}
            </Pagination.Item>
          );
        }
      }
    }

    return (
      <Pagination size="sm">
        <Pagination.First
          key={"first"}
          onClick={() => doGetCategories(token, loacationId, 1)}
        />
        <Pagination.Prev
          key={"prev"}
          onClick={() => doGetCategories(token, loacationId, page - 1)}
        />
        {items}
        <Pagination.Next
          key={"next"}
          onClick={() => doGetCategories(token, loacationId, page + 1)}
        />
        <Pagination.Last
          key={"last"}
          onClick={() => doGetCategories(token, loacationId, last_page)}
        />
      </Pagination>
    );
  };

  const options = [{ value: "tes", label: "tes" }];

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
        {/* <Col sm="12" md="12" className="center">
          <FormControl
            placeholder="search"
            className="search_category"
            onChange={(event) => {
              setLikes(event.target.value);
              getsearchCategory(token, event.target.value);
            }}
            value={like}
          />
          <img
            src={ic_sortby}
            className="ic_search"
            // onClick={() => setSmShow(true)}
          />{" "}
          <img
            src={ic_filter}
            className="ic_search"
            onClick={() => setfiltershow(true)}
          />
        </Col> */}
        <div className="d-flex justify-content-around">
          <FormControl
            placeholder="search"
            className="search"
            onChange={(event) => {
              setLikes(event.target.value);
              getsearchCategory(token, event.target.value);
            }}
            value={like}
          />
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
        </div>
      </Row>

      <br></br>
      {data.length > 0 && like.length > 0 ? (
        <Row>
          <Col className=" bottomArea">
            {isLoading && <div>Loading ...</div>}
            {data.length == 0 && !isLoading && <div>Data Is Empty</div>}
            {data.map((item) => (
              <div class="item">
                <div>
                  <Card
                    className="cardItem"
                    style={{
                      width: 140,
                      height: 240,
                      marginBottom: 5,
                    }}
                  >
                    <div className="circle"></div>
                    <img
                      // onClick={() =>
                      //   item.is_wishlist == "true"
                      //     ? setunlike(item.id)
                      //     : setlike(item.id)
                      // }
                      src={
                        item.is_wishlist == "true" ? ic_wishlist5 : ic_wishlist3
                      }
                      style={{
                        position: "absolute",
                        width: 24,
                        marginLeft: 85,
                        marginTop: 15,
                      }}
                    />
                    {!item.image ? (
                      <Card.Img
                        src={book_1}
                        class="image_library_list"
                        onClick={() =>
                          history.push("/detail_book", { id: item.id })
                        }
                      ></Card.Img>
                    ) : (
                      <Card.Img
                        src={item.image}
                        class="image_library_list"
                        onClick={() =>
                          history.push("/detail_book", { id: item.id })
                        }
                      ></Card.Img>
                    )}
                    <Card.Body style={{ width: 135, backgroundColor: "white" }}>
                      <Card.Title
                        className="title_product"
                        style={{
                          marginBottom: 0,
                          maxLines: 2,
                        }}
                      >
                        {item.title != null && item.title.length > 25
                          ? item.title.substring(0, 25) + "..."
                          : item.title}
                      </Card.Title>
                      <Card.Text
                        className="kode_product"
                        style={{ marginBottom: 0 }}
                      >
                        ({item.kodelama})
                      </Card.Text>
                      <Card.Text className="kode_product">
                        <li
                          className="kode_product"
                          style={{
                            color: item.isrent == "false" ? "green" : "black",
                          }}
                        >
                          {item.isrent == "false"
                            ? l10n.available[lang]
                            : l10n.not_available[lang]}
                        </li>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      ) : (
        <>
          <Col className="containercategory justify-content-center align-items-center bottomArea">
            <Row>
              <div
                className="category_items"
                // style={{
                //   display: "grid",
                //   gridTemplateColumns: "repeat(4, 1fr)",
                //   // gridGap: -1,
                // }}
              >
                {categories.length != 0 &&
                  categories.map((category, index) => (
                    <div className="center">
                      <img
                        src={img_gallery_2}
                        alt="galery"
                        className="img_gallery_2"
                        onClick={() =>{
                          history.push("/library_list", {
                            category: category.id,
                            idlocation: location.state.id,
                            idParent: category.parent_id
                          })
                          }
                        }
                      />
                      <div className="center">
                        <p
                          style={{
                            fontSize: 10,
                            maxLines: 2,
                            width: 70,
                            textAlign: "center",
                            margin: 10,
                            lineBreak: "auto",
                          }}
                        >
                          {category.fullname.length > 20
                            ? category.fullname.substring(0, 20) + "..."
                            : category.fullname}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </Row>
            <Modal
              size="sm"
              show={smShow}
              onHide={() => setSmShow(false)}
              aria-labelledby="example-modal-sizes-title-sm"
              fullscreen="true"
              class=" container_modal"
              style={{
                bottom: 0,
                left: "auto",
                right: "auto",
                top: "auto",
                position: "fixed",
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  Filter
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  {/* <FormControl
              onChange={(event) => {
                setLikes(event.target.value);
              }}
              value={like}
              placeholder="title"
              className="textbox_filter"
            /> */}
                  {/* <FormControl
              onChange={(event) => {
                set_idpublisher(event.target.value);
              }}
              value={idpublisher}
              placeholder="id publisher"
              className="textbox_filter"
            /> */}
                  {/* <FormControl
              onChange={(event) => {
                set_idauthor(event.target.value);
              }}
              value={idauthor}
              placeholder="id author"
              className="textbox_filter"
            /> */}
                  {/* {data.map((list) => ( */}
                  <Select
                    options={options}
                    placeholder="Title"
                    className="textbox_filter"
                  />
                  {/* ))} */}

                  <Select
                    options={options}
                    placeholder="Publisher"
                    className="textbox_filter"
                  />

                  <Select
                    options={options}
                    placeholder="author"
                    className="textbox_filter"
                  />
                  <br></br>
                </div>
                <div className="d-flex justify-content-between w-100">
                  <button
                    // onClick={() => {
                    //   setLikes("");
                    //   set_idpublisher("");
                    //   set_idauthor("");
                    // }}
                    className="btnFilter"
                  >
                    Reset
                  </button>
                  <button
                    // onClick={() => {
                    //   doGetItems(
                    //     token,
                    //     loacationId,
                    //     categoryId,
                    //     like,
                    //     idpublisher,
                    //     idauthor
                    //   );
                    // }}
                    className="btnFilter"
                  >
                    Cari
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </Col>

          <br></br>
          <Row className="center">
            <Col sm="6" md="6" className="center">
              <PaginationBasic current_page={page} last_page={last_page} />
            </Col>
          </Row>
        </>
      )}

      <Fab style={{ bottom: 50, right: 20 }} icon={<img src={ic_floating_2} />}>
   
        <Action
          onClick={() => history.push("/history_library")}
          style={{ right: 80, bottom: 0 }}
        >
          <img src={ic_history1} />
        </Action>
        <Action
          onClick={() => history.push("/wishlist_library")}
          style={{ right: 80, bottom: -100 }}
        >
          <img src={ic_wishlist1} />
        </Action>
        <Action
          onClick={() => history.push("/profile")}
          style={{ right: 30, bottom: -220 }}
        >
          <img src={ic_akun1} />
        </Action>
      </Fab>
    </Container>
  );
}
