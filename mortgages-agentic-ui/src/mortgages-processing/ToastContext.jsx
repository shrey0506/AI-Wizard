import React, { createContext, useState, useCallback, useContext } from "react";
import { Snackbar, Slide, Alert } from "@mui/material";

// Animation: slide in from the right
function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
    duration: 4000,
  });

  // Show toast
  const showToast = useCallback((message, severity = "info", duration = 4000) => {
    setToast({ open: true, message, severity, duration });
  }, []);

  // Hide toast
  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
     <Snackbar
        open={toast.open}
        autoHideDuration={toast.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // <--- Centered!
        TransitionComponent={SlideTransition}
        >

        <Alert
          onClose={handleClose}
          severity={toast.severity}
          sx={{
            width: "100%",
            bgcolor: "#222",      // black bg
            color: "#fff",        // white text
            fontWeight: 700,
            fontSize: 16,
            boxShadow: 4,
            alignItems: "center",
          }}
          icon={false}           // remove severity icon if you want
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

// Hook for easy use in any component
export function useToast() {
  return useContext(ToastContext);
}
