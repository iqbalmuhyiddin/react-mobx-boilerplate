import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        color: "#525151"
      }
    }
  },
  typography: {
    useNextVariants: true
  },
  palette: {
    common: {
      black: "#2c3e50"
    },
    primary: {
      main: "#2980b9"
    }
  }
});

export default theme;
