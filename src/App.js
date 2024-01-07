import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Counter from "./Comp/Count";
import ProductsList from "./Comp/ProductsList";
import ProductDetails from "./Comp/ProductDetails";
import { Header, Footer } from "./Comp/Layout";
import { Provider } from "react-redux";
import store from "./Redux/store";
import SignIn from "./Comp/SignIn";
import SignUp from "./Comp/SignUp";
import { authInstance } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/SignIn" />}
            />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
              path="/counter"
              element={
                <>
                  <Header user={user} />
                  <Counter />
                  <Footer user={user} />
                </>
              }
            />
            <Route
              path="/Product/pro"
              element={
                <>
                  <Header user={user} />
                  <ProductsList />
                  <Footer user={user} />
                </>
              }
            />
            <Route
              path="/product/:id/"
              element={
                <>
                  <Header user={user} />
                  <ProductDetails />
                  <Footer user={user} />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
