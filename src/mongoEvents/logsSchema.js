const mongoose = require('mongoose')

const LogsSchema = new mongoose.Schema({
    logtype: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    punishedId: {
        type: mongoose.SchemaTypes.String,
        required: true
    }, 
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    by: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    reason: {
        type: mongoose.SchemaTypes.String,
        required: true
    }



})

module.exports = mongoose.model('Logs', LogsSchema);