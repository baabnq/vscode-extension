const vscode = require('vscode');
const https = require('https');

var outputPannel;

function httpsPost({body, ...options}) {
    return new Promise((resolve,reject) => {
        const req = https.request({
            method: 'POST',
            ...options,
        }, res => {
            const chunks = [];
            res.on('data', data => chunks.push(data))
            res.on('end', () => {
                let resBody = Buffer.concat(chunks);
                resolve(resBody.toString());
            })
        })
        req.on('error',reject);
        req.write(body);
        req.end();
    })
}



async function run()
{
    const document = vscode.window.activeTextEditor?.document;
    if (!document) return;

    if (!document.isUntitled) document.save();
    const text = document.getText();

    outputPannel.show(true);
    outputPannel.clear();
    outputPannel.appendLine("[Running...]");

    const res = httpsPost({
        method: 'POST',
        hostname: 'baabnq.eu.pythonanywhere.com',
        path: '/run',
        headers : {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            source: text,
        })
    })

    res.then((output) => {
        outputPannel.clear();
        outputPannel.append(output);
    }, () => {
        outputPannel.clear();
        outputPannel.append("Error: Remote Runner not reachable, check your internet connection");
    });



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
