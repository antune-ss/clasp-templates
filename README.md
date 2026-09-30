# Create Clasp Workspace (`clasp-templates`)

*(🇧🇷 [Leia em Português](./README.pt-br.md))*

A command-line interface (CLI) to quickly scaffold modern Google Apps Script projects using TypeScript, Vite, React, and TailwindCSS. 

Stop wasting time configuring build tools, typings, and environments for Google Apps Script. `create-clasp-workspace` sets up everything you need in seconds.

## ✨ Features

- 🛠 **Interactive CLI**: Easy-to-use prompts to configure your project.
- 📦 **Monorepo Ready**: Built-in support for `pnpm` workspaces.
- ⚡ **Vite Bundler**: Extremely fast builds for both Frontend and Backend (GAS).
- 🤖 **AI-Friendly**: Automatically generates an `AGENTS.md` file giving context to AI assistants on how your project is structured.
- 📘 **Auto Typings**: Integrates with `clasp-types` to automatically generate `.d.ts` files for your Apps Script backend.

## 🚀 Usage

You can create a new project directly without installing anything globally by using `npx` or `pnpm dlx`:

```bash
npx @antunes_s/clasp-templates
# or
pnpm dlx @antunes_s/clasp-templates
```

Follow the interactive prompts to name your project, choose your template, and set up your Apps Script ID.

## 🏗 Available Templates

During setup, you can choose between three project structures:

### 1. Full Workspace (Frontend + Backend)
Sets up a `pnpm` monorepo containing:
- **`frontend/`**: A React + Vite + TailwindCSS application.
- **`backend/`**: A modern Google Apps Script project using TypeScript.
Includes pre-configured npm scripts to run both environments simultaneously and handle deployment seamlessly.

### 2. Backend Only
A standalone Google Apps Script project.
- Uses TypeScript and Vite to bundle code into a single `.gs` file.
- Includes `clasp-types` integration to generate `.d.ts` definitions of your server-side functions.

### 3. Frontend Only
A standalone React + Vite + TailwindCSS project, specially configured to serve as a user interface for Google Apps Script environments.

## 📜 License

[MIT License](LICENSE)
