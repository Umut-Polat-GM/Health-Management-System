const Specialization = require("../models/specializationModel.js")


const addSpesialization = async (req, res) => {//doctor catrgory
    try {
        const { specialization } = req.body
        if (!req.body) {
            res.status(400)
            throw new Error('Please add a text field')
        }

        const spes = await Specialization.create({ specialization })
        res.status(200).json(spes)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "unable to add spesialization",
            error,
        });
    }
}


module.exports = {
    addSpesialization,
};