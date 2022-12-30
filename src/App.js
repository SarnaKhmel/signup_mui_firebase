import Form from "./Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./AuthContext";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./Home";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Router>
      <AuthProvider value={{ currentUser, login, setLogin }}>
        <Routes>
          <Route
            path="/"
            element={
              !currentUser?.emailVerified ? (
                <>
                  <Form />
                </>
              ) : (
                <>
                  <Home />
                </>
              )
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
