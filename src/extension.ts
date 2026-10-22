import * as vscode from 'vscode';

let testTerminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    const onSave = vscode.workspace.onDidSaveTextDocument((document) => {
        const filePath = document.fileName;

        if (!filePath.endsWith('.cpp') && !filePath.endsWith('.h') && !filePath.endsWith('.hpp') && !filePath.endsWith('CMakeLists.txt')) {
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const command = 'cmake --build build && ctest --test-dir build --output-on-failure';

        if (!testTerminal || testTerminal.exitStatus !== undefined) {
            testTerminal = vscode.window.createTerminal({
                name: "C++ AutoTest",
                cwd: rootPath
            });
        }

        testTerminal.show();
        testTerminal.sendText(command);
    });

    context.subscriptions.push(onSave);
}

export function deactivate() {
    if (testTerminal) {
        testTerminal.dispose();
    }
}