module.exports = {

  friendlyName: 'Signup',

  description: 'Signup auth.',

  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
    },
    // TODO: add password validation
    password: {
      type: 'string',
      required: true,
    }
  },

  exits: {
    conflict: {
      statusCode: 409,
    }
  },

  fn: async function (inputs, exits) {

    // check dupe email
    const usersWithEmail = await User.count({
      email: inputs.email,
    })
    if (usersWithEmail > 0) {
      return exits.conflict({
        msg: 'A user with that account already exists! Try logging in'
      })
    }

    // build payload and create account
    const payload = {
      fullName: inputs.fullName,
      email: inputs.email,
    };
    payload.password = await sails.helpers.passwords.hashPassword(
      inputs.password
    );
    await User.create(payload)

    return exits.success({});

  }

};
