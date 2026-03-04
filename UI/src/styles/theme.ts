import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // Adjust based on the current project's primary color
    },
    secondary: {
      main: "#6c757d",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: "\"Inter\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
