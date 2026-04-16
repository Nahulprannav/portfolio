import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();

function injectAnalytics() {
  if (!analyticsEndpoint || !analyticsWebsiteId) {
    return;
  }

  if (document.getElementById("umami-analytics")) {
    return;
  }

  const script = document.createElement("script");
  script.id = "umami-analytics";
  script.defer = true;
  script.src = `${analyticsEndpoint.replace(/\/$/, "")}/umami`;
  script.dataset.websiteId = analyticsWebsiteId;
  document.head.appendChild(script);
}

injectAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
