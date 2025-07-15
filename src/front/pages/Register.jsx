import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
  

    const register = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const resp = await fetch("https://didactic-waffle-jj7qr5gp56vrf5wvr-3001.app.github.dev/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "email": email, "password": password })
        });

        if (!resp.ok) {
            const errorData = await resp.json();
            throw errorData.msg || "Hubo un problema con el registro";
        }

        const data = await resp.json();
        return data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await register();
            alert(data.msg || "Registro exitoso");
            // Optionally clear the form
            setEmail("");
            setPassword("");
            navigate("/")
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border p-4 rounded" style={{ width: "300px" }}>
                <h3 className="text-center mb-4">Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};