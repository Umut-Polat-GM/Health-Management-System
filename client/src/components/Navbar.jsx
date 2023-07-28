import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Mail, Notifications } from "@mui/icons-material";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(() => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "0.25rem",
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "1rem",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));


const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolBar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Health
        </Typography>
        <MonitorHeartIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="..search" />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: "2rem", height: "2rem" }}
            src="https://images.pexels.com/photos/17042221/pexels-photo-17042221/free-photo-of-young-woman-in-eyeglasses-standing-on-a-basketball-court.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </Icons>
        <UserBox>
          <Typography variant="span">User Name</Typography>
          <Avatar
            sx={{ width: "2rem", height: "2rem" }}
            src="https://images.pexels.com/photos/17042221/pexels-photo-17042221/free-photo-of-young-woman-in-eyeglasses-standing-on-a-basketball-court.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </UserBox>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
