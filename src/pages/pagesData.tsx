import Home from "./index";
import SignIn from "./auth/signin";
import SignUp from "./auth/signup";
import ForgotPassword from "./auth/forgot-password";
import Accounts from "./dashboard/accounts";
import Dashboard from "./dashboard";
import Portfolio from "./dashboard/portfolio";
import Transactions from "./dashboard/transactions";
import Settings from "./dashboard/settings";
import Analytics from "./dashboard/analytics";
import Invoices from "./dashboard/invoices";
import Payments from "./dashboard/payments";
const pagesData = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "dashboard/accounts",
    element: <Accounts />,
    title: "accounts",
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    title: "dashboard",
  },
  {
    path: "auth/signin",
    element: <SignIn />,
    title: "Sign In",
  },
  {
    path: "auth/signup",
    element: <SignUp />,
    title: "home",
  },
  {
    path: "auth/forgot-password",
    element: <ForgotPassword />,
    title: "Forgot Password",
  },
  {
    path: "dashboard/portfolio",
    element: <Portfolio />,
    title: "portfolio",
  },
  {
    path: "dashboard/analytics",
    element: <Analytics />,
    title: "analytics",
  },
  {
    path: "dashboard/invoices",
    element: <Invoices />,
    title: "invoices",
  },
  {
    path: "dashboard/payments",
    element: <Payments />,
    title: "payments",
  },
  {
    path: "dashboard/transactions",
    element: <Transactions />,
    title: "transactions",
  },
  {
    path: "dashboard/settings",
    element: <Settings />,
    title: "Profile Settings",
  },

  // {
  //   path: "settings",
  //   element: <Settings />,
  //   title: "Settings",
  // },
  // {
  //   path: "dashboard",
  //   element: <Dashboard />,
  //   title: "home",
  // },
];
export default pagesData;
