# TraderQuest ⚔️

Système de gamification du trading — Discipline · Edge · Psychologie

## Déploiement sur GitHub Pages

### 1. Créer le repo
```bash
git init
git add .
git commit -m "🚀 Initial TraderQuest deploy"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/traderquest.git
git push -u origin main
```

### 2. Activer GitHub Pages
- Aller dans **Settings → Pages**
- Source : `Deploy from a branch`
- Branch : `main` / `/ (root)`
- Cliquer **Save**

Ton app sera disponible sur :
`https://TON_USERNAME.github.io/traderquest/`

---

## Mise à jour de l'app

Chaque fois que tu modifies et repousses les fichiers :

```bash
git add .
git commit -m "update"
git push
```

L'app détecte automatiquement la nouvelle version et affiche une bannière **"METTRE À JOUR"** à l'utilisateur. Un clic recharge avec la dernière version.

> 💡 **Important** : À chaque mise à jour majeure, incrémente `CACHE_VERSION` dans `sw.js`
> (ex: `tq-v1` → `tq-v2`) pour forcer le rechargement du cache sur tous les appareils.

---

## Utilisation offline

Une fois chargée une première fois, l'app fonctionne **entièrement sans connexion**.
Les données sont sauvegardées dans le `localStorage` du navigateur de l'appareil.

## Installer comme app (PWA)

- **Android** : Menu navigateur → *Ajouter à l'écran d'accueil*
- **iPhone** : Safari → Partager → *Sur l'écran d'accueil*
- **Desktop Chrome** : Icône d'installation dans la barre d'adresse

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Application complète |
| `sw.js` | Service Worker (cache offline + auto-update) |
| `manifest.json` | Configuration PWA (icône, nom, couleurs) |
