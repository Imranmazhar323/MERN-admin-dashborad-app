import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = createTheme(themeSettings(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      sss
    </ThemeProvider>
  );
}

export default App;
