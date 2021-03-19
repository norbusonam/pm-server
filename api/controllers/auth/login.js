module.exports = {

  friendlyName: 'Login',

  description: 'Login auth.',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    badRequest: {
      statusCode: 400,
    },
    unauthorized: {
      statusCode: 401,
    }
  },

  fn: async function (inputs, exits) {
    
    const userWithEmail = await User.findOne({
      email: inputs.email,
    });
    
    // check email exists
    if (!userWithEmail) {
      return exits.badRequest({
        msg: 'There is no account with that email.'
      });
    }

    // check password correct
    try {
      await sails.helpers.passwords.checkPassword(
        inputs.password,
        userWithEmail.password,
      )
    } catch (err) {
      return exits.badRequest({
        msg: 'Wrong password.'
      });
    }

    return exits.success({});

  }

};
