import React from "react";
import { createRoot } from "react-dom/client";

import Index from "~/routes/_index";

const mountComponent = (
  Component: React.ComponentType,
  containerId: string
) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(<Index />);
  }
};

mountComponent(Index, "root1");
