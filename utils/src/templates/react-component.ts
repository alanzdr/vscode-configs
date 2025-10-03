import * as vscode from 'vscode';
import { toPascalCase, toKebabCase } from '../utils/string';

function getReactIndexTemplate(name: string) {
  const text = `export { default } from './${name}'
`;

  return new TextEncoder().encode(text);
}

function getReactComponentTemplate(name: string) {
	const text =  `import React from 'react'

interface Props {

}

const ${name}: React.FC<Props> = () => {
  return (
    <div>
      <p>${name}</p>
    </div>
  )
}

export default ${name}
`;

  return new TextEncoder().encode(text);
}

export async function createReactComponentTemplate(name: string, uri: vscode.Uri) {
	const fileName = toKebabCase(name);
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