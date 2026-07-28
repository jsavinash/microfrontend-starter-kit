import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Standalone bootstrap (for development without host)
const rootElement = document.getElementById("root");

if (rootElement) {
    // Only render standalone if not inside host shell
    // (host shell provides its own BrowserRouter)
    const isStandalone = !window.location.pathname.startsWith("/auth");
    if (isStandalone) {
        // Dynamic import to avoid circular dependency
        import("react-router-dom").then(({ BrowserRouter }) => {
            ReactDOM.createRoot(rootElement).render(
                <React.StrictMode>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </React.StrictMode>,
            );
        });
    }
}

export default App;
