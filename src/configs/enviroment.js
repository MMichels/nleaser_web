var env = process.env.REACT_APP_ENV

var ambient = require(`./enviroment.${env}.js`);

console.log('Env: ' + env + ' Ambient: ', ambient);

const environment = ambient.environment;

export default environment;