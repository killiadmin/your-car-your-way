# Your Car Your Way

![Screenshot](frontend/public/banner_ycyw.png)

Application de location de véhicules développée avec Spring Boot 4.0.1 (Backend) et Angular 21 (Frontend).

Your Car Your Way fait des locations de voitures depuis une vingtaine d’années. Initialement en Angleterre, l’entreprise s’est étendue sur le marché européen, puis, depuis l’an dernier, sur le marché américain.

Cette croissance n’avait pas été anticipée du point de vue du système d’information. Selon les pays, les clients utilisent des applications web distinctes (même si le design a été homogénéisé, en réalité ce sont différentes applications).

## Prérequis

**Backend :**
- Java 17 ou supérieur
- Maven 3.6+
- MySQL 8.0+

**Frontend :**
- Node.js 20.x ou supérieur
- npm 10.9.2 ou supérieur

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/killiadmin/your-car-your-way.git
cd your-car-your-way
```

---

## Configuration Backend

### 1. Configurer la base de données

Créer une base de données MySQL :

```sql
CREATE DATABASE your_car_your_way;
```

### 2. Configurer le fichier .env

Créer un fichier `.env` à la racine du projet backend :

```properties
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/your_car_your_way?serverTimezone=UTC&useSSL=false
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=votre_mot_de_passe
```

**Note :** Remplacez `votre_mot_de_passe` par votre mot de passe MySQL.

### 3. Importer le jeu de données

Exécuter le script SQL suivant pour créer les tables et insérer les données de test :

```sql
-- Création des tables
CREATE TABLE IF NOT EXISTS agencies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INT,
    registration_number VARCHAR(50) UNIQUE,
    agency_id BIGINT,
    status VARCHAR(50),
    price_per_day DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (agency_id) REFERENCES agencies(id)
);

CREATE TABLE IF NOT EXISTS reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    vehicle_id BIGINT NOT NULL,
    agency_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    total_price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (agency_id) REFERENCES agencies(id)
);

-- Jeu de données de test
INSERT INTO agencies (name, address, phone, email) VALUES
('Agence Paris Centre', '15 Rue de Rivoli, 75001 Paris', '0142961234', 'paris@yourcar.com'),
('Agence Lyon Part-Dieu', '25 Rue de la République, 69002 Lyon', '0478456789', 'lyon@yourcar.com'),
('Agence Marseille Vieux-Port', '10 Quai du Port, 13002 Marseille', '0491234567', 'marseille@yourcar.com');

INSERT INTO users (username, email, password, first_name, last_name, role) VALUES
('admin', 'admin@yourcar.com', '$2a$10$demoHashedPassword', 'Admin', 'System', 'ADMIN'),
('client1', 'client1@example.com', '$2a$10$demoHashedPassword', 'Jean', 'Dupont', 'CLIENT'),
('client2', 'client2@example.com', '$2a$10$demoHashedPassword', 'Marie', 'Martin', 'CLIENT');

INSERT INTO vehicles (brand, model, year, registration_number, agency_id, status, price_per_day) VALUES
('Renault', 'Clio', 2023, 'AB-123-CD', 1, 'AVAILABLE', 45.00),
('Peugeot', '308', 2022, 'EF-456-GH', 1, 'AVAILABLE', 55.00),
('Citroën', 'C3', 2023, 'IJ-789-KL', 2, 'AVAILABLE', 48.00),
('Volkswagen', 'Golf', 2022, 'MN-012-OP', 2, 'AVAILABLE', 60.00),
('Toyota', 'Yaris', 2023, 'QR-345-ST', 3, 'AVAILABLE', 50.00),
('BMW', 'Série 3', 2023, 'UV-678-WX', 3, 'AVAILABLE', 85.00);

INSERT INTO reservations (user_id, vehicle_id, agency_id, start_date, end_date, status, total_price) VALUES
(2, 1, 1, '2024-03-01', '2024-03-05', 'CONFIRMED', 180.00),
(3, 3, 2, '2024-03-10', '2024-03-15', 'CONFIRMED', 240.00);
```

### 4. Installer les dépendances Maven

Se positionner dans le dossier backend :

```bash
cd backend
mvn clean install
```

### 5. Lancer l'application backend

```bash
mvn spring-boot:run
```

L'application backend sera accessible sur `http://localhost:8080`

---

## Configuration Frontend

### 1. Installer les dépendances npm

Se positionner dans le dossier frontend depuis la racine du projet :

```bash
cd frontend
npm install
```

Cette commande installera toutes les dépendances définies dans le fichier `package.json`.

### 2. Lancer l'application frontend

Pour démarrer le serveur de développement Angular :

```bash
npm start
```

L'application frontend sera accessible sur `http://localhost:4200`

**Note :** Le frontend communique avec le backend via un proxy configuré dans `proxy.conf.json`. Assurez-vous que le backend est bien lancé avant de démarrer le frontend.

---

## Variables d'environnement

### Backend

Les variables suivantes peuvent être configurées dans le fichier `.env` à la racine du projet :

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| SPRING_DATASOURCE_URL | URL de connexion à la base de données | jdbc:mysql://localhost:3306/your_car_your_way |
| SPRING_DATASOURCE_USERNAME | Nom d'utilisateur MySQL | root |
| SPRING_DATASOURCE_PASSWORD | Mot de passe MySQL | root |

### Frontend

Le frontend utilise un fichier de configuration `proxy.conf.json` pour communiquer avec le backend. Par défaut, il redirige les requêtes vers `http://localhost:8080`.

---

## Structure du projet (Backend)

```
your-car-your-way/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/poc/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── index.html
│   ├── node_modules/
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   └── proxy.conf.json
├── .README.md
└── docker-compose.yml
```

---

## Technologies utilisées

### Backend
- Spring Boot 4.0.1
- Spring Data JPA
- Spring WebMVC
- Spring WebSocket
- MySQL 8.0+
- Lombok
- Dotenv Java

### Frontend
- Angular 21.1
- TypeScript 5.9
- RxJS 7.8
- STOMP WebSocket
- Angular Router
- Angular Forms

---

## Commandes utiles

## Démarrage rapide

1. **Démarrer le backend** (dans un terminal) :
```bash
cd backend
mvn spring-boot:run
```

2. **Démarrer le frontend** (dans un autre terminal) :
```bash
cd frontend
npm install
npm start
```

3. **Accéder à l'application** :
   - Frontend : http://localhost:4200
   - Backend API : http://localhost:8080

