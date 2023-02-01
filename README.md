
# Manga-react-native-app

This Project use this [api](https://github.com/RizkyFauziIlmi/Manga-API)

## Installation

### Instal the APK (for using and testing only)

* download apk from this [link](https://github.com/RizkyFauziIlmi/React-Native-Manga-App/releases/download/v3.3.3/Jozu.v3.3.3.apk). (Jozu 3.3.3)

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
