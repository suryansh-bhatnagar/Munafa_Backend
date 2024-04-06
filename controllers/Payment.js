const Payment = require('../models/PaymentDetails');


exports.savePaymentDetails = async (req, res) => {

    const { name, email, amount, payment_id } = req.body;
    try {
        await Payment.create({
            name,
            email,
            amount,
            payment_id
        });
        res.send({ status: "ok", data: "Payment details saved" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }

}

exports.getAllTransaction = async (req, res) => {

    const { email } = req.body;

    Payment.find({ email: email }).then((data) => {
        if (data.length > 0) {
            // Documents found
            return res.send({ status: "Ok", data: data });
        } else {
            // No documents found
            return res.send({ status: "Not Found", message: "No payments found for the given email." });
        }
    }).catch((error) => {
        console.error(error);
        return res.status(500).send({ status: "error", message: "An error occurred while fetching the data." });
    })
}