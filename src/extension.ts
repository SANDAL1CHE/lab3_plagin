import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const onSave = vscode.workspace.onDidSaveTextDocument((document) => {
        const filePath = document.fileName;

        // Фильтруем только нужные файлы
        if (!filePath.endsWith('.cpp') && !filePath.endsWith('.h') && !filePath.endsWith('.hpp') && !filePath.endsWith('CMakeLists.txt')) {
            return;
        }

        vscode.window.showInformationMessage('Сохранен файл C/C++ или CMake');
    });

    context.subscriptions.push(onSave);
}

export function deactivate() {}