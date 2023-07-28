import { Favorite, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const Rightbar = () => {
  return (
    <Box flex={2} p={2}>
      <Card sx={{ width: "100%" }} elevation={8}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <Box>
          <img src="https://picsum.photos/id/225/600/300" alt="img" />
        </Box>
        <CardContent>
          <Stack direction={"row"} my={1}>
            <Typography variant="h5">Sky</Typography>
          </Stack>
          <Divider />
          <Typography variant="body2" my={1}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
            minima dolore corporis illo numquam ullam nemo porro cupiditate.
          </Typography>
        </CardContent>
        <Stack direction={"row"} m={2} spacing={1}>
          <Button variant="outlined">Share</Button>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </Stack>
      </Card>
    </Box>
  );
};

export default Rightbar;
