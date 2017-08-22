
/* IMPORT */

import * as absolute from 'absolute';
import * as openPath from 'open';
import * as path from 'path';
import * as vscode from 'vscode';
import Utils from './utils';

/* COMMANDS */

async function open () {

  const {rootPath} = vscode.workspace;

  if ( !rootPath ) return vscode.window.showErrorMessage ( 'You have to open a project before being able to open it in GitTower' );

  let projectPath = await Utils.folder.getWrapperPath ( rootPath, '.git' );

  if ( !projectPath ) { // Walk upwards from the currently open file

    const {activeTextEditor} = vscode.window,
          editorPath = activeTextEditor && activeTextEditor.document.fileName,
          folderPath = editorPath && absolute ( editorPath ) && path.dirname ( editorPath );

    if ( folderPath ) {

      projectPath = await Utils.folder.getWrapperPath ( folderPath, '.git' );

    }

  }

  if ( projectPath ) {

    openPath ( projectPath, 'Tower' );

  } else {

    vscode.window.showErrorMessage ( 'The project needs to be a git repository for opening in GitTower' );

  }

}

/* EXPORT */

export {open};
