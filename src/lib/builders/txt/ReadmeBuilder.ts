import { BuilderTxt } from "@/lib/builders/txt/BuilderTxt.js";

export class ReadmeBuilder extends BuilderTxt {
  private projectName: string;
  private projectType: string;

  constructor(projectName: string, projectType: string) {
    super()
    this.projectName = projectName;
    this.projectType = projectType;
  }

  public build(): BuilderTxt {
    this
      .append(`# ${this.projectName}`).doubleLine()

      .append("## Getting Started").doubleLine()
      .append("### Prerequisites").line()
      .append("- [Node.js](https://nodejs.org/)").line()
      .append("- [pnpm](https://pnpm.io/)").line()
      .append("- [Clasp](https://github.com/google/clasp) logged in (`clasp login`)").doubleLine();

    if (this.projectType === 'full') {
      this
        .append("This is a modern Google Apps Script workspace featuring a React frontend and a TypeScript backend, managed as a monorepo.").doubleLine()

        .append("### Installation").line()
        .append("```bash").line()
        .append("pnpm install").line()
        .append("```").doubleLine()

        .append("## 🛠 Available Commands").doubleLine()
        .append("- `pnpm run dev`: Starts the local development server for the frontend and watch mode for the backend.").line()
        .append("- `pnpm run build`: Compiles both frontend and backend projects.").line()
        .append("- `pnpm run push`: Builds everything and pushes the code to Google Apps Script automatically.").doubleLine()
        
        .append("## 📁 Structure").doubleLine()
        .append("- **/frontend**: React + Vite + TailwindCSS app.").line()
        .append("- **/backend**: Google Apps Script backend bundled with Vite.").doubleLine();
    } else if (this.projectType === 'backend') {
        this
          .append("A modern, standalone Google Apps Script backend project powered by TypeScript and Vite.").doubleLine()
        
          .append("### Installation").line()
          .append("```bash").line()
          .append("pnpm install").line()
          .append("```").doubleLine()
          
          .append("## 🛠 Available Commands").doubleLine()
          .append("- `pnpm run build`: Compiles the TypeScript code into a `.gs` file ready for Apps Script.").line()
          .append("- `pnpm run deploy`: Builds the code and pushes it directly to Google Apps Script via Clasp.").line()
          .append("- `pnpm run types`: Generates `.d.ts` typing files for your backend functions using `clasp-types`.").doubleLine();
    } else if (this.projectType === 'frontend') {
        this
          .append("A blazing fast React application bundled with Vite and styled with TailwindCSS, optimized for Google Apps Script environments.").doubleLine()

          .append("## 🚀 Getting Started").doubleLine()
          .append("### Installation").line()
          .append("```bash").line()
          .append("pnpm install").line()
          .append("```").doubleLine()
          
          .append("## 🛠 Available Commands").doubleLine()
          .append("- `pnpm run dev`: Starts the Vite local development server.").line()
          .append("- `pnpm run build`: Builds the application for production into the `dist` folder.").line()
          .append("- `pnpm run preview`: Locally previews the production build.").doubleLine();
    }

    this.append("---").doubleLine()
      .append("Generated with [clasp-templates](https://github.com/antune-ss/clasp-templates)");

    return this;
  }
}