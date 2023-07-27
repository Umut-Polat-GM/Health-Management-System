import styled from "@emotion/styled";
import { AppBar, Box, InputBase, Toolbar, Typography } from "@mui/material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(() => ({ 
    backgroundColor:"white",
    padding:"0 10px",
    borderRadius:"0.25rem",
    width:"40%",
}))
const Icons = styled(Box)(() => ({ 
    backgroundColor:"white",
}))

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolBar>
        <Typography variant="h6" sx={{display:{xs:"none", sm:"block"}}}>Health</Typography>
        <MonitorHeartIcon sx={{display:{xs:"block", sm:"none"}}}/>
        <Search><InputBase placeholder="..search"/></Search>
        <Icons>Icons</Icons>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
