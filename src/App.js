import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { Home } from "./pages/home";

function App() {

  return (
    <GeistProvider>
      <CssBaseline />
      <Home />
    </GeistProvider>
  );
}

export default App;
