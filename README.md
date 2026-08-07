<p align="center">
  <img src="docs/banner.png" alt="Vampire Archives Banner" width="100%" />
</p>

<h1 align="center">🦇 Vampire Archives</h1>

<p align="center">
  <strong>Ficha de Personagem Digital para Vampiro: A Máscara (3ª Edição)</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white" alt=".NET 8" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License MIT" />
  <img src="https://img.shields.io/badge/i18n-En--Us%20%7C%20Pt--Br-orange" alt="i18n" />
</p>

---

## 📖 Sobre o Projeto

**Vampire Archives** é uma aplicação local para criação, edição e gerenciamento de fichas de personagem do RPG de mesa **Vampiro: A Máscara (Vampire: The Masquerade)**, seguindo fielmente as regras e a estética da **3ª Edição**.

A aplicação foi projetada para ser **portátil e offline** — roda localmente sem necessidade de banco de dados, cloud ou qualquer instalação complexa. Todo o armazenamento é feito em arquivos JSON e XML no próprio diretório da aplicação.

### ✨ Destaques

- 🎭 **Ficha oficial completa** — Atributos, Habilidades, Disciplinas, Essência (Força de Vontade, Humanidade, Vitalidade, Parada de Sangue)
- 🏰 **Interface gótica imersiva** — Design inspirado em pergaminhos envelhecidos com tipografia Cinzel, acentos em carmesim e animações suaves
- 🌐 **Bilíngue** — Interface completa em Inglês (En-Us) e Português Brasileiro (Pt-Br), com troca instantânea
- 🎲 **Sistema de pontos fiel** — Input por bolinhas (dots) exatamente como na ficha original do livro
- 💡 **Tooltips contextuais** — Descrições explicativas para cada nível de cada atributo, habilidade e disciplina
- 🗑️ **CRUD completo** — Criar, visualizar, editar e excluir personagens com confirmação customizada
- 🔒 **Dados seguros** — Escrita atômica com swap de arquivo temporário e backup automático de dados corrompidos

---

## 🏛️ Arquitetura

A aplicação segue uma arquitetura **Client-Server desacoplada**, com comunicação via REST API:

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

## 🧰 Stack Tecnológica

| Camada | Tecnologia | Versão | Propósito |
|--------|-----------|--------|-----------|
| **Frontend** | React | 19 | UI reativa e componentizada |
| **Bundler** | Vite | 7 | Build ultra-rápido com HMR |
| **Testes Frontend** | Vitest + Testing Library | 4 / 16 | Testes unitários de componentes |
| **Backend** | ASP.NET Core Web API | .NET 8 | REST API, validação, persistência |
| **Testes Backend** | MSTest | — | Testes unitários da API |
| **Persistência** | JSON (dados) + XML (preferências) | — | Armazenamento local portátil |
| **Documentação API** | Swagger / OpenAPI | 6.6 | Exploração interativa dos endpoints |

---

## 📂 Estrutura do Projeto

```
Vamp/
├── Vamp.sln                         # Solution .NET
│
├── Vamp.Api/                        # Backend (.NET 8 Web API)
│   ├── Controllers/
│   │   ├── CharacterController.cs   # CRUD de personagens
│   │   └── PreferencesController.cs # Idioma e preferências do usuário
│   ├── Models/
│   │   ├── Character.cs             # Modelo completo com DataAnnotations
│   │   └── UserPreferences.cs       # Modelo de preferências
│   ├── Services/
│   │   ├── JsonStorageService.cs    # Persistência atômica em JSON
│   │   ├── IPreferencesService.cs   # Interface de abstração
│   │   └── XmlPreferencesService.cs # Implementação XML thread-safe
│   ├── Program.cs                   # Configuração e pipeline
│   ├── characters.json              # Armazenamento dos personagens
│   └── user_preferences.xml         # Preferências do usuário
│
├── Vamp.Api.Tests/                  # Testes unitários do backend
│
├── Vamp.Client/                     # Frontend (React 19 + Vite)
│   └── src/
│       ├── components/
│       │   ├── CharacterForm.jsx        # Formulário de criação/edição
│       │   ├── CharacterForm.test.jsx   # Testes do formulário
│       │   ├── CharacterSheet.jsx       # Visualização da ficha completa
│       │   ├── DotsInput.jsx            # Input de bolinhas (●●●○○)
│       │   ├── DotInput.jsx             # Dot individual com tooltip
│       │   ├── AttributeInput.jsx       # Wrapper para atributos
│       │   ├── AbilityInput.jsx         # Wrapper para habilidades
│       │   ├── Tooltip.jsx              # Tooltip customizado reutilizável
│       │   ├── LanguageSwitcher.jsx     # Alternância En-Us / Pt-Br
│       │   ├── VampireLogo.jsx          # Logo animado SVG
│       │   └── Create/                  # Seções modulares do formulário
│       │       ├── AttributesSection.jsx
│       │       ├── AbilitiesSection.jsx
│       │       ├── DisciplinesSection.jsx
│       │       └── EssenceSection.jsx
│       ├── context/
│       │   ├── LocalizationContext.jsx  # Provider de internacionalização
│       │   ├── ToastContext.jsx         # Notificações toast góticas
│       │   └── ConfirmContext.jsx       # Modal de confirmação customizado
│       ├── constants/
│       │   ├── locales.js               # Todas as strings i18n (En/Pt)
│       │   ├── vtmRules.js              # Clãs, disciplinas, arquétipos
│       │   └── dotDescriptions.js       # Descrições por nível dos dots
│       ├── services/
│       │   ├── characterService.js      # API client para personagens
│       │   └── preferencesService.js    # API client para preferências
│       ├── App.jsx                      # Componente raiz
│       ├── main.jsx                     # Entry point com providers
│       └── index.css                    # Design system completo
│
├── deploy/                          # Build de distribuição portátil
└── docs/                            # Recursos de documentação
```

---

## 🎮 Funcionalidades

### Ficha de Personagem

A ficha segue fielmente o layout da **3ª Edição** do Vampiro: A Máscara:

| Seção | Campos | Detalhes |
|-------|--------|---------|
| **Identidade** | Nome, Jogador, Crônica, Natureza, Comportamento, Conceito, Clã, Geração, Senhor | Seleção por dropdown dos Arquétipos oficiais |
| **Atributos** | Força, Destreza, Vigor / Carisma, Manipulação, Aparência / Percepção, Inteligência, Raciocínio | 3 categorias (Físicos, Sociais, Mentais) com layout em grid |
| **Habilidades** | 10 Talentos, 10 Perícias, 10 Conhecimentos | 30 habilidades oficiais do livro base |
| **Disciplinas** | Dinâmicas por clã | Filtradas automaticamente pelo clã selecionado |
| **Essência** | Força de Vontade, Humanidade, Vitalidade, Parada de Sangue | Ranges validados (ex: Geração 3-16, Humanidade 0-10) |

### Clãs Disponíveis

| Clã | Disciplinas |
|-----|------------|
| 🦁 Ventrue | Dominação, Fortitude, Presença |
| 🔥 Brujah | Celeridade, Potência, Presença |
| 🌹 Toreador | Auspícios, Celeridade, Presença |
| 🐺 Gangrel | Animalismo, Fortitude, Metamorfose |
| 🎭 Malkavian | Auspícios, Demência, Ofuscação |
| 🐀 Nosferatu | Animalismo, Ofuscação, Potência |
| 🔮 Tremere | Auspícios, Dominação, Taumaturgia |
| ❓ Caitiff | Livre escolha |

### Interface & UX

- **Sistema de Dots** — Input visual idêntico à ficha em papel (●●●○○), com clique para preencher/esvaziar
- **Tooltips inteligentes** — Hover sobre qualquer dot revela a descrição daquele nível (ex: "*Força 3: Você pode quebrar uma tábua com um soco*")
- **Notificações Toast** — Feedback visual estilizado para criação, edição e exclusão de personagens
- **Modal de Confirmação** — Diálogo customizado gótico que substitui o alerta nativo do navegador
- **Troca de Idioma** — Alternância instantânea entre inglês e português, incluindo todas as descrições dos dots

---

## 🚀 Como Executar

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)

### Modo Desenvolvimento

**1. Backend (API)**
```bash
cd Vamp.Api
dotnet run --launch-profile http
```
> A API estará disponível em `http://localhost:5022`
> Swagger UI em `http://localhost:5022/swagger`

**2. Frontend (React)**
```bash
cd Vamp.Client
npm install
npm run dev
```
> A aplicação estará disponível em `http://localhost:5173`

### Modo Distribuição (Portátil)

A pasta `deploy/` contém uma versão pré-compilada que roda sem instalação de dependências:

```bash
cd deploy
./Vamp.Api.exe
```
> A aplicação serve tanto a API quanto o frontend compilado em `http://localhost:5022`

---

## 🧪 Testes

```bash
# Testes do Frontend (Vitest)
cd Vamp.Client
npm test

# Testes do Backend (MSTest)
cd ..
dotnet test
```

---

## 🔌 API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/character` | Lista todos os personagens |
| `GET` | `/api/character/{id}` | Busca personagem por ID |
| `POST` | `/api/character` | Cria novo personagem |
| `PUT` | `/api/character/{id}` | Atualiza personagem existente |
| `DELETE` | `/api/character/{id}` | Remove um personagem |
| `GET` | `/api/preferences` | Busca preferências do usuário |
| `PUT` | `/api/preferences` | Atualiza preferências |

---

## 🛡️ Decisões Técnicas

### Escrita Atômica (JsonStorageService)

Para evitar corrupção de dados em caso de crashes ou fechamento abrupto, a persistência segue o padrão **write-to-temp-then-rename**:

```
1. Serializa dados → characters.json.tmp
2. Renomeia characters.json.tmp → characters.json (operação atômica do SO)
```

Se uma leitura encontrar JSON corrompido, o arquivo é automaticamente renomeado para `characters.json.corrupt.bak` com timestamp, e um novo armazenamento vazio é criado.

### Internacionalização (i18n)

O sistema de localização é inteiramente client-side via React Context, sem dependências externas:

- **`LocalizationContext`** — Provider que expõe a função `t(key)` para tradução
- **`locales.js`** — ~400 linhas com todas as strings organizadas por seção
- **`dotDescriptions.js`** — ~38K de descrições RPG detalhadas para cada nível de cada atributo/habilidade

### Thread-Safety (XmlPreferencesService)

Leitura e escrita de preferências utilizam `lock` para garantir thread-safety em ambientes com requisições concorrentes.

### Validação de Dados (DataAnnotations)

O modelo `Character` utiliza anotações de validação do .NET para garantir integridade:

```csharp
[Required] Name              // Obrigatório
[Range(3, 16)] Generation    // Gerações válidas do VtM
[Range(0, 10)] Willpower     // Força de Vontade
[Range(0, 10)] Humanity      // Humanidade
[Range(0, 50)] BloodPool     // Parada de Sangue
```

---

## 🎨 Design System

A interface foi construída com CSS puro (vanilla) seguindo uma paleta visual inspirada no universo gótico do VtM:

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-color` | `#f7f2e8` | Fundo pergaminho |
| `--text-color` | `#1a1a1a` | Texto principal |
| `--accent-color` | `#900` | Acentos em carmesim |
| `--border-color` | `#8b7d6b` | Bordas em tom de couro velho |
| `--font-heading` | Cinzel | Títulos góticos serifados |
| `--font-body` | Lato | Corpo de texto legível |
| `--texture` | SVG fractal noise | Textura sutil de papel envelhecido |

---

## 🌍 Internacionalização

| Chave | English | Português |
|-------|---------|-----------|
| `header.title` | VAMPIRE | VAMPIRO |
| `action.embrace` | Embrace the Night | Abraçar a Noite |
| `action.confirm_delete` | Are you sure you want to delete this Kindred? | Tem certeza que deseja apagar este Membro? |
| `label.willpower` | Willpower | Força de Vontade |
| `label.humanity` | Humanity | Humanidade |
| `label.blood_pool` | Blood Pool | Parada de Sangue |

> E mais de **200 chaves** cobrindo todas as seções, tooltips, notificações e mensagens de erro.

---

## 📜 Licença

Este projeto é um trabalho de fã não-oficial. **Vampire: The Masquerade** é marca registrada da Paradox Interactive / World of Darkness LLC. Este software é disponibilizado para uso pessoal e não-comercial.

---

<p align="center">
  <em>"A Besta herdará a Terra, e nós herdaremos a Besta."</em>
</p>

<p align="center">
  Feito com 🩸 por um fã do Mundo das Trevas
</p>
