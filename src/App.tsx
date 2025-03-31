import "./App.css";
import { BrowserRouter } from "react-router";
import Router from "./pages/router";
import RootLayout from "./pages/layout";
export default function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Router />
      </RootLayout>
    </BrowserRouter>
  );
}
