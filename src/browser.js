const vscode = require('vscode');

var outputPannel;
const remote = 'https://baabnq.eu.pythonanywhere.com/run';

function run()
{
    const document = vscode.window.activeTextEditor?.document;
    if (!document) return;

    if (!document.isUntitled) document.save();
    const text = document.getText();

    outputPannel.show(true);
    outputPannel.clear();
    outputPannel.appendLine("[Running...]");

    var http = new XMLHttpRequest();

    http.open('POST', remote);

    http.onreadystatechange = () => {
        if (http.readyState != 4) return;
        if (http.status   != 200) return;

        outputPannel.clear();
        outputPannel.append(http.responseText);
    }

    http.onerror = () => {
        outputPannel.clear();
        outputPannel.append("Error: Remote Runner not reachable, check your internet connection");
    }

    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    http.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    http.setRequestHeader("Access-Control-Allow-Origin", "*");
    http.setRequestHeader("Access-Control-Allow-Methods", "POST");
    http.send(JSON.stringify({
        source: text,
    }));

}



function activate(ctx)
{
    outputPannel = vscode.window.createOutputChannel("Code");


    const runCommand = vscode.commands.registerCommand(
        'baabnq.run', 
        run
    );
    ctx.subscriptions.push(runCommand);


}




function deactivate() {}

module.exports = {
    activate,
    deactivate
}
