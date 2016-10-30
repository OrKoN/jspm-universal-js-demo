import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import IndexPage from './src/pages/index.js';

let app = express();

app.use('/jspm_packages', express.static('jspm_packages'));
app.use('/src', express.static('src'));
app.use('/jspm.config.js', express.static('jspm.config.js'));

app.get('/', (req, res) => {
  let pageHTML = ReactDOMServer.renderToString(React.createElement(IndexPage));
  let result = `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <div id="container">${pageHTML}</div>
        <script src="jspm_packages/system.js"></script>
        <script src="jspm.config.js"></script>
        <script>
          Promise.all([
            System.import('./src/pages/index.js'),
            System.import('react-dom'),
            System.import('react')
          ]).then((results) => {
            const IndexPage = results[0].default;
            const ReactDOM = results[1];
            const React = results[2];
            ReactDOM.render(React.createElement(IndexPage), document.getElementById('container'));
          });
        </script>
      </body>
    </html>`;
  res.send(result);
});

app.listen('8080', () => console.log('Listening on port 8080'));