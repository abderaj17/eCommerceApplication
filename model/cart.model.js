const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
     userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
     },
      products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true

            },
            quatity: {
                type: Number,
                required: true,
            }

        },

      ],
      total: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
      },
      createdAt: {
        type: Date,
        default: Date.now

      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});
