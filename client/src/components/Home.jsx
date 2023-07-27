import Navbar from "./Navbar";
import Rightbar from "./Rightbar";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import { Box, Stack } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  )
}

export default Home