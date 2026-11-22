LOLIE MARTINEZ — PORTFOLIO V4 / CMS

1. PRÉVISUALISER SUR MAC
Ouvrir index.html dans Chrome : le site fonctionne grâce aux données intégrées de secours.
Pour prévisualiser les fichiers JSON comme sur un serveur, ouvrir Terminal dans ce dossier et lancer : python3 -m http.server 8000
Puis visiter http://localhost:8000

2. OÙ SONT LES CONTENUS ?
content/projects.json : projets, couvertures, photos, vidéos, ordre, publication, projets à la une.
content/categories.json : catégories et noms des filtres.
Le site charge ces deux fichiers sur un hébergement web.
Les fichiers data.js contiennent une copie de secours pour l'ouverture locale ; les changements CMS publiés ne nécessitent PAS de modifier data.js.

3. CMS : PRÉPARÉ, PAS ENCORE CONNECTÉ
admin/ contient l'interface Decap CMS. Pour l'utiliser :
A. Placer le site dans un dépôt GitHub (branche main).
B. Dans admin/config.yml remplacer VOTRE_COMPTE/VOTRE_DEPOT par le vrai dépôt.
C. Déployer le dépôt sur un hébergement statique HTTPS (ex. Netlify).
D. Configurer l'authentification GitHub OAuth pour Decap CMS via un fournisseur compatible. L'hébergement seul ne suffit pas.
E. Ouvrir https://VOTRE_DOMAINE/admin/ puis se connecter.
F. Ajouter / modifier les contenus puis publier. Le CMS écrit des commits dans le dépôt ; l'hébergeur redéploie le site.

IMPORTANT : le bouton d'administration n'est pas utilisable tant que le dépôt, l'hébergement et l'authentification ne sont pas configurés. Aucun compte n'a été créé pour vous.

4. CATÉGORIES
Ajouter une catégorie avec id unique, puis affecter ce même id aux projets concernés. Les filtres sont construits automatiquement.

5. IMAGES
Ajouter les photos via le CMS après connexion. Elles seront placées dans uploads/. Les images actuelles sont des espaces réservés.

6. LIMITES
La page Photographie reste une vitrine fixe : ses galeries dédiées pourront être rendues administrables lors de la prochaine itération. Les liens vidéo sont affichés comme liens externes, pas en lecteurs intégrés. Les textes d'accueil / à propos restent dans le HTML.
