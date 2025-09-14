import React from "react";
import { AutofuseProvider } from "../../src/react/Provider";
import { ThemeStudio } from "../../src/react/theme-studio";
import "../../src/css/styles.css";

export function App() {
  return (
    <AutofuseProvider>
      <div className="af-container af-stack-6 af-my-6">
        <ThemeStudio />
        <div className="af-stack-2">
          <h2 className="af-text-xl">Your content preview</h2>
          <p className="af-text-base">
            Change colors, spacing, and typography in the studio above and see
            changes live.
          </p>
        </div>
      </div>
    </AutofuseProvider>
  );
}

export default App;

