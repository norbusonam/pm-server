module.exports = {

  friendlyName: 'Status',

  description: 'Status auth.',

  inputs: {

  },

  exits: {

  },

  fn: async function (inputs, exits) {

    return exits.success(!!this.req.me);

  }

};
