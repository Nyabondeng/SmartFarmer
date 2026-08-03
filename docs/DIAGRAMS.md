# Smart Farmer — System Diagrams

These diagrams reflect the **system as built**. They render automatically on
GitHub.

**Report-ready images:** high-resolution PNG versions of all four diagrams are
in [`docs/img/`](img/) (`1-use-case.png`, `2-class.png`, `3-erd.png`,
`4-offline-flow.png`) — drop these straight into the report. The editable
source for each is the matching `.mmd` file; to re-export, paste it into
<https://mermaid.live>.

---

## 1. Use Case Diagram

Who uses the system and what they can do. `«include»` means a use case always
performs another as a sub-step; `«extend»` means an optional added behaviour.

```mermaid
flowchart LR
    farmerWeb(["👩‍🌾 Farmer (web)"])
    farmerUSSD(["📱 Farmer (basic phone)"])
    at(["📡 Africa's Talking"])

    subgraph SYS["Smart Farmer System"]
        direction TB
        UC1(["View crop information"])
        UC2(["Play voice output"])
        UC3(["Take education module"])
        UC4(["Register / Log in"])
        UC5(["Save crop record"])
        UC6(["View cost forecast"])
        UC7(["Switch language (EN / Arabic)"])
        UC8(["Dial USSD service"])
        UC9(["Choose USSD language"])
        UC10(["Browse crops & read guide (USSD)"])
    end

    farmerWeb --- UC1
    farmerWeb --- UC3
    farmerWeb --- UC4
    farmerWeb --- UC5
    farmerWeb --- UC6
    farmerWeb --- UC7
    farmerUSSD --- UC8
    UC8 --> UC9
    UC9 --> UC10
    at --- UC8

    UC1 -. «extend» .-> UC2
    UC5 -. «include» .-> UC4
```

---

## 2. Class Diagram

The main classes of the built system, their data, and their behaviour.

```mermaid
classDiagram
    class Farmer {
      +int id
      +string name
      +string phone
      +string password  «hashed»
      +string location
      +datetime created_at
      +register()
      +login()
    }
    class CropLog {
      +int id
      +int farmer_id  «FK»
      +string crop
      +date planting_date
      +date harvest_date
      +string status
      +string location
      +string notes
      +datetime created_at
      +create()
      +findByFarmer()
      +update()
      +delete()
    }
    class Crop {
      +string id
      +string name
      +string planting
      +string pest
      +string harvest
      +getInfo(topic)
    }
    class USSDHandler {
      +string sessionId
      +string phoneNumber
      +string text
      +handleRequest()
      +validateInput()
      +paginate()
    }
    class AuthService {
      +hashPassword()
      +comparePassword()
      +signToken()
      +verifyToken()
    }
    class OfflineStore {
      «IndexedDB, frontend»
      +getAll()
      +replaceAll()
    }

    Farmer "1" --> "*" CropLog : records
    CropLog ..> Crop : references by name
    Farmer ..> AuthService : uses
    USSDHandler ..> Crop : reads guides
    CropLog ..> OfflineStore : cached offline
```

---

## 3. Entity-Relationship Diagram (Database)

The PostgreSQL schema created by the backend on startup.

```mermaid
erDiagram
    FARMER ||--o{ CROP_LOG : "has"
    FARMER {
      int farmer_id PK
      string name
      string phone "unique"
      string password "bcrypt hash"
      string location
      timestamp created_at
    }
    CROP_LOG {
      int id PK
      int farmer_id FK
      string crop
      date planting_date
      date harvest_date
      string status
      string location
      string notes
      timestamp created_at
    }
    USSD_LOG {
      int id PK
      string phone
      string session_id
      string menu_path
      timestamp created_at
    }
```

---

## 4. Offline Data-Flow (Frontend)

How the web app keeps working without a connection, and how records reach the
cloud. This addresses how offline functionality is handled on the frontend.

```mermaid
flowchart TD
    A["Farmer opens the app"] --> B{Online?}

    B -->|"First visit, online"| C["Service Worker caches<br/>all pages, scripts, styles"]
    C --> D["App shell available offline"]

    B -->|"Later, offline"| E["Service Worker serves<br/>cached shell"]

    D --> F{Saving a crop record?}
    E --> F

    F -->|"Logged in & online"| G[("PostgreSQL cloud<br/>via /api/logs")]
    F -->|"Offline or guest"| H[("IndexedDB<br/>on-device database")]

    H -->|"On next login"| I["One-tap upload<br/>syncs to cloud"]
    I --> G

    classDef store fill:#e7f2e8,stroke:#2E7D32,color:#173b1e;
    class G,H store;
```
