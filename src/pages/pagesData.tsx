import Home from "./index";
import SignIn from "./auth/signin";
import SignUp from "./auth/signup";
import ForgotPassword from "./auth/forgot-password";
import Accounts from "./accounts";
import Dashboard from "./dashboard";
import Portfolio from "./portfolio";
import Transactions from "./transactions";
import SettingsProfilePage from "./settings";
import SettingsAccountPage from "./settings/account";
import SettingsDisplayPage from "./settings/display";
import SettingsNotificationsPage from "./settings/notifications";
const pagesData = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "accounts",
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
    path: "portfolio",
    element: <Portfolio />,
    title: "portfolio",
  },
  {
    path: "transactions",
    element: <Transactions />,
    title: "transactions",
  },
  {
    path: "settings/index",
    element: <SettingsProfilePage />,
    title: "Profile Settings",
  },
  {
    path: "settings/account",
    element: <SettingsAccountPage />,
    title: "Account Settings",
  },
  {
    path: "settings/display",
    element: <SettingsDisplayPage />,
    title: "Display Settings",
  },
  {
    path: "settings/notifications",
    element: <SettingsNotificationsPage />,
    title: "Notifications Settings",
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
