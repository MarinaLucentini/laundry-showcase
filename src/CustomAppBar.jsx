// CustomAppBar.js
import React, { useState } from "react";
import { AppBar, useLogout, useNotify, useTranslate } from "react-admin";
import { Toolbar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const CustomAppBar = (props) => {
  const logout = useLogout();
  const notify = useNotify();
  const translate = useTranslate();
  const [open, setOpen] = useState(false);

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleConfirmLogout = () => {
    setOpen(false);
    logout();
    notify("Logged out successfully", { type: "info" });
  };

  const handleCancelLogout = () => {
    setOpen(false);
  };

  return (
    <AppBar {...props}>
      <Toolbar>
        {/* Altri elementi della toolbar possono andare qui */}
        <Button color="inherit" onClick={handleLogoutClick} startIcon={<ExitToAppIcon />}>
          {translate("Logout")}
        </Button>
        <Dialog open={open} onClose={handleCancelLogout} aria-labelledby="logout-dialog-title" aria-describedby="logout-dialog-description">
          <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">Are you sure you want to logout?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelLogout} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmLogout} color="primary" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
