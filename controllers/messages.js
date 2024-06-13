const { response } = require("express");
const Message = require("../models/message");

const getChat = async (req, res = response) => {
  const myId = req.uid;
  const messageFrom = req.params.from;

  const last30 = await Message.find({
    $or: [
      { from: myId, for: messageFrom },
      { from: messageFrom, for: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: true,
    msg: last30,
  });
};

module.exports = {
  getChat,
};
