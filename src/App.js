import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { useState } from "react";
import { Home } from "./pages/home";
function App() {
  const [themeType, setThemeType] = useState("light");
  const switchThemes = () => {
    setThemeType((last) => (last === "dark" ? "light" : "dark"));
  };

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Home switchThemes={switchThemes} themeType={themeType}/>
    </GeistProvider>
  );
}

export default App;
