// ============================================================
//  Configurația Firebase a aplicației "Recepții camioane"
//  Înlocuiește valorile de mai jos cu cele din Firebase Console:
//  Project settings (rotița) -> Your apps -> aplicația Web -> SDK setup and configuration
// ============================================================
window.RECEPTII_CONFIG = {
  firebase: {
    apiKey: "LIPESTE-AICI-apiKey",
    authDomain: "proiectul-tau.firebaseapp.com",
    projectId: "proiectul-tau",
    storageBucket: "proiectul-tau.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:xxxxxxxxxxxxxxxx"
  },
  // Domeniul fictiv folosit pentru conturile operatorilor (ion -> ion@receptii.local).
  // Nu trebuie să existe real. Nu-l schimba după ce ai creat primii utilizatori.
  emailDomain: "receptii.local",
  // Numele afișat în antet
  appName: "Recepții camioane"
};
