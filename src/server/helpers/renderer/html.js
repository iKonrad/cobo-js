import serialize from 'serialize-javascript';
import settings from 'settings';
import React from 'react';

const html = (content, store, scripts = '', styles = '', links = '', serverData) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Cobo.js</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            ${links}
            ${styles}
        </head>
        <body>
            <div id="root">${content}</div>
            <script>
                window.SERVER_DATA = ${serialize(JSON.stringify(serverData))}
                window.INITIAL_STATE = ${serialize(JSON.stringify(store.getState()))}
            </script>
            
            ${scripts}
          
        </body>
    </html>
  `;

export default html;
