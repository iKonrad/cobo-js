import serialize from 'serialize-javascript';

import React from 'react';

const html = (content, store, scripts = [], styles = []) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Sozzy</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${
              styles.map(style => `<link rel="stylesheet" href="/${style}" />`).join('\n')
            }
        </head>
        <body>
            <div id="root">${ content }</div>
            <script>
                window.INITIAL_STATE = ${serialize(JSON.stringify(store.getState()))}
            </script>
            
            ${
              scripts.map(script => `<script crossorigin src="/${script}"></script>`)
                .join('\n')
            }
           
        </body>
    </html>
  `;
}

export default html;
