
import * as vscode from 'vscode';
import { createReactComponentTemplate } from './templates/react-component';

export function activate(context: vscode.ExtensionContext) {
	const newReactComponent = vscode.commands.registerCommand('utils.newReactComponent', async (uri: vscode.Uri) => {
		const toGeneratePath = uri.fsPath;
		const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;

		const componentName = await vscode.window.showInputBox({
			prompt: 'Digite o nome do componente',
			placeHolder: 'nome-do-componente',
		});

		if (!componentName) {
			vscode.window.showErrorMessage('Nome do componente é obrigatório');
			return;
		}

		try {
			const componentUri = await createReactComponentTemplate(componentName, uri);
			await vscode.commands.executeCommand('workbench.files.action.refreshFilesExplorer');
			
			const document = await vscode.workspace.openTextDocument(componentUri);
			await vscode.window.showTextDocument(document);

			vscode.window.showInformationMessage(`Componente ${componentName} criado em ${toGeneratePath.replace(rootPath || '', '')}`);
		} catch (error) {
			vscode.window.showErrorMessage(`Erro ao criar o componente: ${error instanceof Error ? error.message : String(error)}`);
			return;
		}
	});

	context.subscriptions.push(newReactComponent);
}

export function deactivate() {}
