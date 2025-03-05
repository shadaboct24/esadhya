import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Constants/api_url";
import { jwtDecode } from "jwt-decode";

const UseAuth = () => {
  useEffect(() => {
    const checkTokenExpiry = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { exp } = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      if (exp - currentTime < 60) {
        try {
          const response = await axios.post(
            `${API_URL}/api/refresh-token`,
            {},
            {
              headers: { Authorization: `Bearer${token}` },
            }
          );

          if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem(
              "Role",
              jwtDecode(JSON.parse(JSON.stringify(response.data.token)))?.role
            );
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("Role");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("Role");
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 30000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default UseAuth;
