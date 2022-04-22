import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import "../assets/styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "../store";
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

const browserHistory = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
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
              <Route exact path="/admin" element={<Admin />} />
              <Route
                exact
                path="/pay"
                element={
                  <ProtectedRoute>
                    <BuyForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
          <ToastContainer />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
