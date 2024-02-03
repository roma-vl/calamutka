import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

const AuthAlert = ({ errors, onClose, open, ...otherProps }) => {
  const [showAlert, setShowAlert] = useState(open);

  useEffect(() => {
    setShowAlert(open);
  }, [open]);

  useEffect(() => {
    // Сховати Alert при зміні стану
    if (showAlert && errors) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
        onClose(); // Викликається при закритті
      }, 5000);

      // Очищення таймера при розміщенні
      return () => clearTimeout(timeoutId);
    }
  }, [showAlert, onClose, errors]);

  if (!showAlert || !errors) {
    return null;
  }

  return (
    <Alert
      severity="error"
      sx={{ width: 400 }}
      onClose={() => {
        setShowAlert(false);
        onClose();
      }}
      open={showAlert}
      {...otherProps}
    >
      <AlertTitle>{errors}</AlertTitle>
    </Alert>
  );
};

export default AuthAlert;
