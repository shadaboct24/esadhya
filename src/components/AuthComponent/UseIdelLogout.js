import { useEffect } from "react";

const useIdleLogout = () => {
  useEffect(() => {
    let timeout;
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("Role");
      console.log("yha s delet");
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 5 * 60 * 1000); // 5min ideal par logout
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);
};

export default useIdleLogout;
