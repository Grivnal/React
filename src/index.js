import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import AuthProvider from "./components/providers/AuthProvider";
import {Provider} from "react-redux";
import {store} from "./store";

// підключення налаштувань локалізації
import "./localization/config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
    </BrowserRouter>
</Provider>
)