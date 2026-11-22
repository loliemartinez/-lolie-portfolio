# Administration Lolie — mise à jour

## Installation
1. Sur GitHub, ouvrir le dépôt `loliemartinez/-lolie-portfolio`.
2. Déposer **le contenu du ZIP** à la racine du dépôt, en conservant les dossiers `admin/` et `content/` (ne pas déposer le ZIP lui-même).
3. Confirmer le remplacement des fichiers modifiés et valider le commit.
4. Attendre le déploiement Netlify, puis recharger `/admin/` avec Cmd+Shift+R.

## Changements
- Champs du CMS renommés en français, sections de listes repliables et catégorie par menu.
- Aperçu personnalisé bordeaux / bleu clair / crème des projets, photos et textes.
- Tous les contenus et le site public sont conservés.

## Utilisation
Dans Decap, ouvrir un projet et cliquer sur l’icône œil pour afficher ou masquer l’aperçu. Enregistrer avec Publier. Les images téléversées se rangent dans `uploads/`.

## À savoir
- L’aperçu est une représentation éditoriale, pas une copie pixel-par-pixel du site public.
- La configuration d’authentification GitHub / Cloudflare existante n’a pas été modifiée. Ne jamais mettre de secret OAuth dans GitHub.
- Les catégories proposées dans la liste sont les trois identifiants actuellement présents. Si vous ajoutez une catégorie, mettre à jour aussi les options de `admin/config.yml`.
