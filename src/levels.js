const config = require( '../config/levels.json' );
const names = Array.prototype.concat( ...config.map( level => level.names ) );
module.exports = {
	config, names,
  has: ( name ) => names.indexOf( name ) >= 0,
  value: ( name ) => config.find( ( { names } ) => names.indexOf( name ) >= 0 ).value,
};
