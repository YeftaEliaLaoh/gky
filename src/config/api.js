import axios from "axios";
const baseURL = "https://andtechnology.online/api/";

// endpoint
const registration = "registration";
const login = "login";
const verify_user = "verify_user";
const locations = "locations";
const member = "member";
const profile = "profile";
const create_member = "create_member";
const categories = "categories";
const item = "item";
const wishlist = "wishlist";
const create_wishlist = "create_wishlist";
const delete_wishlist = "delete_wishlist";
const cart = "cart";
const create_cart = "create_cart";
const delete_cart = "delete_cart";
const bookrent = "bookrent";
const tanda_terima = "tanda_terima";
const history = "history";
const edit = "edit";
const profile_update = "profile_update";
const change_password = "change_password";
const cancel_rent = "cancel"
const publisher = "publisher";
const list = "list";
const message = "message";
const author = "author";
const parent_categories = "parent_categories";
const forgot_password = "forget_password"
const extend_rent = "perpanjang_rent";
const member_kelas = "member_kelas";

const postRegistration = (name, email, phone_number,password, password_confirmation) => {
  let data = {
    name: name,
    email: email,
    phone_number: phone_number,
    password, 
    password_confirmation
  };
  return axios.post(baseURL + registration, data);
};

const postForgotPassword = (email) => {
  let data = {
    email
  };
  return axios.post(baseURL + forgot_password, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
  });
};

const postLogin = (phone_number,password) => {
  let data = {
    phone_number: phone_number,
    password: password
  };
  return axios.post(baseURL + login, data);
};

const verifyUserOTP = (otp) => {
  return axios.get(baseURL + verify_user + "?otp=" + otp);
};

const getLocations = (token) => {
  return axios.get(baseURL + locations, {
    headers: {
      token: token,
    },
  });
};

const checkMember = (token) => {
  return axios.get(baseURL + member, {
    headers: {
      token: token,
    },
  });
};

const checkProfile = (token) => {
  return axios.get(baseURL + profile, {
    headers: {
      token: token,
    },
  });
};

const createMember = (
  nomor_anggota,
  nama_anggota,
  tanggal_lahir,
  alamat,
  kode_pos,
  phone_number,
  kelas,
  kebaktian,
  token
) => {
  let data = {
    nomor_anggota,
    nama_anggota,
    tanggal_lahir,
    alamat,
    kode_pos,
    phone_number,
    kelas,
    kebaktian,
  };
  return axios.post(baseURL + create_member, data, {
    headers: {
      token: token,
    },
  });
};

const getCategories = (token, location_id, page = "1") => {
  return axios.get(
    baseURL + categories + "?location_id=" + location_id + "&page=" + page,
    {
      headers: {
        token: token,
      },
    }
  );
};

const getItems = (token, id) => {
  let data = {
    item_id: id,
  };
  return axios.post(baseURL + item, data, {
    headers: {
      token: token,
    },
  });
};

const getItemsCategory = (
  token,
  idlocation,
  category = "",
  title = "",
  idpublisher = "",
  idauthor = ""
) => {
  let data = {
    idlocation,
    category,
    title,
    idpublisher,
    idauthor
  };
  console.log('data post item', data)
  return axios.post(baseURL + item, data, {
    headers: {
      token: token,
    },
  });
};

const getWishlist = (token) => {
  return axios.get(baseURL + wishlist, {
    headers: {
      token: token,
    },
  });
};
const createWishlist = (item_id, token) => {
  let data = {
    item_id,
  };
  return axios.post(baseURL + create_wishlist, data, {
    headers: {
      token: token,
    },
  });
};
const deleteWishlist = (item_id, token) => {
  let data = {
    item_id,
  };
  return axios.post(baseURL + delete_wishlist, data, {
    headers: {
      token: token,
    },
  });
};

const getCarts = (token) => {
  return axios.get(baseURL + cart, {
    headers: {
      token: token,
    },
  });
};
const createCart = (item_id, token) => {
  let data = {
    item_id,
  };
  return axios.post(baseURL + create_cart, data, {
    headers: {
      token: token,
    },
  });
};

const bookRent = (sesi_id, token) => {
  let data = {
    sesi_id,
  };
  return axios.post(baseURL + bookrent, data, {
    headers: {
      token: token,
    },
  });
};

const getTandaTerima = (booking_id, token) => {
  return axios.get(baseURL + tanda_terima + "?booking_id=" + booking_id, {
    headers: {
      token: token,
    },
  });
};

const doExtendRent= (bookingId,token) => {
  let data = {
    booking_id: bookingId
  };
  return axios.post(baseURL + extend_rent, data, {
    headers: {
      token: token,
    },
  });
};

const getHistory = (startdate, enddate, token) => {
  return axios.get(
    baseURL + history + "?startdate=" + startdate + "&enddate=" + enddate,
    {
      headers: {
        token: token,
      },
    }
  );
};

const getEditProfile = (token) => {
  return axios.get(baseURL + edit, {
    headers: {
      token: token,
    },
  });
};

const doEditProfile = (name, email, phone_number, token) => {
  let data = {
    name,
    email,
    phone_number,
  };
  return axios.post(baseURL + profile_update, data, {
    headers: {
      token: token,
    },
  });
};

const doChangePassword = (data,token) => {
  return axios.post(baseURL + change_password, data, {
    headers: {
      token: token,
    },
  });
};

const doCancelRent= (bookingId,token) => {
  let data = {
    booking_id: bookingId
  };
  return axios.post(baseURL + cancel_rent, data, {
    headers: {
      token: token,
    },
  });
};

const doDeleteCart = (id, token) => {
  return axios.post(
    baseURL + delete_cart + "?id=" + id,
    {},
    {
      headers: {
        token: token,
      },
    }
  );
};

const searchCategory = (token, idlocation, like) => {
  return axios.post(
    baseURL + item,
    {
      idlocation,
      like,
    },
    {
      headers: {
        token: token,
      },
    }
  );
};

//dropdown publisher
const getpublisher = (token, like) => {
  return axios.post(
    baseURL + publisher + "/" + list,
    {
      like,size:2000
    },
    {
      headers: {
        token: token,
      },
    }
  );
};

//dropdows author
const getAuthor = (token, like) => {
  return axios.post(
    baseURL + author + "/" + list,
    {
      like,
    },
    {
      headers: {
        token: token,
      },
    }
  );
};

//get notif
const getMessage = (token) => {
  return axios.get(baseURL + message + "/" + list, {
    headers: {
      token: token,
    },
  });
};

//do extend membership
const doExtendMembership = (token) => {
  return axios.get(baseURL + "extend_membership", {
    headers: {
      token: token,
    },
  });
};

//search filter
const getItemsFilter = (
  token,
  idlocation,
  category = "",
  parentId,
  page,
  title = "",
  idpublisher = "",
  idauthor = "",
) => {
  let data = {
    parent_id: parentId,
    idlocation: idlocation,
    category,
    title,
    idpublisher,
    idauthor,
  };
  console.log('data post',data);
  return axios.post(baseURL + item + '?page=' +page, data, {
    headers: {
      token: token,
    },
  });
};

//main category
const getParentCategory = (token) => {
  return axios.get(baseURL + parent_categories, {
    headers: {
      token: token,
    },
  });
};

const getMemberKelas = (token) => {
  return axios.get(baseURL + member_kelas, {
    headers: {
      token: token,
    },
  });
};

export {
  postRegistration,
  postForgotPassword,
  postLogin,
  verifyUserOTP,
  getLocations,
  getCarts,
  getCategories,
  getEditProfile,
  getHistory,
  getItems,
  getTandaTerima,
  getWishlist,
  createCart,
  createMember,
  createWishlist,
  doEditProfile,
  bookRent,
  deleteWishlist,
  checkMember,
  checkProfile,
  getItemsCategory,
  getAuthor,
  doDeleteCart,
  searchCategory,
  getpublisher,
  getMessage,
  getItemsFilter,
  getParentCategory,
  doCancelRent,
  doExtendRent,
  doChangePassword,
  doExtendMembership,
  getMemberKelas
};
