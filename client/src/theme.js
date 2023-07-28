import { createTheme } from "@mui/material";

export const theme = createTheme({
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    // Diğer renkler burada eklenebilir
  },
  breakpoints: {
    xs: "0px", // Telefonlar için
    sm: "576px", // Tabletler için
    md: "768px", // Küçük laptoplar için
    lg: "992px", // Laptoplar için
    xl: "1200px", // Büyük ekranlı laptoplar ve masaüstü için
  },
});
