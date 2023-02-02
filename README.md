# React Native Manga App

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

***Author: [@rizkyfauziilmi](https://github.com/RizkyFauziIlmi)***

This is a React Native application for manga reading. The repository provides a user-friendly interface for manga enthusiasts to easily browse and read their favorite manga series. The app features a sleek design, fast navigation, and a smooth reading experience optimized for mobile devices. With this application, users can keep track of their reading progress, discover new manga, and stay up-to-date with the latest releases. The source code is open-source and contributions from the community are always welcome

## List of Contents
- [Demo](https://github.com/RizkyFauziIlmi/React-Native-Manga-App/edit/master/README.md#demo)
- [Installation](https://github.com/RizkyFauziIlmi/React-Native-Manga-App/edit/master/README.md#installation)
   - [Install the APK](https://github.com/RizkyFauziIlmi/React-Native-Manga-App/edit/master/README.md#install-the-apk-for-using-and-testing-only)
   - [Using repository](https://github.com/RizkyFauziIlmi/React-Native-Manga-App/edit/master/README.md#using-repository-for-customize-the-app)
- [Tech Stack](https://github.com/RizkyFauziIlmi/React-Native-Manga-App/edit/master/README.md#tech-stack)

## Demo

<div style="display: flex">
  <img src="https://github.com/RizkyFauziIlmi/React-Native-Manga-App/blob/master/assets/UI.jpg" width="400" >
  <img src="https://github.com/RizkyFauziIlmi/React-Native-Manga-App/blob/master/assets/UIGIF.gif" width="150" >
</div>

## Installation

### Install the APK (for using and testing only)

* download apk from this [Release Version](https://github.com/RizkyFauziIlmi/React-Native-Manga-App/releases/tag/v3.3.3). (Jozu v3.3.3)

* after that install in your device

### Using repository (for customize the app)

* remote repo

```bash
  git remote https://github.com/RizkyFauziIlmi/React-Native-Manga-App.git
  cd React-Native-Manga-App
```

* install dependencies

```bash
  npm install
  // or
  yarn install
```
* create `.env` file (optional: `.env.local`, `.env.production`, `.env.production.local`, `.env.development`, `.env.development.local`)

To run this project, you will need to add the following environment variables to your .env file


`apiKey`

`authDomain`

`projectId`

`messagingSenderId`

`appId`

`measurementId`

* Change Environtment Variable in `firebase/firebaseConfig.js`

```bash
const firebaseConfig = {
  apiKey: you're api key here...,
  authDomain: you're authDomain here...,
  projectId: you're projectId here...,
  messagingSenderId: you're messagingSenderId here...,
  appId: you're app id here...,
  measurementId: you're measurementId here...
}
```

***NOTE: this project use firebase authentication, to make authentication work you must enable from your firebase console***

* run the project by this command

```bash
npm run start
// or
yarn run start
```

## Tech Stack

**Client:** React-native, native-base

**Server:** Node, Express, MongoDB [(see more about API)](https://github.com/RizkyFauziIlmi/Manga-API), Firebase
