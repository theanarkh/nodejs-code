const { Module } = require('module');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { compileFunction } = process.binding('contextify');
Module._extensions['.ts'] = function(module, filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const { outputText } = ts.transpileModule(content, { compilerOptions: { module: ts.ModuleKind.CommonJS }});
    const result = compileFunction(
        outputText,
        filename,
        0,
        0,
        undefined,
        false,
        undefined,
        [],
        [
          'exports',
          'require',
          'module',
          '__filename',
          '__dirname',
        ]
    );
    result.function.call(this, module.exports, (...args) => module.require(...args), module, filename, path.dirname(filename));
};
