# Baabnq Language Support
This extension provides support for [The Baabnq Programming Language](https://baabnq.github.io),
including syntax highlighting and execution capabilities.
This extension may be used with the desktop as well as the web version of vscode.

## Functionality
Execution works remotely under https://baabnq.eu.pythonanywhere.com/run, 
which makes this extension require an internet connection to function properly.
The server supports SSL and does not store or log the programs being sent to it.
However, i still recommend you to not put personal or sensitive information
into the programs you intend to run with this extension.

## Usage
Syntax highlighting will apply, when the extension is enabled, to all files of the file-type "baabnq".
Pressing F5 (which by default is mapped to baabnq.run, but can be remapped)
will run the currently opened program. 
Standard libraries are provided in the compilation environment on the server.
Because only the one currently opened file is transmitted to the server,
referencing other local files is not possible.


