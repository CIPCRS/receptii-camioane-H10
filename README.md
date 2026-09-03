# Recepții camioane

Aplicație web (PWA) pentru evidența camioanelor descărcate în depozit: furnizor, număr auto, paleți, cutii, operator, probleme apărute și cronometru automat pe etape (descărcare, verificare fizică / BIM, recepție sistem, etichetare, control calitate, alocare la raft), comparat cu timpii standard per furnizor. Funcționează pe PC, Android și iOS, cu date partajate în timp real prin Firebase.

## Conținutul pachetului

| Fișier | Rol |
|---|---|
| `index.html` | Aplicația (un singur fișier, HTML + CSS + JS) |
| `config.js` | **Aici lipești configurația Firebase** |
| `firestore.rules` | Regulile de securitate pentru baza de date (se lipesc în Firebase Console) |
| `manifest.json`, `sw.js`, `icons/` | Instalare ca aplicație pe telefon și funcționare offline |

Costuri: 0. Firebase planul Spark (gratuit, fără card) și GitHub Pages (gratuit pentru repository public).

---

## Pasul 1 — Proiectul Firebase (≈10 minute)

1. Intră pe <https://console.firebase.google.com> cu un cont Google (recomandat: un cont al firmei, nu personal).
2. **Create a project** → nume (ex. `receptii-depozit`) → poți dezactiva Google Analytics → **Create**.
3. Meniul din stânga **Build → Firestore Database → Create database**:
   - Location: `eur3 (europe-west)` sau `europe-west3 (Frankfurt)` — datele rămân în UE. *Nu se mai poate schimba ulterior.*
   - **Start in production mode** → Create.
4. **Build → Authentication → Get started** → tab **Sign-in method** → **Email/Password** → Enable → Save.
5. Tot în **Authentication → Settings → Authorized domains → Add domain**: adaugă `NUMELE-TAU.github.io` (îl afli la pasul 3).
6. Rotița **Project settings → Your apps → iconița Web `</>`** → nickname `receptii` (nu bifa Hosting) → **Register app**. Copiază blocul `firebaseConfig` (apiKey, authDomain, projectId …).

## Pasul 2 — Regulile de securitate (2 minute)

**Firestore Database → Rules** → șterge conținutul → lipește tot din fișierul `firestore.rules` → **Publish**.

Regulile permit: citirea listei de nume de operatori fără login (ca să apară butoanele pe ecranul de conectare), iar tot restul (recepții, furnizori, setări) doar utilizatorilor autentificați. Lista de operatori poate fi modificată doar de administratori.

> Nu pune niciodată `allow read, write: if true;` — ar permite oricui de pe internet să citească și să șteargă datele.

## Pasul 3 — Primul utilizator (administratorul)

**Authentication → Users → Add user**:
- Email: `adrian@receptii.local` (domeniul e fictiv, nu trebuie să existe; trebuie să coincidă cu `emailDomain` din `config.js`)
- Password: PIN-ul tău de **6 cifre** (ex. `482913`)

Restul operatorilor îi adaugi din aplicație, nu din consolă.

## Pasul 4 — GitHub Pages (5 minute)

1. Cont pe <https://github.com> → **New repository** → nume `receptii-camioane`, **Public** → Create.
2. **Add file → Upload files** → trage toate fișierele din acest pachet (inclusiv folderul `icons`) → **Commit changes**.
3. Deschide `config.js` în GitHub → creion (Edit) → înlocuiește valorile din `firebase: { … }` cu blocul copiat la pasul 1.6 → Commit.
4. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, folder `/ (root)` → Save**.
5. După ~1 minut, adresa aplicației apare tot acolo: `https://NUMELE-TAU.github.io/receptii-camioane/`.
   Verifică că ai adăugat `NUMELE-TAU.github.io` la pasul 1.5.

## Pasul 5 — Prima configurare în aplicație

Deschide adresa. Cum nu există încă operatori, apare ecranul **Prima configurare**: numele tău, email-ul creat la pasul 3 și PIN-ul. Contul tău devine administrator. Furnizorii din fișierul Excel (29, cu timpii standard) și catalogul de probleme se încarcă automat în baza de date la prima pornire.

Apoi **Setări → Operatori**: adaugi fiecare coleg cu nume + PIN de 6 cifre (bifează *administrator* pentru cine mai poate adăuga operatori). Contul se creează automat în Firebase.

## Pasul 6 — Instalarea pe telefoane

- **Android (Chrome):** deschide adresa → meniul ⋮ → **Adaugă pe ecranul principal** / **Instalează aplicația**.
- **iPhone / iPad (Safari):** deschide adresa → butonul **Partajare** (pătratul cu săgeată) → **Adaugă pe ecranul principal**.

Aplicația apare cu iconiță, pe tot ecranul, și rămâne conectată. Butonul **Ieșire** din antet schimbă utilizatorul (util pe telefoane comune, pe schimburi).

---

## Utilizare

- **＋ Recepție nouă** → furnizor (sau *Furnizor nou*), nr. auto, operator (preselectat cel conectat), paleți. Cronometrul pornește imediat, împreună cu etapa *Descărcare camion*.
- Pe cardul camionului apeși etapele pe măsură ce le începi; cea anterioară se închide automat. Un click pe etapa activă o oprește (pauză).
- Bifezi problemele apărute, completezi paleți / cutii / observații oricând pe parcurs.
- **✔ Terminare recepție** oprește cronometrul; recepția trece în **Istoric**, unde se poate filtra, corecta, redeschide sau șterge, și exporta **CSV** (se deschide direct în Excel; pe telefon apare meniul de partajare).
- Culorile cronometrului: verde = în standard, portocaliu = peste standard, roșu = peste 125 % din standard.

## Administrare

| Ce vrei | Unde |
|---|---|
| Adaugă / dezactivează operator | Aplicație → Setări → Operatori (doar administratori) |
| Îți schimbi propriul PIN | Aplicație → Setări → Contul meu |
| Resetezi PIN-ul altcuiva | Dezactivează-l în aplicație → Firebase Console → Authentication → Users → șterge utilizatorul → adaugă-l din nou în aplicație cu PIN nou |
| Elimini complet un fost angajat | Dezactivează-l în aplicație **și** șterge-l din Authentication → Users |
| Al doilea administrator Firebase (recomandat) | Project settings → Users and permissions → Add member → rol Owner |
| Export complet al datelor | Aplicație → Istoric → Export CSV, sau Firestore → Import/Export din Google Cloud Console |
| Consum / cote | Firebase Console → Usage and billing |

## Limite și observații

- Planul gratuit: 1 GB stocare, 50 000 citiri / 20 000 scrieri pe zi. O recepție consumă ~10–20 scrieri; la 30 camioane/zi și 5 telefoane ești sub 10 % din limită. Cotele se resetează zilnic; la depășire aplicația nu mai salvează până a doua zi, dar nu apar costuri.
- PIN-ul trebuie să aibă exact 6 cifre (Firebase cere parolă de minimum 6 caractere). Încercările repetate greșite sunt blocate temporar automat.
- `firebaseConfig` din `config.js` este public prin natura lui; securitatea vine din reguli + autentificare, nu din ascunderea lui.
- Aplicația merge și fără semnal (deschidere din cache, modificări trimise când revine conexiunea), cu condiția să fi fost deschisă cel puțin o dată online pe dispozitivul respectiv.
- Actualizări: înlocuiești `index.html` în GitHub; telefoanele primesc versiunea nouă la următoarea deschidere (uneori a doua deschidere, din cauza cache-ului).

## Structura datelor (Firestore)

```
receptions/{id}     o recepție: supplier, plate, operator, pallets, boxes, ref, note, problems[],
                    status (active|done), startedAt, finishedAt, stdTotal, segments[{s, a, b}]
config/suppliers    { list: [{ name, std:{unload,check,receipt,label,quality,rack}, remarks }] }
config/settings     { problems: [...] }
public/operators    { list: [{ name, email, active, admin }], admins: [email] }
```
