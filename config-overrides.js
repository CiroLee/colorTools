const {override,fixBabelImports} = require('customize-cra');
process.env.GENERATE_SOURCEMAP = "false";
module.exports =override(
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:'css'
    })
);