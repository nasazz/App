import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Home from "./scenes/essentiel/index2";
import LoginForm from './Components/LoginForm/LoginForm';
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import './styles/index1.css';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to Home page if token exists and user is authenticated
      if (location.pathname === '/login') {
        navigate('/home');
      }
    } else {
      // Redirect to login page if no token
      if (location.pathname !== '/login' && location.pathname !== '/') {
        navigate('/login');
      }
    }
  }, [navigate, location.pathname]);


  return (
     <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
           {location.pathname !== '/' && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {location.pathname !== '/' && <Topbar setIsSidebar={setIsSidebar} />}
          <Routes>
          <Route path="/" element={<LoginForm className="login-page" />} />
          <Route path="/login" element={<LoginForm className="login-page" />} />
          <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/form/:userId?" element={<Form />} /> 
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
