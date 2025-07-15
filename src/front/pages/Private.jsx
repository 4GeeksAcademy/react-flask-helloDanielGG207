import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // if you're using react-router

export const Private = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("jwt-token");
      if (!token) {
        navigate("/"); // redirect to login
        return;
      }
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const resp = await fetch(backendUrl + "/protected", {
          headers: { Authorization: "Bearer " + token }
        });
        if (resp.ok) {
          const data = await resp.json();
          setMessage("Bienvenido, " + data.logged_in_as);
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("jwt-token");
   
  };

  return (
    <div>
      <h1>Private Page</h1>
      <p>{message}</p>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Log Out
      </button>

    </div>

    
  );

  
};