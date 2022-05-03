import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import "../assets/styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Admin from "../pages/admin/Admin";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../context/authContext";
import ProtectedRoute from "../components/ProtectedRoute";

import BuyForm from "../pages/BuyForm";
import ProtectedRouteAdmin from "../components/admin/ProtectedRouteAdmin";
import { ShoppingProvider } from "../context/shoppingContext";
import ProtectedRouteBuyForm from "../components/buyForm/ProtectedRouteBuyForm";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShoppingProvider>
          <Layout>
            <Routes history={browserHistory}>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/contact"
                element={
                  <ProtectedRoute>
                    <Contact />
                  </ProtectedRoute>
                }
              />
              <Route exact path="/menu" element={<Menu />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/user" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/admin"
                element={
                  <ProtectedRouteAdmin>
                    <Admin />
                  </ProtectedRouteAdmin>
                }
              />
              <Route
                exact
                path="/pay"
                element={
                  <ProtectedRoute>
                    <ProtectedRouteBuyForm>
                      <BuyForm />
                    </ProtectedRouteBuyForm>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
          />
        </ShoppingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
