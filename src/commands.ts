
/* IMPORT */

import process from 'node:process';
import {alert, getGitRootPath, openInApp} from 'vscode-extras';

/* MAIN */

const open = (): void => {

  const rootPath = getGitRootPath ();

  if ( !rootPath ) return alert.error ( 'You have to open a git repository before being able to open it in GitTower' );

  const app = ( process.platform === 'darwin' ) ? 'Tower' : 'tower';

  openInApp ( rootPath, app );

};

/* EXPORT */

export {open};
