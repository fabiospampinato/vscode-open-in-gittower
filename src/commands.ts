
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import openPath from 'tiny-open';
import vscode from 'vscode';
import {getProjectRootPath} from 'vscode-extras';

/* MAIN */

const open = (): void => {

  const rootPath = getProjectRootPath ();

  if ( !rootPath ) return void vscode.window.showErrorMessage ( 'You have to open a project before being able to open it in GitTower' );

  const gitPath = path.join ( rootPath, '.git' );

  if ( !fs.existsSync ( gitPath ) ) return void vscode.window.showErrorMessage ( 'The project needs to be a git repository for opening it in GitTower' );

  const app = ( process.platform === 'darwin' ) ? 'Tower' : 'tower';

  openPath ( rootPath, { app } );

};

/* EXPORT */

export {open};
