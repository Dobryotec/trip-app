import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1097745775607-81qe41gtair0mdri072uc3n4orv7mfs6.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
