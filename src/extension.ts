import * as vscode from 'vscode';
import * as path from 'path';
import * as cp from 'child_process';

let serverProcess: cp.ChildProcess | undefined;

export function activate(context: vscode.ExtensionContext) {
    const startCommand = vscode.commands.registerCommand('aiSearchSimilarities.start', async () => {
        const serverPath = path.join(context.extensionPath, 'SRC', 'code_similarity.py');
        serverProcess = cp.spawn('python', [serverPath], { shell: true });

        serverProcess.stdout?.on('data', (data) => {
            console.log(`Server: ${data}`);
        });

        serverProcess.stderr?.on('data', (data) => {
            console.error(`Server Error: ${data}`);
        });

        vscode.window.showInformationMessage('Flask server started!');

        // Open the webview
        const panel = vscode.window.createWebviewPanel(
            'aiSearchSimilarities',
            'AI Search Similarities',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        const webviewPath = vscode.Uri.file(
            path.join(context.extensionPath, 'SRC', 'webviews', 'code_similarity_ui.html')
        );

        panel.webview.html = (await vscode.workspace.fs.readFile(webviewPath)).toString();
    });

    context.subscriptions.push(startCommand);
}

export function deactivate() {
    if (serverProcess) {
        serverProcess.kill();
    }
}