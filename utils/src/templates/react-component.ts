import * as vscode from 'vscode';
import { toPascalCase, toSnakeCase } from '../utils/string';

function getReactIndexTemplate(name: string) {
  const text = `export { default } from './${name}'
`;

  return new TextEncoder().encode(text);
}

function getReactComponentTemplate(name: string) {
	const text =  `import React from 'react'

const ${name} = () => {
  return <p>${name} Component 2</p>
}

export default ${name}
`;

  return new TextEncoder().encode(text);
}

export async function createReactComponentTemplate(name: string, uri: vscode.Uri) {
	const fileName = toSnakeCase(name);
  const componentName = toPascalCase(name);
  
  const componentTemplate = getReactComponentTemplate(componentName);
	const indexTemplate = getReactIndexTemplate(fileName);

  const folderPath = vscode.Uri.joinPath(uri, fileName);

  const fs = vscode.workspace.fs;

  await fs.createDirectory(folderPath);

  const componentFilePath = vscode.Uri.joinPath(folderPath, `${fileName}.tsx`);
  const indexFilePath = vscode.Uri.joinPath(folderPath, 'index.ts');

  await fs.writeFile(componentFilePath, componentTemplate);
  await fs.writeFile(indexFilePath, indexTemplate);

  return componentFilePath;
}