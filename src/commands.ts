
/* IMPORT */

import * as openPath from 'open';
import * as vscode from 'vscode';
import Utils from './utils';

/* COMMANDS */

async function open () {

  const {activeTextEditor} = vscode.window,
        editorPath = activeTextEditor && activeTextEditor.document.uri.fsPath,
        rootPath = Utils.folder.getRootPath ( editorPath );

  if ( !rootPath ) return vscode.window.showErrorMessage ( 'You have to open a project before being able to open it in GitTower' );

  const projectPath = await Utils.folder.getWrapperPathOf ( rootPath, editorPath || rootPath, '.git' );

  if ( projectPath ) {

    openPath ( projectPath, 'Tower' );

  } else {

    vscode.window.showErrorMessage ( 'The project needs to be a git repository for opening it in GitTower' );

  }

}

/* EXPORT */

export {open};
