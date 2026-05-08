const { mongoose } = require("mongoose");

const employeeModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
    },
    fromDate: {
        type: Date,
        required: true,
    },
    totalLeaveDays: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("Employee", employeeModel);