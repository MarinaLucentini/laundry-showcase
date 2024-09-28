import { Translate } from "@mui/icons-material";
import { Button, Toolbar } from "@mui/material";
import { AppBar, useLogout, useNotify, useTranslate } from "react-admin";

const CustomAppBar = (props) => {
  const logout = useLogout();
  const notify = useNotify();
  const translate = useTranslate();

  const handleLogout = () => {
    logout();
    notify("Logged out successfully", { type: "info" });
  };

  return (
    <AppBar {...props}>
      <Toolbar>
        {/* Altri elementi della toolbar possono andare qui */}
        <Button color="inherit" onClick={handleLogout}>
          {translate("Logout")}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
