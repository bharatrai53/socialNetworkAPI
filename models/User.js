const { Schema, model } = require('mongoose');

const usersSchema = new Schema (
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
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
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

    const User = model('User', usersSchema);

    module.exports = User;