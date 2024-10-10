import * as Comlink from "comlink";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Index from "~/routes/_index";

const renderComponent = () => {
  const html = ReactDOMServer.renderToString(React.createElement(Index));
  return html;
};

Comlink.expose({ renderComponent });
