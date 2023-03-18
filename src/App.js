import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-tiny-fab/dist/styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import LoginPage from "./modules/login/LoginPage";
import HomePage from "./modules/home/HomePage";
import { useAuth, authContext } from "./auth/userAuth";
import LibraryCategory from "./modules/library/LibraryCategory";
import Profile from "./modules/profile/Profile";
import Register from "./modules/register/Register";
import OtpLogin from "./modules/login/OtpLogin";
import OtpRegister from "./modules/register/OtpRegister";
import EditProfile from "./modules/profile/EditProfile";
import EditPassword from "./modules/profile/EditPassword";
import FAQ from "./modules/faq/faq";
import Inbox from "./modules/inbox/Inbox";
// import HomeLoginPage from "./modules/home/HomeLoginPage";
import InboxDetail from "./modules/inbox/InboxDetail";
import LibraryList from "./modules/library/LibraryList";
import WishlistLibrary from "./modules/library/WishlistLibrary";
import HistoryLibrary from "./modules/library/HistoryLibrary";
import CartLibrary from "./modules/library/CartLibrary";
import DetailBook from "./modules/library/DetailBook";
import TandaTerima from "./modules/library/TandaTerima";
import DaftarMember from "./modules/profile/DaftarMember";
import BayarMember from "./modules/profile/BayarMember";
import TandaTerimaMember from "./modules/profile/TandaTerimaMember";
import GantiBahasa from "./modules/profile/GantiBahasa";
import HapusAkun from "./modules/profile/HapusAkun";
import DetailHistory from "./modules/library/DetailHistory";
import MainCategory from "./modules/library/MainCategory";
import ForgotPassword from "./modules/forgot_password/forgotPassword";
const getBasename = () => {
  if(process.env.PUBLIC_URL)
    return `/${process.env.PUBLIC_URL.split("/").pop()}`;

  return window.location.pathname
};
export default function App() {
  return (
    <Router basename={getBasename()}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exec path="/login">
          <LoginPage />
        </Route>
        <Route path="/otp_login">
          <OtpLogin />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/otp_register">
          <OtpRegister />
        </Route>
        <Route path="/library_category">
          <LibraryCategory />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/faq">
          <FAQ />
        </Route>
        <Route path="/edit_profile">
          <EditProfile />
        </Route>
        <Route path="/edit_password">
          <EditPassword />
        </Route>
        <Route path="/inbox">
          <Inbox />
        </Route>
        <Route path="/inbox_detail">
          <InboxDetail />
        </Route>
        <Route path="/library_list">
          <LibraryList />
        </Route>
        <Route path="/wishlist_library">
          <WishlistLibrary />
        </Route>
        <Route path="/history_library">
          <HistoryLibrary />
        </Route>
        <Route path="/cart_library">
          <CartLibrary />
        </Route>
        <Route path="/detail_book">
          <DetailBook />
        </Route>
        <Route path="/tanda_terima">
          <TandaTerima />
        </Route>
        <Route path="/daftar_member">
          <DaftarMember />
        </Route>
        <Route path="/bayar_member">
          <BayarMember />
        </Route>
        <Route path="/tanda_terima_member">
          <TandaTerimaMember />
        </Route>
        <Route path="/ganti_bahasa">
          <GantiBahasa />
        </Route>
        <Route path="/hapus_akun">
          <HapusAkun />
        </Route>
        <Route path="/detail_history">
          <DetailHistory />
        </Route>
        <Route path="/category">
          <MainCategory />
        </Route>
        <Route path="/forgot_password">
          <ForgotPassword />
        </Route>
        {/* <PrivateRoute path="/profile" >
          <Profile />
        </PrivateRoute> */}
      </Switch>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
