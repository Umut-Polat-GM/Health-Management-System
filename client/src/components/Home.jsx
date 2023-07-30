import Navbar from "./Navbar";
import Rightbar from "./Rightbar";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";

const Home = () => {
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        height={"100vh"}
      >
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar mode={mode} setMode={setMode} />
          <Feed />
          <Rightbar />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
