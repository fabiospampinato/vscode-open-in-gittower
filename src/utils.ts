
/* IMPORT */

import * as _ from 'lodash';
import * as findUp from 'find-up';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as Commands from './commands';

/* UTILS */

const Utils = {

  initCommands ( context: vscode.ExtensionContext ) {

    const {commands} = vscode.extensions.getExtension ( 'fabiospampinato.vscode-open-in-gittower' ).packageJSON.contributes;

    commands.forEach ( ({ command, title }) => {

      const commandName = _.last ( command.split ( '.' ) ) as string,
            handler = Commands[commandName],
            disposable = vscode.commands.registerCommand ( command, () => handler () );

      context.subscriptions.push ( disposable );

    });

    return Commands;

  },

  folder: {

    exists ( folderpath ) {

      try {
        fs.accessSync ( folderpath );
        return true;
      } catch ( e ) {
        return false;
      }

    },

    async getWrapperPath ( rootPath, cwdPath, findPath ) {

      const foundPath = await findUp ( findPath, { cwd: cwdPath } );

      if ( foundPath ) {

        const wrapperPath = path.dirname ( foundPath );

        if ( wrapperPath.startsWith ( rootPath ) ) {

          return wrapperPath;

        }

      }

    }

  }

};

/* EXPORT */

export default Utils;
