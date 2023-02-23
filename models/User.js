const { Schema, model } = require('mongoose');

const UsersSchema = new Schema (
    {
        username: {
            type: String, 
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: String,
            validate: {
              len: [8],
            },
          },
          thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
        },
        {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
        }
    )

    const Users = model('Users', UsersSchema);

    module.exports = Users;