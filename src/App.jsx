import { useState } from "react";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Invoices from "./pages/Invoices";
import Settings from "./pages/Settings";

export default function App() {
  const [page, setPage] = useState("landing");

  if (page === "landing") return <Landing onGetStarted={() => setPage("auth")} />;
  if (page === "auth") return <Auth onSuccess={() => setPage("onboarding")} />;
  if (page === "onboarding") return <Onboarding onSuccess={() => setPage("dashboard")} />;
  if (page === "dashboard") return <Dashboard onNavigate={setPage} />;
  if (page === "clients") return <Clients />;
  if (page === "projects") return <Projects />;
  if (page === "invoices") return <Invoices />;
  if (page === "settings") return <Settings />;
}