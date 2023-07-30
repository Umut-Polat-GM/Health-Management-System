import { Drafts, Inbox } from "@mui/icons-material";
import {
  Box,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";

const Sidebar = (prop) => {
  const { mode, setMode } = prop;
  const handleChange = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };
  return (
    <Box flex={1} p={2}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Drafts />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Drafts />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <FormControlLabel
            label={mode === "light" ? "Light Mode" : "Dark Mode"}
            control={<Switch color="secondary" onChange={handleChange} />}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
