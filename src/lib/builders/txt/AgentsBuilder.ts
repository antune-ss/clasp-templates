import { BuilderTxt } from "@/lib/builders/txt/BuilderTxt.js";

export class AgentsBuilder extends BuilderTxt {
  private projectType: string;

  constructor(projectType: string) {
    super();
    this.projectType = projectType;
  }

  public build(): BuilderTxt {
    this.append("# AGENTS.md").doubleLine()
        .append("Este documento descreve as regras, arquitetura e comandos deste projeto para orientar o trabalho de Agentes de IA.").doubleLine();

    if (this.projectType === 'full') {
      this.append("## Estrutura do Workspace").line()
          .append("Este é um workspace monorepo gerenciado com pnpm, contendo duas aplicações interligadas:").doubleLine()
          .append("- **frontend/**: Projeto React + Vite + TailwindCSS.").line()
          .append("- **backend/**: Projeto Google Apps Script moderno com TypeScript e bundler Vite.").doubleLine()
          
          .append("## Comandos de Build (Executados na raiz do projeto)").line()
          .append("- `pnpm run dev`: Inicia o ambiente de desenvolvimento (frontend local e watch no backend).").line()
          .append("- `pnpm run build`: Compila ambos os projetos (frontend e backend).").line()
          .append("- `pnpm run push`: Executa o build e faz o deploy automático para o Google Apps Script via Clasp.").doubleLine()
          
          .append("## Regras de Código").line()
          .append("- Use `pnpm` para gerenciar dependências. Nunca use `npm` ou `yarn`.").line()
          .append("- O código do backend deve ser estritamente tipado usando as definições de `google-apps-script`.").line()
          .append("- Para chamadas de API entre frontend e backend, utilize `google.script.run` com promessas.").doubleLine();
          
    } else if (this.projectType === 'backend') {
      this.append("## Estrutura do Projeto").line()
          .append("Este é um projeto **Google Apps Script (Backend Puro)** configurado com TypeScript e empacotado via Vite.").doubleLine()
          
          .append("## Comandos de Build").line()
          .append("- `pnpm run build`: Compila o código TypeScript em um arquivo `.gs` pronto para nuvem.").line()
          .append("- `pnpm run deploy`: Executa o build e utiliza o Clasp para fazer upload para o Google Apps Script.").line()
          .append("- `pnpm run types`: Gera os arquivos de tipagem (`.d.ts`) usando o pacote `clasp-types`.").doubleLine()
          
          .append("## Regras de Código").line()
          .append("- Use `pnpm` para gerenciar dependências.").line()
          .append("- Funções que precisam ser acessadas externamente ou pelo menu do Google Docs/Sheets devem ser injetadas globalmente.").line()
          .append("- Mantenha o arquivo `appsscript.json` atualizado ao incluir novas permissões OAuth ou bibliotecas (Services).").doubleLine();
          
    } else if (this.projectType === 'frontend') {
      this.append("## Estrutura do Projeto").line()
          .append("Este é um projeto **Frontend** construído com React, Vite e TailwindCSS, configurado para servir como uma interface para um backend em Google Apps Script.").doubleLine()
          
          .append("## Comandos de Build").line()
          .append("- `pnpm run dev`: Inicia o servidor de desenvolvimento local.").line()
          .append("- `pnpm run build`: Compila a aplicação para a pasta `dist` de forma otimizada.").doubleLine()
          
          .append("## Regras de Código").line()
          .append("- Use `pnpm` para gerenciar dependências.").line()
          .append("- O estilo deve ser feito exclusivamente através de classes utilitárias do TailwindCSS.").line()
          .append("- Componentes devem ser modulares, usar Functional Components e React Hooks.").doubleLine();
    }

    return this;
  }
}