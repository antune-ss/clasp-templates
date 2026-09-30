#!/usr/bin/env node

import { AppsscriptBuilder } from "@/lib/builders/json/AppsscriptBuilder.js";
import { ClaspBuilder } from "@/lib/builders/json/ClaspBuilder.js";
import { AgentsBuilder } from "@/lib/builders/txt/AgentsBuilder.js";
import { ReadmeBuilder } from "@/lib/builders/txt/ReadmeBuilder.js";
import { input, confirm, select } from "@inquirer/prompts";
import chalk from "chalk";
import fs from 'fs-extra';
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(chalk.blue.bold("\n🚀 Welcome to Create Clasp Workspace!\n"));

try {
  const projectName = await input({
    message: 'What is the name of your project?',
    default: 'my-gas-project',
    validate: (response: string) => {
      if (response.trim() === '') return 'The project name cannot be empty.';
      if (response.includes(' ')) return 'The project name cannot contain spaces. Please use dashes instead.';
      if (fs.existsSync(response)) return `A directory named "${response}" already exists. Please choose a different name.`;
      return true;
    }
  });

  const projectType = await select({
    message: 'What type of project do you want to scaffold?',
    choices: [
      {
        name: 'Full Workspace (Frontend + Backend)',
        value: 'full',
        description: 'React + Vite + Tailwind frontend and Google Apps Script backend'
      },
      {
        name: 'Backend Only',
        value: 'backend',
        description: 'Modern Google Apps Script setup with Vite'
      },
      {
        name: 'Frontend Only',
        value: 'frontend',
        description: 'React + Vite + Tailwind configured for GAS'
      }
    ]
  });

  let finalScriptId = "INSERT_YOUR_SCRIPT_ID_HERE";
  const wantId = await confirm({
    message: `Do you want to set your Google Apps Script ID now?`,
    default: true
  });

  if (wantId) {
    finalScriptId = await input({
      message: 'What is your Script ID? (You can find it in your project URL)',
      default: '',
      validate: (response: string) => {
        if (response.trim() === '') return 'The Script ID cannot be empty.';
        if (response.includes(' ')) return 'A valid Script ID does not contain spaces.';
       
        return true; 
      }
    });
  }

  const proceed = await confirm({
    message: `I'm going to create a ${projectType} project in ./${projectName}. Proceed?`,
    default: true
  });

  if (!proceed) {
    console.log(chalk.yellow('\nOperation cancelled.'));
    process.exit(0);
  }

  console.log(chalk.cyan('\nScaffolding your project...'));

  // process.cwd() pega exatamente a pasta onde o usuário abriu o terminal
  const targetDir = path.resolve(process.cwd(), projectName);

  // Como o código final roda a partir da pasta 'dist', tem q voltar um nível ('..') 
  // para achar a pasta 'templates' na raiz do pacote instalado.
  const templateDir = path.resolve(__dirname, '../templates');

  fs.mkdirSync(targetDir, { recursive: true });

  const filterFiles = (src: string) => {
    const folderName = path.basename(src);
    return folderName !== 'node_modules' && folderName !== 'dist';
  };

  if (projectType === 'full') {
    fs.copySync(templateDir, targetDir, { filter: filterFiles });

    injectProject(path.join(targetDir, 'frontend'), `${projectName}-frontend`);
    injectProject(path.join(targetDir, 'backend'), `${projectName}-backend`);

    new ClaspBuilder(finalScriptId).build(targetDir);
    new AppsscriptBuilder()
      .enableWebApp()
      .build(targetDir);

    const workspaceYaml = `packages:\n  - 'frontend'\n  - 'backend'\n`;
    fs.writeFileSync(path.join(targetDir, 'pnpm-workspace.yaml'), workspaceYaml);
    
    const rootPackageJson = {
      name: projectName,
      private: true,
      scripts: {
        "dev": "pnpm -r run dev",
        "build": "pnpm -r run build",
        "push": "pnpm build && clasp push"
      }
    };
    fs.writeJsonSync(path.join(targetDir, 'package.json'), rootPackageJson, { spaces: 2 });

  } else if (projectType === 'backend') {
    fs.copySync(path.join(templateDir, 'backend'), targetDir , { filter: filterFiles });

    injectProject(targetDir, projectName, true);

    new ClaspBuilder(finalScriptId).build(targetDir);
    new AppsscriptBuilder().build(targetDir);

  } else if (projectType === 'frontend') {
    fs.copySync(path.join(templateDir, 'frontend'), targetDir , { filter: filterFiles });

    injectProject(targetDir, projectName, true);

    new ClaspBuilder(finalScriptId).build(targetDir);
    new AppsscriptBuilder()
      .enableWebApp()
      .build(targetDir);
  }

  const agentsBuilder = new AgentsBuilder(projectType);
  const agentsText = agentsBuilder.build().getText();
  fs.writeFileSync(path.join(targetDir, 'AGENTS.md'), agentsText);

  const readmeBuilder = new ReadmeBuilder(projectName, projectType);
  const readmeText = readmeBuilder.build().getText();
  fs.writeFileSync(path.join(targetDir, "README.md"), readmeText);

  console.log(chalk.green.bold('\nWorkspace successfully created!'));
  console.log(`\nNext steps:`);
  console.log(chalk.blue(`  cd ${projectName}`));
  console.log(chalk.blue(`  pnpm install`));
} catch (e: any) {
  if (e.name === 'ExitPromptError') {
    console.log(chalk.yellow('\nOperation cancelled. Exiting...'));
  } else {
    console.error(chalk.red('\nUnexpected error: '), e);
  }
}

function injectProject(folderPath: string, projectName: string, isStandalone: boolean = false) {
  const pkgPath = path.join(folderPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = fs.readJsonSync(pkgPath);
    pkg.name = projectName;

    if (isStandalone && pkg.scripts && pkg.scripts.types) {
      // Cria um comando duplo: gera a tipagem padrão (para publicar como Lib no NPM) 
      // E a tipagem de cliente (para consumir em outro projeto frontend ).
      pkg.scripts.types = "clasp-types -s ./src -o ./types/lib.d.ts && clasp-types --client -s ./src -o ./types/client.d.ts";
    }

    fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });
  }

  const gitignorePath = path.join(folderPath, '_gitignore');
  if (fs.existsSync(gitignorePath)) {
    fs.renameSync(gitignorePath, path.join(folderPath, '.gitignore'));
  }

  const npmignorePath = path.join(folderPath, '_npmignore');
  if (fs.existsSync(npmignorePath)) {
    fs.renameSync(npmignorePath, path.join(folderPath, '.npmignore'));
  }
}

