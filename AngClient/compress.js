const brotli = require('brotli');
const fs = require('fs');
const zlib = require('zlib');

const brotliSettings = {
  extension: 'br',
  skipLarger: true,
  mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 10, // 0 - 11,
  lgwin: 12 // default
};

const gzipSettings = {
  level: 9
}

var dirs = ['src/assets/capben'];

dirs.forEach(dir => {
  fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.json'))  {

      // brotli
      const result = brotli.compress(fs.readFileSync(dir + '/' + file), brotliSettings);
      fs.writeFileSync(dir + '/' + file + '.br', result);

      // gzip
      const fileContents = fs.createReadStream(dir + '/' + file);
      const writeStream = fs.createWriteStream(dir + '/' + file + '.gz');
      const zip = zlib.createGzip(gzipSettings);
      fileContents
        .pipe(zip)
        .on('error', err => console.error(err))
        .pipe(writeStream)
        .on('error', err => console.error(err));
    }
  })
});
