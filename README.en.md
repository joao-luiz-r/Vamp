<p align="center">
  <img src="docs/banner.png" alt="Vampire Archives Banner" width="100%" />
</p>

<p align="center">
  <a href="README.md">🇧🇷 Português</a> · <a href="README.en.md">🇺🇸 English</a>
</p>

<h1 align="center">🦇 Vampire Archives</h1>

<p align="center">
  <strong>Digital Character Sheet for Vampire: The Masquerade (3rd Edition)</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white" alt=".NET 8" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License MIT" />
  <img src="https://img.shields.io/badge/i18n-En--Us%20%7C%20Pt--Br-orange" alt="i18n" />
</p>

---

## 📖 About the Project

**Vampire Archives** is a local application for creating, editing and managing character sheets for the tabletop RPG **Vampire: The Masquerade**, faithfully following the rules and aesthetics of the **3rd Edition**.

The application was designed to be **portable and offline** — it runs locally with no database, cloud, or complex installation required. All storage is done via JSON and XML files in the application's own directory.

### ✨ Highlights

- 🎭 **Complete official sheet** — Attributes, Abilities, Disciplines, Essence (Willpower, Humanity, Health, Blood Pool)
- 🏰 **Immersive gothic interface** — Design inspired by aged parchment with Cinzel typography, crimson accents and smooth animations
- 🌐 **Bilingual** — Full interface in English (En-Us) and Brazilian Portuguese (Pt-Br), with instant switching
- 🎲 **Faithful points system** — Dot-based input exactly like the original sheet in the book
- 💡 **Contextual tooltips** — Explanatory descriptions for each level of every attribute, ability and discipline
- 🗑️ **Full CRUD** — Create, view, edit and delete characters with custom confirmation
- 🔒 **Safe data** — Atomic writes with temp-file swap and automatic backup of corrupted data

---

## 🏛️ Architecture

The application follows a **decoupled Client-Server** architecture, communicating via REST API:

```
┌─────────────────────────────────────────────────────────────┐
│                    Vampire Archives                         │
│                                                             │
│  ┌──────────────────────┐     ┌──────────────────────────┐  │
│  │    Vamp.Client        │     │      Vamp.Api            │  │
│  │    (React 19 + Vite)  │────▶│     (.NET 8 Web API)     │  │
│  │                       │ REST│                          │  │
│  │  ┌─────────────────┐  │     │  ┌────────────────────┐  │  │
│  │  │  Components     │  │     │  │  Controllers       │  │  │
│  │  │  ├─ CharacterForm│  │     │  │  ├─ Character      │  │  │
│  │  │  ├─ CharacterSheet│ │     │  │  └─ Preferences    │  │  │
│  │  │  ├─ DotsInput    │  │     │  ├────────────────────┤  │  │
│  │  │  ├─ Tooltip      │  │     │  │  Services          │  │  │
│  │  │  └─ LanguageSwitch│ │     │  │  ├─ JsonStorage    │  │  │
│  │  ├─────────────────┤  │     │  │  └─ XmlPreferences  │  │  │
│  │  │  Context         │  │     │  ├────────────────────┤  │  │
│  │  │  ├─ Localization │  │     │  │  Models            │  │  │
│  │  │  ├─ Toast        │  │     │  │  ├─ Character      │  │  │
│  │  │  └─ Confirm      │  │     │  │  ├─ Attributes     │  │  │
│  │  ├─────────────────┤  │     │  │  ├─ Abilities       │  │  │
│  │  │  Constants       │  │     │  │  └─ Discipline     │  │  │
│  │  │  ├─ locales      │  │     │  └────────────────────┘  │  │
│  │  │  ├─ vtmRules     │  │     │                          │  │
│  │  │  └─ dotDescriptions│ │    │  ┌────────────────────┐  │  │
│  │  └─────────────────┘  │     │  │  Storage (local)    │  │  │
│  └──────────────────────┘     │  │  ├─ characters.json  │  │  │
│                                │  │  └─ preferences.xml │  │  │
│                                │  └────────────────────┘  │  │
│                                └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧰 Tech Stack

| Layer | Technology | Version | Purpose |
|--------|-----------|--------|-----------|
| **Frontend** | React | 19 | Reactive, componentized UI |
| **Bundler** | Vite | 7 | Ultra-fast build with HMR |
| **Frontend Tests** | Vitest + Testing Library | 4 / 16 | Component unit tests |
| **Backend** | ASP.NET Core Web API | .NET 8 | REST API, validation, persistence |
| **Backend Tests** | MSTest | — | API unit tests |
| **Persistence** | JSON (data) + XML (preferences) | — | Portable local storage |
| **API Documentation** | Swagger / OpenAPI | 6.6 | Interactive endpoint exploration |

---

## 📂 Project Structure

```
Vamp/
├── Vamp.sln                         # .NET solution
│
├── Vamp.Api/                        # Backend (.NET 8 Web API)
│   ├── Controllers/
│   │   ├── CharacterController.cs   # Character CRUD
│   │   └── PreferencesController.cs # User language and preferences
│   ├── Models/
│   │   ├── Character.cs             # Complete model with DataAnnotations
│   │   └── UserPreferences.cs       # Preferences model
│   ├── Services/
│   │   ├── JsonStorageService.cs    # Atomic JSON persistence
│   │   ├── IPreferencesService.cs   # Abstraction interface
│   │   └── XmlPreferencesService.cs # Thread-safe XML implementation
│   ├── Program.cs                   # Configuration and pipeline
│   ├── characters.json              # Character storage
│   └── user_preferences.xml         # User preferences
│
├── Vamp.Api.Tests/                  # Backend unit tests
│
├── Vamp.Client/                     # Frontend (React 19 + Vite)
│   └── src/
│       ├── components/
│       │   ├── CharacterForm.jsx        # Create/edit form
│       │   ├── CharacterForm.test.jsx   # Form tests
│       │   ├── CharacterSheet.jsx       # Full sheet view
│       │   ├── DotsInput.jsx            # Dot input (●●●○○)
│       │   ├── DotInput.jsx             # Individual dot with tooltip
│       │   ├── AttributeInput.jsx       # Attribute wrapper
│       │   ├── AbilityInput.jsx         # Ability wrapper
│       │   ├── Tooltip.jsx              # Reusable custom tooltip
│       │   ├── LanguageSwitcher.jsx     # En-Us / Pt-Br toggle
│       │   ├── VampireLogo.jsx          # Animated SVG logo
│       │   └── Create/                  # Modular form sections
│       │       ├── AttributesSection.jsx
│       │       ├── AbilitiesSection.jsx
│       │       ├── DisciplinesSection.jsx
│       │       └── EssenceSection.jsx
│       ├── context/
│       │   ├── LocalizationContext.jsx  # i18n provider
│       │   ├── ToastContext.jsx         # Gothic toast notifications
│       │   └── ConfirmContext.jsx       # Custom confirmation modal
│       ├── constants/
│       │   ├── locales.js               # All i18n strings (En/Pt)
│       │   ├── vtmRules.js              # Clans, disciplines, archetypes
│       │   └── dotDescriptions.js       # Per-level dot descriptions
│       ├── services/
│       │   ├── characterService.js      # Character API client
│       │   └── preferencesService.js    # Preferences API client
│       ├── App.jsx                      # Root component
│       ├── main.jsx                     # Entry point with providers
│       └── index.css                    # Complete design system
│
├── deploy/                          # Portable distribution build
└── docs/                            # Documentation resources
```

---

## 🎮 Features

### Character Sheet

The sheet faithfully follows the **3rd Edition** Vampire: The Masquerade layout:

| Section | Fields | Details |
|-------|--------|---------|
| **Identity** | Name, Player, Chronicle, Nature, Demeanor, Concept, Clan, Generation, Sire | Dropdown selection of official Archetypes |
| **Attributes** | Strength, Dexterity, Stamina / Charisma, Manipulation, Appearance / Perception, Intelligence, Wits | 3 categories (Physical, Social, Mental) in a grid layout |
| **Abilities** | 10 Talents, 10 Skills, 10 Knowledges | 30 official skills from the core book |
| **Disciplines** | Dynamic per clan | Automatically filtered by the selected clan |
| **Essence** | Willpower, Humanity, Health, Blood Pool | Validated ranges (e.g. Generation 3-16, Humanity 0-10) |

### Available Clans

| Clan | Disciplines |
|-----|------------|
| 🦁 Ventrue | Dominate, Fortitude, Presence |
| 🔥 Brujah | Celerity, Potence, Presence |
| 🌹 Toreador | Auspex, Celerity, Presence |
| 🐺 Gangrel | Animalism, Fortitude, Protean |
| 🎭 Malkavian | Auspex, Dementation, Obfuscate |
| 🐀 Nosferatu | Animalism, Obfuscate, Potence |
| 🔮 Tremere | Auspex, Dominate, Thaumaturgy |
| ❓ Caitiff | Free choice |

### Interface & UX

- **Dots System** — Visual input identical to the paper sheet (●●●○○), click to fill/empty
- **Smart tooltips** — Hover over any dot reveals that level's description (e.g. "*Strength 3: You can break a board with a punch*")
- **Toast notifications** — Styled visual feedback for creating, editing and deleting characters
- **Confirmation Modal** — Custom gothic dialog replacing the native browser alert
- **Language Switching** — Instant toggle between English and Portuguese, including all dot descriptions

---

## 🚀 How to Run

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)

### Development Mode

**1. Backend (API)**
```bash
cd Vamp.Api
dotnet run --launch-profile http
```
> API available at `http://localhost:5022`
> Swagger UI at `http://localhost:5022/swagger`

**2. Frontend (React)**
```bash
cd Vamp.Client
npm install
npm run dev
```
> App available at `http://localhost:5173`

### Distribution Mode (Portable)

The `deploy/` folder contains a pre-compiled version that runs without installing dependencies:

```bash
cd deploy
./Vamp.Api.exe
```
> The app serves both the API and the compiled frontend at `http://localhost:5022`

---

## 🧪 Tests

```bash
# Frontend tests (Vitest)
cd Vamp.Client
npm test

# Backend tests (MSTest)
cd ..
dotnet test
```

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|------|-----------|
| `GET` | `/api/character` | Lists all characters |
| `GET` | `/api/character/{id}` | Fetches a character by ID |
| `POST` | `/api/character` | Creates a new character |
| `PUT` | `/api/character/{id}` | Updates an existing character |
| `DELETE` | `/api/character/{id}` | Removes a character |
| `GET` | `/api/preferences` | Fetches user preferences |
| `PUT` | `/api/preferences` | Updates preferences |

---

## 🛡️ Technical Decisions

### Atomic Writes (JsonStorageService)

To prevent data corruption from crashes or abrupt shutdowns, persistence follows the **write-to-temp-then-rename** pattern:

```
1. Serialize data → characters.json.tmp
2. Rename characters.json.tmp → characters.json (atomic OS operation)
```

If a read finds corrupted JSON, the file is automatically renamed to `characters.json.corrupt.bak` with a timestamp, and a new empty storage is created.

### Internationalization (i18n)

The localization system is entirely client-side via React Context, with no external dependencies:

- **`LocalizationContext`** — Provider exposing the `t(key)` translation function
- **`locales.js`** — ~400 lines with all strings organized by section
- **`dotDescriptions.js`** — ~38K of detailed RPG descriptions for each level of every attribute/ability

### Thread-Safety (XmlPreferencesService)

Preference reads and writes use a `lock` to guarantee thread-safety in concurrent-request environments.

### Data Validation (DataAnnotations)

The `Character` model uses .NET validation annotations to guarantee integrity:

```csharp
[Required] Name              // Required
[Range(3, 16)] Generation    // Valid VtM generations
[Range(0, 10)] Willpower     // Willpower
[Range(0, 10)] Humanity      // Humanity
[Range(0, 50)] BloodPool     // Blood Pool
```

---

## 🎨 Design System

The interface is built with pure (vanilla) CSS following a visual palette inspired by the gothic VtM universe:

| Token | Value | Use |
|-------|-------|-----|
| `--bg-color` | `#f7f2e8` | Parchment background |
| `--text-color` | `#1a1a1a` | Main text |
| `--accent-color` | `#900` | Crimson accents |
| `--border-color` | `#8b7d6b` | Aged leather borders |
| `--font-heading` | Cinzel | Gothic serif headings |
| `--font-body` | Lato | Readable body text |
| `--texture` | SVG fractal noise | Subtle aged paper texture |

---

## 🌍 Internationalization

| Key | English | Português |
|-------|---------|-----------|
| `header.title` | VAMPIRE | VAMPIRO |
| `action.embrace` | Embrace the Night | Abraçar a Noite |
| `action.confirm_delete` | Are you sure you want to delete this Kindred? | Tem certeza que deseja apagar este Membro? |
| `label.willpower` | Willpower | Força de Vontade |
| `label.humanity` | Humanity | Humanidade |
| `label.blood_pool` | Blood Pool | Parada de Sangue |

> Plus over **200 keys** covering all sections, tooltips, notifications and error messages.

---

## 📜 License

This project is an unofficial fan work. **Vampire: The Masquerade** is a trademark of Paradox Interactive / World of Darkness LLC. This software is provided for personal, non-commercial use.

---

<p align="center">
  <em>"The Beast will inherit the earth, and we will inherit the Beast."</em>
</p>

<p align="center">
  Made with 🩸 by a World of Darkness fan
</p>
