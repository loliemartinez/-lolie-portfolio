import { readdir, readFile, writeFile } from 'node:fs/promises';
const directory = new URL('../content/projets/', import.meta.url);
const filenames = (await readdir(directory)).filter(name => name.endsWith('.json'));
const projects = await Promise.all(filenames.map(async filename => JSON.parse(await readFile(new URL(filename, directory), 'utf8'))));
const ids = new Set();
for (const project of projects) {
  if (!project.id || !/^[a-z0-9-]+$/.test(project.id)) throw Error(`Identifiant invalide: ${project.id}`);
  if (ids.has(project.id)) throw Error(`Identifiant dupliqué: ${project.id}`);
  ids.add(project.id);
}
projects.sort((a,b)=>(Number(a.order)||999)-(Number(b.order)||999));
await writeFile(new URL('../content/projects.json', import.meta.url), JSON.stringify({projects}, null, 2) + '\n');
console.log(`${projects.length} fiches projets réunies dans content/projects.json`);
