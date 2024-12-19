## Table of Contents

- [Table of Contents](#table-of-contents)
- [Setup](#setup)
- [Usage](#usage)
- [Structure](#structure)
- [.env](#env)

## Setup

```bash
# open folder with project
cd simple-shop-react

# install
$ yarn
```

## Usage

```bash
# run application in development mode
$ npm run dev

# run application in production watch mode
$ npm run preview

# build application
$ npm run build

# analyzing code for potential errors, bugs, and style issues
$ npm run lint

# automatically fixing some of the linting issues
$ npm run lint-fix
```

## Structure

Here's the directory structure of the project:<br>

- `dist`
- `public`
- `src`
  - `app`
    - `api`
    - `config`
    - `i18n`
    - `layouts`
    - `navigation`
    - `providers`
    - `store`
  - `components`
  - `pages`
  - `shared`

## .env

The project utilizes a `.env` file to manage configuration settings.
<br/>
To configure all variables for the application, create a `.env` file in the root directory of the project.

Add the following variables and replace `###` with the desired values:

```bash
# Application Configuration
VITE_APP_API_URL=###
VITE_NODE_ENV=###
```

> Look at `.env.example` file in the root of the project for example.
