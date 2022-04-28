import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { db } from "../utils/init-firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Homepage from "../pages/Homepage";
import HomworkOrder from "../pages/HomeworkOrder";
import Homeworks from "../pages/Homeworks";
import Loginpage from "../pages/Loginpage";
import AdminPanel from "../pages/adminpanel";
import NotfoundPage from "../pages/NotfoundPage";
import Ordered from "../pages/Ordered";
import Profilepage from "../pages/Profilepage";
import Ready from "../pages/Ready";
import Registerpage from "../pages/Registerpage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import TestPage from "../pages/TestPage";
import { collection, query, onSnapshot, doc } from "firebase/firestore";
import PaidReady from "../pages/Paidready";
import AdminReady from "../pages/Adminready";
import AboutUs from "../pages/Aboutus";
import Zaavar from "../pages/Zaavar";

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <ProtectedRoute exact path="/login" component={Loginpage} />
          <ProtectedRoute exact path="/register" component={Registerpage} />
          <ProtectedRoute exact path="/profile" component={Profilepage} />
          <ProtectedRoute exact path="/test" component={TestPage} />
          <Route exact path="/homeworks" component={Homeworks} />
          <Route exact path="/paidready" component={PaidReady} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/zaavar" component={Zaavar} />
          <ProtectedRoute exact path="/ordered" component={Ordered} />
          <ProtectedRoute exact path="/ready" component={Ready} />
          <AdminRoute exact path="/admin" component={AdminPanel} />
          <AdminRoute exact path="/adminready" component={AdminReady} />
          <Route exact path="/homeworkorder" component={HomworkOrder} />

          <ProtectedRoute
            exact
            path="/forgot-password"
            component={ForgotPasswordPage}
          />
          <ProtectedRoute
            exact
            path="/reset-password"
            component={ResetPasswordPage}
          />
          <Route exact path="*" component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  );
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  const { path } = props;

  const location = useLocation();

  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/reset-password"
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? "/profile"} />
    ) : (
      <Route {...props} />
    );
  }

  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}

function AdminRoute(props) {
  const [adminData, setAdminData] = useState();
  const [isAdmin, setisAdmin] = useState(null);

  useEffect(() => {
    const q5 = query(collection(db, "num", "Admin", "Admins"));
    const unsub5 = onSnapshot(q5, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setAdminData(tmpArray);
    });
    return unsub5;
  }, []);

  const { currentUser } = useAuth();

  useEffect(() => {
    for (let i = 0; i < adminData?.length; i++) {
      if (currentUser?.uid === adminData[i].uid) {
        setisAdmin(true);
        return;
      } else setisAdmin(false);
    }
  }, [adminData]);

  if (isAdmin == true) {
    return <Route {...props} />;
  } else if (isAdmin == false && adminData) {
    return <Redirect to={"/profile"} />;
  }

  return null;
}
