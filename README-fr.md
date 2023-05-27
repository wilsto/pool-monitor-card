# Pool Monitor Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

![all](example/hero.png)
[Cliquez sur moi pour voir d'autres captures d'écran](example/screenshots.md)

## ReadMe multilingue

Clique sur les boutons suivants pour choisir la langue de ton ReadMe : [![fr](https://img.shields.io/badge/lang-fr-green.svg)](https://github.com/wilsto/pool-monitor-card/blob/master/README-fr.md) [![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/wilsto/pool-monitor-card/blob/master/README.md)

## Table des matières <!-- omit in toc -->

- [Description](#description)
- [Support](#support)
- [Installation](#installation)
  - [via HACS](#via-hacs)
  - [Manuellement](#manuallemnt)
- [Mise en place sous Lovelace](#Mise-en-place-sous-Lovelace)
  - [Utilisation de l'interface utilisateur](#Utilisation-de-l-interface-utilisateur)
  - [Utilisation de YAML](#Utilisation-de-yaml)
- [Parametres](#parametres)  
  - [Paramètres principaux](#parametres-principaux)
  - [Paramètres avancés](#parametres-avances)
- [Matériel](#Materiel)

---

## Description

La "Pool Monitor Card" est un plugin d'Home Assistant qui  affiche les informations de **<span style="color:orange">12 capteurs prédéfinis de votre piscine</span>** : **température, pH, ORP et TDS** mais aussi si vous en avez besoin : **salinité, CYA, calcium, phosphate, alcalinité, chlore libre, chlore total, pression du filtre**.

- **Température** : Il s'agit de la température de l'eau de votre piscine. La température idéale d'une piscine se situe entre 26°C et 28°C.  Connaître la température peut vous aider à décider si l'eau est suffisamment chaude pour nager ou si elle est trop froide et doit être chauffée.

- **pH** : Il s'agit d'une mesure de l'acidité ou de l'alcalinité de l'eau de votre piscine. Le pH idéal d'une piscine se situe entre 7,0 et 7,4. Le maintien d'un niveau de pH approprié permet d'éviter les irritations de la peau et des yeux et de garder l'eau de la piscine propre à la baignade.

- **ORP** : Il s'agit du potentiel d'oxydo-réduction, qui mesure la capacité de l'eau à oxyder ou à réduire les substances présentes dans la piscine. Le niveau de ORP est lié à la quantité de chlore ou d'autres désinfectants dans la piscine.  La plage idéale pour le chlore dans une piscine se situe entre 650 et 750 mV. Le maintien d'un niveau ORP correct permet de s'assurer que l'eau de la piscine est correctement assainie et exempte de bactéries nocives.

- **TDS**: Il s'agit du total des solides dissous, qui mesure la quantité de substances inorganiques et organiques présentes dans l'eau, telles que les minéraux, les sels et d'autres particules. Des niveaux élevés de TDS peuvent affecter la clarté de l'eau et rendre difficile l'équilibre des produits chimiques dans la piscine. La plage idéale pour le TDS dans une piscine d'eau salée se situe entre 3 000 et 5 000 parties par million (ppm) (3 et 5 g/L).

<details>
  <summary><span style="color:blue">Cliquez sur moi pour poursuivre la liste des 8 autres capteurs possibles</span></summary>

- **Salinité** : Elle mesure la quantité de sel dans l'eau. Une piscine d'eau salée a besoin d'une certaine quantité de sel pour fonctionner correctement. La plage idéale de sel dans une piscine d'eau salée se situe entre 2 500 et 3 500 ppm.

- **CYA** : Il s'agit de l'acide cyanurique qui mesure la quantité de stabilisant dans l'eau. Le stabilisateur aide à protéger le chlore de la dégradation par la lumière du soleil. Le taux idéal de CYA dans une piscine se situe entre 30 et 50 ppm.

- **Calcium** : Ce paramètre mesure la quantité de calcium dans l'eau. Des niveaux élevés de calcium peuvent entraîner l'entartrage des surfaces et des équipements de la piscine. La dureté calcique idéale d'une piscine se situe entre 200 et 400 ppm.

- **Phosphate** : Ce paramètre mesure la quantité de phosphate dans l'eau. Les phosphates présents dans l'eau peuvent servir de nourriture à la croissance des algues. Le taux idéal de phosphate dans une piscine se situe entre 200 et 300 ppm.

- **Alcalinité** : Elle mesure la capacité de l'eau à résister aux changements de pH. Une alcalinité adéquate permet d'éviter que l'eau ne devienne trop acide ou trop alcaline. L'alcalinité idéale d'une piscine se situe entre 80 et 120 ppm.

- **Chlore libre** : Il s'agit de la quantité de chlore actif dans l'eau qui est disponible pour désinfecter la piscine. La plage idéale de chlore libre dans une piscine se situe entre 1 et 3 ppm.

- **Chlore total** : Il s'agit de la concentration combinée du chlore libre et du chlore qui s'est combiné aux contaminants présents dans l'eau. La plage idéale pour le chlore total dans une piscine est de 5 ppm.

- **Pression du filtre** : Elle mesure la pression à l'intérieur du filtre de la piscine. Une pression de filtre élevée peut indiquer que le filtre est sale et doit être nettoyé. La pression idéale du filtre peut varier en fonction de la marque et du modèle du filtre de la piscine.

</details>  
<br/>
Avec la "Pool Monitor Card", vous pouvez facilement contrôler ces aspects importants de votre piscine et faire les ajustements nécessaires pour que l'eau soit sûre et agréable à la baignade.

## Support

Hey mec ! Aide-moi pour quelques :beers: ou un :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://bmc.link/wilsto)

## Installation

### via HACS

En attendant que la carte "Pool Monitor Card" soit disponible par défaut dans le répertoire HACS.  cliquez sur :
[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=wilsto&repository=pool-monitor-card&category=plugin)

### Manuellement

1. Téléchargez le fichier `pool_monitor_card.js` depuis la [dernière version disponible](https://github.com/wilsto/pool-monitor-card/releases) et sauvegardez-le dans votre dossier `configuration/www`.
1. Allez dans `Configuration > Lovelace dashboard > Resources` dans Home Assistant et cliquez sur `Add resource`.
    1. Ajoutez `/local/community/pool-monitor-card/pool_monitor_card.js` à l'URL.
    1. Choisissez `Javascript Module` comme Resource type.

## Mise en place sous Lovelace

### Utilisation de l'interface utilisateur

Pas encore possible.

### Utilisation de YAML

1. Vous avez juste besoin d'ajouter une nouvelle carte avec `type : 'custom:pool-monitor-card'` à votre liste de cartes et n'importe quelle configuration que vous trouverez ci-dessous si vous voulez personnaliser davantage votre carte.

#### Exemple de code

```yaml
type: 'custom:pool-monitor-card'
temperature: sensor.your_temperature_sensor
ph: sensor.your_ph_sensor
```

### Paramètres principaux

  Voici une liste de capteurs qu'il peut être important de surveiller, en fonction des besoins spécifiques de votre piscine. Il est essentiel de maintenir les niveaux dans les plages recommandées pour que votre piscine reste saine et baignable.

  ***Tous les capteurs sont optionnels mais vous devez définir au moins une de ces entités**.

| Nom | Type | Exigence | Description | Valeur par défaut |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` | texte | **Obligatoire** | `custom:pool-monitor-card` ||
| `temperature` | texte | **Option*** | Entité Temperature  |`aucune`|
| `ph` | texte | **Option*** | Entité pH  |`aucune`|
| `orp` | texte | **Option*** | Entité ORP  |`aucune`|
| `tds` | texte | **Option*** | Entité TDS  |`aucune`|
| `salinity` | String | **Optional*** | L'entité qui mesure le niveau de sel dans l'eau (pour les piscines d'eau salée).  |`none`|
| `cya` | String | **Optional*** |  L'entité qui mesure le niveau d'acide cyanurique dans l'eau. |`none`|
| `calcium` | String | **Optional*** | L'entité qui mesure le niveau de dureté calcique dans l'eau. |`none`|
| `phosphate` | String | **Optional*** | L'entité qui mesure le niveau de phosphate dans l'eau. |`none`|
| `free_chlorine` | String | **Optional*** | L'entité qui mesure la concentration de chlore libre dans l'eau.|`none`|
| `total_chlorine` | String | **Optional*** | L'entité qui mesure la concentration de chlore libre et de chlore combiné dans l'eau. |`none`|
| `alkalinity` | String | **Optional*** |L'entité qui mesure l'alcalinité de l'eau.  |`none`|
| `pressure` | String | **Optional*** | L'entité qui mesure la pression du filtre dans la piscine.  |`none`|

### Paramètres avancés

Vous pouvez aller plus loin avec la carte en modifiant l'interface utilisateur (UI).

#### eXperience Utilisateur (UI/UX)

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` | texte | **Option** | Titre de la carte  |`aucune`|
| `compact` | booléen | **Option** | Mode Compact |`false`|
| `show_names` | boolean | **Optional** | Afficher le nom de l'entité |`true`|
| `show_labels` | boolean | **Option** | Afficher la qualification de l'état (Bas, idéal, Elevé) |`true`|
| `language` | string | **Option** | Langue d'interface (en, fr)  |`en`|

Besoin de changer l'unité, le point de consigne et les étapes ? Pas de problème, voir les paramètres additionnels ci-dessous pour chaque entité mesurée 

#### Température

<details open>
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `temperature_unit` | String | **Optional** | Temperature Unit (°C or °F) |`°C`|
| `temperature_setpoint` | Number | **Optional** | Temperature Set Point |If unit=°C:`27` <br/> If unit=°F:`80`|
| `temperature_step` | Number | **Optional** | Temperature Step |If unit=°C:`1` <br/> If unit=°F:`2`|
</details>

> **_NOTE:_**  J'ai ajouté un deuxième paramètre appelé temperature_2 (avec la même logique pour l'unité, le point de consigne, le pas) pour ceux qui ont plusieurs capteurs de température.

#### pH

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ph_unit` | String | **Optional** | pH Unit |`pH`|
| `ph_setpoint` | Number | **Optional** | pH Set Point |`7.2`|
| `ph_step` | Number | **Optional** | pH Step |`0.2`|
</details>

#### ORP

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orp_unit` | String | **Optional** | ORP Unit |`mV`|
| `orp_setpoint` | Number | **Optional** | ORP Set Point |`700`|
| `orp_step` | Number | **Optional** | ORP Step |`50`|
</details>

#### TDS

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tds_unit` | String | **Optional** | TDS Unit (g/L or ppm) |`g/L`|
| `tds_setpoint` | Number | **Optional** | TDS Set Point |If unit=g/L:`4` <br/> If unit=ppm:`4000`|
| `tds_step` | Number | **Optional** | TDS Step  |If unit=g/L:`1` <br/> If unit=ppm:`1000`|
</details>

#### Salinity

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `salinity_unit` | String | **Optional** | Salinity Unit (ppm or mg/L) |`ppm`|
| `salinity_setpoint` | Number | **Optional** | Salinity Set Point | `3000` |
| `salinity_step` | Number | **Optional** | Salinity Step  |`500`|
</details>

#### Cyanuric Acid

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cya_unit` | String | **Optional** | Cyanuric Acid Unit |`ppm`|
| `cya_setpoint` | Number | **Optional** | Cyanuric Acid Set Point | `40` |
| `cya_step` | Number | **Optional** | Cyanuric Acid Step  |`10`|
</details>

#### Calcium

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calcium_unit` | String | **Optional** | Calcium Unit |`ppm`|
| `calcium_setpoint` | Number | **Optional** | Calcium Set Point | `300` |
| `calcium_step` | Number | **Optional** | Calcium Step  |`100`|
</details>

#### Phosphate

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `phosphate_unit` | String | **Optional** | Phosphate Unit |`ppb`|
| `phosphate_setpoint` | Number | **Optional** | Phosphate Set Point | `100` |
| `phosphate_step` | Number | **Optional** | Phosphate Step  |`100`|
</details>

#### Alkalinity

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alkalinity_unit` | String | **Optional** | Alkalinity Unit |`ppm`|
| `alkalinity_setpoint` | Number | **Optional** | Alkalinity Set Point | `100` |
| `alkalinity_step` | Number | **Optional** | Alkalinity Step  |`20`|
</details>

#### Free Chlorine

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `free_chlorine_unit` | String | **Optional** | Free Chlorine Unit |`ppm`|
| `free_chlorine_setpoint` | Number | **Optional** | Free Chlorine Set Point | `2` |
| `free_chlorine_step` | Number | **Optional** | Free Chlorine Step  |`1`|
</details>

#### Total Chlorine

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `total_chlorine_unit` | String | **Optional** | Total Chlorine Unit |`ppm`|
| `total_chlorine_setpoint` | Number | **Optional** | Total Chlorine Set Point | `3` |
| `total_chlorine_step` | Number | **Optional** | Total Chlorine Step  |`1`|
</details>

#### Filter Pressure

<details >
  <summary> click me to open</summary>

| Name | Type | Requirement | Description | Default |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pressure_unit` | String | **Optional** | Filter Pressure Unit (psi or bar) |`psi`|
| `pressure_setpoint` | Number | **Optional** | Filter Pressure Set Point | `20` |
| `pressure_step` | Number | **Optional** | Filter Pressure Step  |`10`|
</details>

---

## Matériels

Voici une liste non exhaustive, non testée et non affiliée de différents matériaux susceptibles d'intégrer certaines des valeurs ci-dessus :

| Marque | Modèle  | Temp | pH | ORP | TDS | HA Support |
| -------------- | ----------- | ------------ |  ------------ |  ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bluerriot | [Blue Connect Plus Gold](https://www.blueriiot.com/us-en) |✔️ | ✔️ |✔️ | ✔️|  [Blog](https://blog.mikejmcguire.com/2021/12/30/home-assistant-add-on-for-blueriiot-blue-connect-plus/) |
| Flipr | [AnalysR](https://goflipr.com/flipr-analysr-3/) |✔️ | ✔️ |✔️ | ❌ | [Component](https://www.home-assistant.io/integrations/flipr/) |
| iopool | [ECO](https://iopool.com/pages/pool-monitor) |  ✔️ | ❌ | ❌| ❌ | [Tuto fr @mguyard](https://forum.hacf.fr/t/tuto-gestion-de-sa-piscine-avec-sonde-iopool/24292) |
| Inkbird | [IBS-P01R Bluetooth](https://pool-thermometer.eu/shop/wifi-swimming-pool-thermometer-bundle-weather-station/?lang=en) |  ✔️ | ❌ | ❌| ❌ | [Component](https://www.home-assistant.io/integrations/inkbird/) |
| Ondilo |  [ICO Pool](https://ondilo.com/en/ico-pool/) |✔️ | ✔️ |✔️ | ✔️| [Component](https://www.home-assistant.io/integrations/ondilo_ico/) |
| Zodiac  | [iAqualink eXO iQ](https://www.zodiac-poolcare.com/traitement-de-l-eau/electrolyseurs-au-sel/gamme-exo--iq/exo--iq)  |  ✔️  | ✔️ | ✔️ |❌ | [via nodeRED](https://community.home-assistant.io/t/jandy-iaqualink-pool-integration/105633/378?u=wilsto) |

> **_NOTE:_**  ✔️ indique que le modèle est capable de mesurer le paramètre spécifié, tandis que ❌ indique qu'il ne l'est pas.
La dernière colonne concerne des infos pour le connecter à Home Assistant.

[Cliquez sur moi pour voir plus de matériel](example/hardware.md)