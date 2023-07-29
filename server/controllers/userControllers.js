const User = require("../models/userModel");


const getAllNotification = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const seennotification = user.seennotification;
      const notifcation = user.notifcation;
      seennotification.push(...notifcation);
      user.notifcation = [];
      user.seennotification = notifcation;
      const updatedUser = await user.save();
      res.status(200).send({
        success: true,
        message: "all notification marked as read",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error,
      });
    }
  };

  const deleteAllNotification = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      user.notifcation = [];
      user.seennotification = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;//password bilgisine erişilmemesi için 
      res.status(200).send({
        success: true,
        message: "Notifications Deleted successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "unable to delete all notifications",
        error,
      });
    }
  };

  module.exports = {
    getAllNotification,
    deleteAllNotification
  };
  