
/* IMPORT */

import vscode from 'vscode';
import * as Commands from './commands';

/* MAIN */

const activate = (): void => {

  vscode.commands.registerCommand ( 'openInGitTower.open', Commands.open );

};

/* EXPORT */

export {activate};
