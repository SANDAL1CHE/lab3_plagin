import * as vscode from 'vscode';

let testTerminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    const runTestsCmd = vscode.commands.registerCommand('cpp-autotest.runManual', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('Откройте папку с проектом');
            return;
        }
        
        const rootPath = workspaceFolders[0].uri.fsPath;
        const command = 'cmake --build build && ctest --test-dir build --output-on-failure';

        if (!testTerminal || testTerminal.exitStatus !== undefined) {
            testTerminal = vscode.window.createTerminal({
                name: "C++ AutoTest",
                cwd: rootPath,
                shellPath: "cmd.exe"
            });
        }

        testTerminal.show();
        testTerminal.sendText(command);
    });

    context.subscriptions.push(runTestsCmd);
}

export function deactivate() {
    if (testTerminal) {
        testTerminal.dispose();
    }
}