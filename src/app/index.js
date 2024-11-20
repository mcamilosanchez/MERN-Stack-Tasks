/** Here will be our code in React. Also, this will be the initial file for our application. */
import React from "react";
import { createRoot } from "react-dom/client";
import App from './app';

const rootElement = document.getElementById("app");
const root = createRoot(rootElement); // Crea el root

root.render(<App />); // Usa el nuevo método render del root