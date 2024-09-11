# NBA PLAYER INSPECTOR

This can provide you NBA players stats from 2023 season.\
Made by **Camille Sylla** fullstack JavaScript developer.

## 1. Stack

| **Category**               | **Technology**           | **Version**        | **Description**                                                       |
| -------------------------- | ------------------------ | ------------------ | --------------------------------------------------------------------- |
| **Build Tool**             | Vite                     | ^5.4.1             | Fast development build tool optimized for modern web projects.        |
| **Programming Language**   | TypeScript               | ^5.5.3             | A statically typed superset of JavaScript.                            |
| **Frontend Framework**     | React (Library)          | ^18.3.1            | A JavaScript library for building user interfaces.                    |
| **Routing**                | React Router DOM         | ^6.26.2            | Declarative routing for React.                                        |
| **State Management**       | React Context API        | (in-built)         | Context API for managing state in React components.                   |
| **Component Library**      | Heroicons                | ^2.1.5             | Scalable icons for React from Tailwind Labs.                          |
| **Charting Library**       | Chart.js                 | ^4.4.4             | A simple and flexible charting library for web applications.          |
| **UI Styling**             | Tailwind CSS             | ^3.4.10            | A utility-first CSS framework for building custom designs quickly.    |
| **Linting**                | ESLint                   | ^9.9.0             | JavaScript and TypeScript linting tool.                               |
| **Code Formatting**        | Prettier                 | 3.3.3              | Code formatter ensuring consistent code style across the project.     |
| **Testing**                | Jest                     | ^29.7.0            | A JavaScript testing framework for unit tests and snapshots.          |
| **Testing (DOM)**          | Testing Library (React)  | ^16.0.1            | Tools for testing React components in a browser-like environment.     |
| **Testing (Renderer)**     | React Test Renderer      | ^18.3.1            | A renderer for testing React components.                              |
| **Commit Message Linting** | Commitlint               | ^19.4.1            | Lints commit messages according to the conventional commit format.    |
| **Pre-commit Hooks**       | Husky                    | ^9.1.5             | Pre-commit hooks to enforce code quality.                             |
| **Babel Preset**           | @babel/preset-react      | ^7.24.7            | Babel preset for compiling React JSX syntax.                          |
| **TypeScript Support**     | @babel/preset-typescript | ^7.24.7            | Babel preset for compiling TypeScript files.                          |
| **Module System**          | ECMAScript Modules       | `"type": "module"` | A built-in module system for managing JavaScript imports and exports. |

## 2. Features

- List of available players from the API

- Search for a player with the search bar and select him from matching results

- Get target player details from the last 25th games

## 3. Installation

### 3.1 - Project

- From your terminal run this commands

```
- git clone https://github.com/CamilleSylla/nba.git
- npm i
```

### 3.2 - API

- This app is using [BALLDONTLIEAPI](https://app.balldontlie.io/) and you will have to [create an account](https://app.balldontlie.io/signup) to get an API key.

- Once it's done, fill free to create `.env` file at the root of the repository (this file is already ignored from git). You can find variables names in `.env.example` file.

### 3.3 - Run APP

- Now you just have to run `npm run dev` and your app will be displayed locally on [http://localhost:5173/](https://docs.balldontlie.io/#introduction)

### 3.4 - Run test

- Test files are inside the folder `/test`.

- If you want to create other files make sure you name your file with this patern `<YOUR_FILE_NAME>.test.tsx`.

- Run `npm test` to test application.

## 4. Limitatons

- Free tier of the api only allow 2023 season stats

- The [BALLDONTLIEAPI](https://docs.balldontlie.io/#introduction) does not provide a search by name endpoint so we have to search only on 100 first players returned by the api ([see documentation](https://docs.balldontlie.io/#players))
