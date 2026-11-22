/* Prévisualisations Decap CMS — uniquement pour l'administration. */
(function () {
  if (!window.CMS || !window.React) return;
  const h = window.React.createElement;
  const get = (entry, key, fallback = '') => {
    const value = entry.getIn(['data', key]);
    return value === undefined || value === null ? fallback : (value.toJS ? value.toJS() : value);
  };
  const el = (tag, className, children, props = {}) => h(tag, { className, ...props }, children);
  const txt = value => typeof value === 'string' ? value : String(value ?? '');
  const panel = (title, body) => el('section', 'pv-panel', [el('h2', '', title), el('p', '', txt(body))]);
  const header = (kicker, title, subtitle) => el('header', 'pv-head', [el('div', 'pv-kicker', kicker), el('h1', '', title), el('p', '', subtitle)]);
  const wrapper = children => el('main', 'pv', el('div', 'pv-wrap', children));
  const imageSrc = (src, getAsset) => {
    if (!src) return '';
    if (/^https?:\/\//.test(src)) return src;
    try { const asset = getAsset(src); return asset && asset.toString ? asset.toString() : src; } catch (_) { return src; }
  };
  function GeneralPreview({ entry }) {
    return wrapper([
      header('LOLIE MARTINEZ · APERÇU DES TEXTES', 'ENCORE UNE IDÉE.', get(entry, 'home_intro')),
      panel('Contact', get(entry, 'contact_text')),
      panel('Bouton de contact', get(entry, 'contact_button')),
      panel('À propos', get(entry, 'about_lead')),
      ...[1,2,3].map(i => panel('Présentation · ' + i, get(entry, 'about_story_' + i))),
      panel('Mon parcours', get(entry, 'journey_intro')),
      ...[1,2,3,4,5,6].map(i => el('section', 'pv-card', [el('div','pv-kicker',get(entry,'timeline_'+i+'_date')),el('h3','',get(entry,'timeline_'+i+'_title')),el('p','',get(entry,'timeline_'+i+'_text'))]))
    ]);
  }
  function ProjectsPreview({ entry, getAsset }) {
    const projects = get(entry, 'projects', []);
    return wrapper([
      header('PORTFOLIO · APERÇU DES PROJETS', 'DES IDÉES DEVENUES RÉELLES.', projects.length + ' projets enregistrés. Aperçu éditorial, non identique à la page publique.'),
      ...projects.map((project, i) => el('article','pv-card',[
        el('div','pv-kicker',`${project.year || ''} · ${project.category || ''} · ${project.published === false ? 'MASQUÉ' : 'VISIBLE'}`),
        el('h3','',`${i + 1}. ${project.name || 'Sans titre'}`),
        el('p','',project.headline || ''),
        project.cover ? el('img','pv-image',null,{src:imageSrc(project.cover,getAsset),alt:project.name || ''}) : null,
        el('div','pv-tag',project.tags || 'Missions non renseignées'),
        el('p','',project.context || ''),
        el('p','',project.role || ''),
        project.description ? el('p','',project.description) : null,
        el('div','pv-note',`${(project.blocks || []).length} blocs · ${(project.images || []).length} photos · ${(project.videos || []).length} vidéos`)
      ]))
    ]);
  }
  function PhotosPreview({ entry, getAsset }) {
    const photos = get(entry,'photos',[]);
    return wrapper([
      header('GALERIE · APERÇU', 'PHOTOGRAPHIE.', photos.length + ' photographies enregistrées.'),
      el('section','pv-grid',photos.filter(photo => photo.published !== false).map(photo => el('div','',[
        photo.image ? el('img','',null,{src:imageSrc(photo.image,getAsset),alt:photo.alt || photo.title || ''}) : null,
        el('strong','',photo.title || 'Sans titre'),el('div','pv-note',(photo.location || '') + ' · ' + (photo.year || ''))
      ])))
    ]);
  }
  function CategoriesPreview({ entry }) {
    const categories = get(entry,'categories',[]);
    return wrapper([header('ORGANISATION', 'CATÉGORIES.', 'Identifiants utilisés pour filtrer les projets.'),...categories.map(c=>el('section','pv-card',[el('h3','',c.name || ''),el('div','pv-note',c.id || '')]))]);
  }
  CMS.registerPreviewStyle('/admin/preview.css');
  CMS.registerPreviewTemplate('general', GeneralPreview);
  CMS.registerPreviewTemplate('projects', ProjectsPreview);
  CMS.registerPreviewTemplate('photos', PhotosPreview);
  CMS.registerPreviewTemplate('categories', CategoriesPreview);
})();
