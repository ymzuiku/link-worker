#!/usr/bin/env node

const fs = require('fs');
const resolve = require('path').resolve;
const argv = process.argv.splice(2);

const listenPath = resolve(process.cwd(), argv[0]);
const copyPath = resolve(process.cwd(), argv[1]);

const watcher = fs.watch(listenPath, { recursive: true }, (...args) => {
  const copyFile = resolve(listenPath, args[1]);
  const targetFile = resolve(copyPath, args[1]);

  fs.copyFile(copyFile, targetFile, err => {
    if (err) {
      console.log(err);
    }
    console.log('copy: ', copyFile, targetFile);
  });
});
