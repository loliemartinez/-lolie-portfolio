# Mise à jour SEO + confidentialité + suppression des notices

## Installation
Déposez **tous les fichiers et dossiers à la racine du dépôt GitHub** (et non dans un sous-dossier). Conservez les fichiers existants. Netlify doit exécuter la commande de build indiquée dans `netlify.toml` : `node scripts/build-projects.mjs`.

## Dans Decap CMS
- **SEO et référencement** : titres, descriptions et image de partage des pages principales.
- **Projets — fiches individuelles** : chaque fiche possède `Titre SEO`, `Description SEO`, `Image de partage`.
- **Confidentialité** : champs pour le contact RGPD, la conservation, les prestataires et les services tiers.

À chaque publication Decap, Netlify régénère les pages projet SEO `/projets/identifiant/`, les métadonnées HTML, le sitemap et le robots.txt. Les anciennes URL `projet.html?id=...` restent utilisables mais sont marquées `noindex`.

## Avant diffusion publique — IMPORTANT
La page Confidentialité est un texte de travail prudent, **pas une garantie de conformité juridique**. Renseigner et valider les champs de confidentialité dans Decap. Vérifier notamment l'adresse de contact, les durées de conservation réelles, les prestataires et transferts éventuels, les polices Google, les vidéos embarquées et les cookies/traceurs. Les **mentions légales** contiennent encore des champs à compléter : les renseigner avant publication publique. Ne pas simplement masquer les obligations.

## Contrôles
1. Netlify : déploiement réussi (build exécuté).
2. Vérifier `/projets/connect/` et la navigation entre les projets.
3. Vérifier `/sitemap.xml` et `/robots.txt`.
4. Modifier un titre SEO dans Decap, publier, attendre Netlify, puis contrôler le code source de la page correspondante.
5. Vérifier les liens de partage et images (une image n'apparaît que si renseignée).
6. Soumettre le sitemap dans Google Search Console après ouverture publique du site.

**Note :** les titres et descriptions SEO sont des suggestions modifiables, pas une promesse de positionnement. Les champs de confidentialité laissés vides affichent une formulation d'attente, à compléter avant publication publique.
