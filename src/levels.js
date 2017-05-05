const levels = require( '../config/levels.json' );
module.exports = {
  has: ( name ) => levels.some( ( { names } ) => names.indexOf( name ) >= 0 ),
  value: ( name ) => levels.find( ( { names } ) => names.indexOf( name ) >= 0 ).value,
  values: levels.map( level => level.value )
};
