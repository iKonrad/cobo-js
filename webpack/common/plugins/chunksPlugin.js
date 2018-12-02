const fs = require('fs');

class EntryChunksPlugin {
  constructor(options) {
    this.filename = options.filename;
    this.publicPath = options.publicPath;
    this.path = options.path;
  }
  apply(compiler) {
    compiler.plugin('done', (stats, done) => {
      let assets = {};

      // do we need to use the chunkGraph instead to determine order??? https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693#gistcomment-2381967
      for(let chunkGroup of stats.compilation.chunkGroups) {
        if(chunkGroup.name) {
          let css = [];
          let js = [];
          for(let chunk of chunkGroup.chunks) {
            for(let file of chunk.files) {
              if (file.endsWith('css')) {
                css.push(file);
              } else {
                js.push(file);
              }
            }
          }
          assets[chunkGroup.name] = {
            js,
            css,
          }
        }
      }
      fs.writeFile(this.path + '/' + this.filename, JSON.stringify({
        assets: assets,
        publicPath: this.publicPath,
      }), done);
    });
  }
}

module.exports = EntryChunksPlugin;
