// Le CMS met à jour les fichiers JSON. En ouverture locale (file://), les données intégrées restent disponibles.
window.LOLIE_CONTENT_READY=(async()=>{
 if(location.protocol==='file:')return;
 try{
  const [p,c]=await Promise.all([fetch('/content/projects.json',{cache:'no-store'}),fetch('/content/categories.json',{cache:'no-store'})]);
  if(!p.ok||!c.ok)throw Error('Contenu indisponible');
  const [pd,cd]=await Promise.all([p.json(),c.json()]);
  if(Array.isArray(pd.projects))window.LOLIE_PROJECTS=pd.projects;
  if(Array.isArray(cd.categories))window.LOLIE_CATEGORIES=cd.categories;
 }catch(err){console.warn('Utilisation des contenus de secours :',err)}
})();
