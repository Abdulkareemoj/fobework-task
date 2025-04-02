import "./App.css";
import { BrowserRouter } from "react-router";
import Router from "./pages/router";
export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
