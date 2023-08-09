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

// getAllDoctorsController
const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find({ status: "pending" })
        .populate("userId", "username email isDoctor")
        .populate("specializationId", "name"); // Gerekirse gerekli alanları popüle edebilirsiniz.
  
      res.status(200).send({
        success: true,
        message: "Pending Doctors List",
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting pending doctors",
        error,
      });
    }
  };
  
  // updateUserToDoctor
  const updateUserToDoctor = async (userId) => {
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        console.log("User not found");
        return;
      }
  
      user.isDoctor = true;
      await user.save();
  
      console.log("User updated to doctor:", user);
    } catch (error) {
      console.log("Error updating user to doctor:", error);
    }
  };
  

  

module.exports = {
    addSpesialization,
    getAllDoctors,
    updateUserToDoctor
};