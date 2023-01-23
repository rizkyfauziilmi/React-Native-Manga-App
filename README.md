
## Installation

### Instal the APK (for using and testing only)

* download apk from this [link](https://drive.google.com/file/d/1Ic5JGao-Qdrp0iHMUOReW55MeWC9075a/view?usp=share_link). (Jozu 3.2.2)

* after that install in your device

### Using repository (for customize the app)

* remote repo

```bash
  git remote https://github.com/RizkyFauziIlmi/Manga-react-native-app.git
  cd Manga-react-native-app
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
