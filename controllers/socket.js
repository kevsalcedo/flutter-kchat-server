const User = require("../models/user");
const Message = require("../models/message");

const userConnected = async (uid = "") => {
  const user = await User.findById(uid);
  user.online = true;
  await user.save();
  return user;
};

const userDisconnected = async (uid = "") => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();
  return user;
};

const saveMessage = async (payload) => {
  /* 
  payload = {
    from: '',
    for: '',
    msg:'',
  }
   */

  try {
    
    console.log(payload);
    const message = new Message(payload);
    console.log(message);
    await message.save();
    return true;
  } catch (error) {
    console.log('msg not saved');
    return false;
  }
};

module.exports = {
  userConnected,
  userDisconnected,
  saveMessage,
};
