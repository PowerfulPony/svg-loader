const SVGO = require('svgo');

const svgo = new SVGO({
  plugins: [{
    removeTitle: true
  }, {
    removeDimensions: true
  }, {
    removeUselessStrokeAndFill: false
  }]
});

module.exports = function loader(content) {
  if (this.cacheable) this.cacheable();

  const { query } = this;
  let output = `${content}`;

  if (query && query.remove) {
    for (let i = query.remove.length - 1; i >= 0; i -= 1) {
      const removable = query.remove[i];
      const re = new RegExp(removable, 'gim');
      output = output.replace(re, '');
    }
  }

  svgo.optimize(output, (result) => {
    output = result.data;
  });

  return `module.exports = '${output}'`;
};