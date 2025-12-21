# Free API - Projet Fil Rouge Backend

Ce projet sert de base d'apprentissage et évolue au fil des sujets de cours abordés. Il s'agit d'une API NestJS progressive qui intègre de nouvelles fonctionnalités à chaque étape.

## Progression du Projet

### Étape 1 : API Utilisateurs

Mise en place de la structure de base NestJS et création d'un CRUD complet pour la gestion des utilisateurs.

- **User Service** : Gestion des entités utilisateurs.
- **Base de données** : Connexion à PostgreSQL via TypeORM.

### Étape 2 : Authentification et Sécurité

Sécurisation de l'API et gestion des accès.

- **Auth Service** : Implémentation de l'inscription et de la connexion.
- **Sécurité** : Hachage des mots de passe avec Bcrypt.

### Étape 3 : Temps Réel & Pixel War

Introduction aux WebSockets pour l'interactivité en temps réel.

- **WebSockets** : Mise en place d'une Gateway avec Socket.io.
- **Chat** : Système de messagerie instantanée.
- **Pixel War** : Création d'un jeu collaboratif de dessin sur grille (Canva) avec mise à jour en temps réel des pixels.

## Stack Technique

- **Framework** : NestJS
- **Base de données** : PostgreSQL
- **ORM** : TypeORM
- **Temps Réel** : Socket.io

## Installation et Lancement

```bash
# Installation des dépendances
$ pnpm install

# Lancement de l'application en mode développement
$ pnpm start:dev
```

## Auteur

Projet réalisé dans le cadre du cursus Fullstack Ynov.
