// src/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This will scroll your right panel to top
    const content = document.getElementById("main-content");
    if (content) {
      content.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
}
