# Portfolio Lolie - version CMS, coût visé 0 €

## Ce qui fonctionne déjà
- Le design de la V7.1 est conservé.
- Les projets, catégories, photographies, textes des pages, frise et CV sont structurés pour Decap CMS.
- Les projets et photos se chargent depuis `content/*.json` sur un site hébergé (HTTP/HTTPS).
- Les contenus de l’accueil et d’À propos sont personnalisables dans `content/site.json`.
- En double-cliquant sur `index.html`, le site reste prévisualisable avec ses contenus intégrés. Les changements CMS ne s’affichent correctement qu’en ligne (ou via serveur local).

## Installation gratuite - étapes à faire par la propriétaire
1. Créer un compte GitHub gratuit sur github.com et un dépôt **public** (les dépôts publics simplifient les quotas et la publication). Ne jamais y placer d’informations confidentielles.
2. Importer **le contenu du dossier** `lolie-site-v7-1` à la racine du dépôt (pas le dossier lui-même).
3. Créer un compte Netlify gratuit sur netlify.com et choisir « Add new project » > « Import an existing project » > GitHub. Publier depuis la branche `main`, dossier de publication `.` ; aucune commande de build.
4. Vérifier le site à l’adresse Netlify fournie. Les pages projets et la galerie doivent fonctionner en ligne.
5. **Authentification de /admin :** la configuration fournie utilise le backend GitHub de Decap CMS. Il faut remplacer `VOTRE_COMPTE/VOTRE_DEPOT` dans `admin/config.yml`, puis configurer un fournisseur OAuth compatible avec GitHub et Decap. **Le simple fait de créer des comptes GitHub et Netlify ne suffit pas à rendre /admin accessible.** Ne pas activer d’ancienne procédure « Netlify Identity / Git Gateway » sans vérifier sa disponibilité actuelle. Une solution OAuth gratuite peut nécessiter un petit service distinct (p. ex. Cloudflare Workers, sous réserve des quotas et de la configuration). Ne pas publier de secrets OAuth dans le dépôt.
6. Remplacer `TON-EMAIL@EXEMPLE.FR` dans l’admin, rubrique « Pages et informations », puis ajouter le vrai CV et les photos.
7. Compléter les mentions légales et la confidentialité **avant mise en ligne publique**. Vérifier les services tiers, cookies et consentement selon les intégrations retenues.

## Limites / attention
- Les images ajoutées au dépôt Git consomment du stockage ; optimiser en WebP/JPEG, idéalement < 500 Ko par photo et éviter les originaux RAW.
- Pour les vidéos, privilégier YouTube/Vimeo intégrés ; ne pas stocker de gros MP4 dans GitHub.
- Les données des projets existants sont des exemples éditoriaux à vérifier et à compléter.
- Les catégories de projets s’éditent séparément ; l’identifiant d’un projet doit correspondre à une catégorie existante.
- La configuration OAuth est **à finaliser** : l’interface `/admin` n’est pas encore opérationnelle sans elle.
- Les frais de domaine personnalisé sont facultatifs. Les offres gratuites peuvent changer.
