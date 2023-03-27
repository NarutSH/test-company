import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";

const drawerWidth = 240;
// const navItems = ["Home", "About", "Shop", "Contact"];

function TopBar(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
  const profileString = localStorage.getItem("profile");
  const profile = JSON.parse(profileString);

  console.log({ profileString, profile });

  const [cartList, setCartList] = React.useState(cart);

  const navItems = [
    {
      label: "Home",
      path: "/",
      badgeContent: "",
    },
    {
      label: "About",
      path: "/about",
      badgeContent: "",
    },
    {
      label: "Shop",
      path: "/shop",
      badgeContent: "",
    },
    {
      label: "Contact",
      path: "/contact",
      badgeContent: "",
    },
    {
      label: "Cart",
      path: "/cart",
      badgeContent: cartList.length ?? 0,
    },
  ];

  const styles = {
    container: {
      width: "100%",
    },
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => {
              return item.badgeContent ? (
                <Badge
                  badgeContent={item.badgeContent}
                  color="error"
                  key={index}
                >
                  <Button
                    key={index}
                    sx={{ color: "#fff" }}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </Button>
                </Badge>
              ) : (
                <Button
                  key={index}
                  sx={{ color: "#fff" }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {profile ? (
            <>
              <h4 style={{ color: "yellow" }}>
                Welcome, {profile?.account?.first_name}
              </h4>
              <Button
                color="secondary"
                onClick={() => {
                  localStorage.removeItem("profile");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" style={styles.container}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

TopBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default TopBar;
