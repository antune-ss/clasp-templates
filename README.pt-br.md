[clasp]: https://github.com/google/clasp
[TypeScript]: https://github.com/google/clasp/blob/master/docs/typescript.md
[clasp-types]: 

# Create Clasp Workspace (`clasp-templates`)

*(🇺🇸 [Read in English](./README.md))*

Uma interface de linha de comando (CLI) para criar rapidamente projetos modernos no Google Apps Script utilizando [TypeScript], Vite, React e TailwindCSS.

Pare de perder tempo configurando ferramentas de build, tipagens e ambientes para o Google Apps Script. O `create-clasp-workspace` configura tudo o que você precisa em segundos.

## ✨ Funcionalidades

- 🛠 **CLI Interativo**: Perguntas fáceis e diretas para configurar o seu projeto.
- 📦 **Pronto para Monorepo**: Suporte nativo a workspaces usando `pnpm`.
- ⚡ **Vite Bundler**: Builds extremamente rápidos tanto para o Frontend quanto para o Backend (GAS).
- 🤖 **Otimizado para IA**: Gera automaticamente um arquivo `AGENTS.md` que dá contexto e instruções para assistentes de Inteligência Artificial.
- 📘 **Tipagem Automática**: Integração com `clasp-types` para gerar automaticamente arquivos `.d.ts` do seu backend em Apps Script.

## 🚀 Como usar

Você pode criar um novo projeto diretamente, sem precisar instalar pacotes globais, utilizando `npx` ou `pnpm dlx`:

```bash
npx @antunes_s/clasp-templates@latest
# ou
pnpm dlx @antunes_s/clasp-templates@latest
```

Siga as instruções na tela para dar nome ao seu projeto, escolher o template e informar o seu Script ID do Google Apps Script.

## 🏗 Templates Disponíveis

Durante a criação, você pode escolher entre três estruturas de projeto:

### 1. Full Workspace (Frontend + Backend)
Configura um monorepo `pnpm` contendo:
- **`frontend/`**: Uma aplicação React + Vite + TailwindCSS.
- **`backend/`**: Um projeto moderno de Google Apps Script utilizando [TypeScript].
Inclui scripts npm pré-configurados para rodar ambos os ambientes simultaneamente e facilitar o deploy (push).

### 2. Apenas Backend (Backend Only)
Um projeto isolado para Google Apps Script.
- Usa [TypeScript] e Vite para empacotar (bundle) o código em um único arquivo `.gs`.
- Inclui integração com `clasp-types` para gerar automaticamente definições `.d.ts` das suas funções do servidor.

### 3. Apenas Frontend (Frontend Only)
Um projeto isolado React + Vite + TailwindCSS, configurado de forma otimizada para servir de interface para ambientes Google Apps Script.

## 📜 Licença

[Licença MIT](LICENSE)
