# Pool Monitor Card - Documentation Technique

## Vue d'ensemble
Le Pool Monitor Card est un composant personnalisé pour Home Assistant basé sur LitElement. Il permet de visualiser et de gérer différents capteurs de piscine dans une interface utilisateur intuitive.

## Architecture du Code

### Composant Principal : PoolMonitorCard
Le composant principal étend LitElement et implémente l'interface de carte Lovelace de Home Assistant.

### Gestion de la Configuration
La gestion de la configuration est répartie entre deux méthodes principales : `setConfig` et `getConfig`.

#### `setConfig(config)`
Méthode requise par l'API Lovelace de Home Assistant pour l'initialisation et la validation de la configuration.

**Responsabilités :**
1. **Initialisation**
   - Définit les valeurs par défaut pour tous les paramètres
   - Structure de base :
     ```javascript
     {
       display: {
         compact: false,
         show_names: true,
         // ...autres paramètres d'affichage
       },
       colors: {
         normal: "#00b894",
         // ...autres couleurs
       }
     }
     ```

2. **Migration de Configuration**
   - Détecte les configurations au format legacy
   - Convertit automatiquement vers la nouvelle structure
   - Préserve la rétrocompatibilité

3. **Validation**
   - Vérifie la présence d'au moins un capteur
   - Valide que chaque capteur a une entité définie
   - Génère des erreurs explicites en cas de configuration invalide

4. **Fusion des Configurations**
   - Fusionne les paramètres personnalisés avec les valeurs par défaut
   - Gère séparément les configurations d'affichage et de couleurs

#### `getConfig()`
Méthode interne pour la récupération et le formatage de la configuration active.

**Responsabilités :**
1. **Récupération de Configuration**
   - Accède à la configuration stockée
   - Applique les valeurs par défaut si nécessaire

2. **Structuration des Données**
   - Organise les données dans un format cohérent
   - Maintient une structure hiérarchique claire

3. **Gestion des Capteurs**
   - Liste des capteurs supportés :
     ```javascript
     [
       'temperature', 'ph', 'orp', 'tds', 
       'salinity', 'cya', 'calcium', 
       'phosphate', 'alkalinity', 
       'free_chlorine', 'total_chlorine', 
       'pressure', 'sg', 'water_level', 
       'flow_rate', 'uv_radiation', 
       'product_volume', 'product_weight'
     ]
     ```
   - Validation des types de capteurs
   - Gestion des avertissements pour les capteurs non supportés

4. **Rétrocompatibilité**
   - Maintient les propriétés au niveau racine pour la compatibilité
   - Structure moderne avec `sensors` pour les nouvelles implémentations

## Bonnes Pratiques
1. **Immutabilité**
   - Utilisation de `JSON.parse(JSON.stringify())` pour le clonage profond
   - Évite les modifications directes de l'état

2. **Validation**
   - Vérifications explicites des configurations requises
   - Messages d'erreur clairs et informatifs

3. **Valeurs par Défaut**
   - Définition systématique de valeurs par défaut
   - Utilisation de l'opérateur de coalescence nulle (`??`)

4. **Internationalisation**
   - Support multilingue via `getTranslatedText`
   - Configuration de langue flexible

## Dépendances
- LitElement
- Home Assistant Lovelace API
- Système de traduction personnalisé

## Limitations Connues
1. Au moins un capteur doit être configuré
2. Les types de capteurs non supportés génèrent des avertissements
3. Dépendance à l'injection de configuration de Home Assistant

## Maintenance
Pour ajouter un nouveau type de capteur :
1. Ajouter le type à la liste `supportedSensors`
2. Mettre à jour la documentation
3. Ajouter les traductions nécessaires
4. Vérifier la rétrocompatibilité
