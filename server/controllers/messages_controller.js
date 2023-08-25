const Messages = require('../models/messages');

//controller for storing messages
const storeMessage = async(req, res) => {
    console.log(req.body)
    const {msg, room, user} = req.body;

    try{
        const newMessage = new Messages({
            msg: msg,
            room: room,
            user: user
        })
        res.status(200).send('message stored');
        await newMessage.save();
    }catch(err){
        res.status(500).send('error storing message');
    }
}

const findMessageViaRoom = async (req, res) => {
    const {room} = req.params;
    //find all messages with room name
    try{
        const messages = await Messages.find({room: room});
        res.status(200).send(messages);
    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports = {
    storeMessage,
    findMessageViaRoom
}