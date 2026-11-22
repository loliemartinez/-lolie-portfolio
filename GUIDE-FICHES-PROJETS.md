# Nouvelle administration : un projet = une fiche

1. Importer TOUS les fichiers de cette archive à la racine du dépôt GitHub (remplacer les fichiers existants).
2. Attendre que Netlify ait terminé son déploiement (la commande de build crée automatiquement `content/projects.json`).
3. Aller dans `/admin/` puis dans « Projets — fiches individuelles ».
4. Ouvrir CONNECT, NYX, etc. individuellement, ou cliquer « Nouveau projet ».
5. Renseigner un **identifiant unique** en minuscules sans espaces (ex. `mon-projet`), différent de tous les autres. Ne pas le modifier après publication.
6. Publier. Netlify reconstruira la liste des projets à partir des fiches.

**Important :** le fichier `content/projects.json` est généré à chaque déploiement. Ne plus l'éditer directement. Les fiches sont dans `content/projets/`. Les 9 projets présents dans le ZIP d'origine sont conservés ; les changements publiés après ce téléchargement doivent être reportés manuellement avant l'import si nécessaire.

**Contrôle :** si les modifications d'une fiche n'apparaissent pas sur le site, consulter le dernier déploiement Netlify. Il doit afficher `fiches projets réunies` dans les logs.
