const mongoose = require("mongoose");

const PaymentDetailSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: String,
            required: true,
            trim: true
        },
        payment_id: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },


    },
);

module.exports = mongoose.model('Payment', PaymentDetailSchema);

