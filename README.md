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

-- Création des tables
```sql
CREATE TABLE IF NOT EXISTS ADDRESS (
address_id CHAR(36) PRIMARY KEY,
street VARCHAR(255) NOT NULL,
city VARCHAR(255) NOT NULL,
postal_code VARCHAR(50) NOT NULL,
country VARCHAR(255) NOT NULL,
entity_id CHAR(36) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE TABLE IF NOT EXISTS AGENCY (
agency_id CHAR(36) PRIMARY KEY,
name VARCHAR(255) NOT NULL,
created_at TIMESTAMP NOT NULL
);
```

```sql
CREATE TABLE IF NOT EXISTS CUSTOMER (
customer_id CHAR(36) PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
phone VARCHAR(50) NOT NULL,
birthday DATE NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE TABLE IF NOT EXISTS EMPLOYEE (
employee_id CHAR(36) PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
role VARCHAR(255) NOT NULL,
agency_id CHAR(36) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (agency_id) REFERENCES AGENCY(agency_id)
);
```

-- Jeu de données de test
```sql
INSERT INTO AGENCY (agency_id, name, created_at) VALUES
('a1b2c3d4-0000-0000-0000-000000000001', 'Agence Paris Centre', NOW()),
('a1b2c3d4-0000-0000-0000-000000000002', 'Agence Lyon Part-Dieu', NOW()),
('a1b2c3d4-0000-0000-0000-000000000003', 'Agence Marseille Vieux-Port', NOW());
```
```sql
INSERT INTO ADDRESS (address_id, street, city, postal_code, country, entity_id) VALUES
('b1b2c3d4-0000-0000-0000-000000000001', '15 Rue de Rivoli', 'Paris', '75001', 'France', 'a1b2c3d4-0000-0000-0000-000000000001'),
('b1b2c3d4-0000-0000-0000-000000000002', '25 Rue de la République', 'Lyon', '69002', 'France', 'a1b2c3d4-0000-0000-0000-000000000002'),
('b1b2c3d4-0000-0000-0000-000000000003', '10 Quai du Port', 'Marseille', '13002', 'France', 'a1b2c3d4-0000-0000-0000-000000000003');
```
```sql
INSERT INTO CUSTOMER (customer_id, email, password, first_name, last_name, phone, birthday) VALUES
('c1b2c3d4-0000-0000-0000-000000000001', 'jean.dupont@example.com', '$2a$10$demoHashedPassword', 'Jean', 'Dupont', '0612345678', '1985-06-15'),
('c1b2c3d4-0000-0000-0000-000000000002', 'marie.martin@example.com', '$2a$10$demoHashedPassword', 'Marie', 'Martin', '0687654321', '1990-09-22');
```

```sql
INSERT INTO EMPLOYEE (employee_id, email, first_name, last_name, role, agency_id) VALUES
('d1b2c3d4-0000-0000-0000-000000000001', 'admin@yourcar.com', 'Admin', 'System', 'ADMIN', 'a1b2c3d4-0000-0000-0000-000000000001'),
('d1b2c3d4-0000-0000-0000-000000000002', 'pierre.durand@yourcar.com', 'Pierre', 'Durand', 'AGENT', 'a1b2c3d4-0000-0000-0000-000000000002');
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

