const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    weeklyGoal: {
        type: Boolean,
        default: false
    },
    monthlyGoal: {
        type: Boolean,
        default: false
    },
    quarterlyGoal: {
        type: Boolean,
        default: false
    },
    biannualGoal: {
        type: Boolean,
        default: false
    },
    annualGoal: {
        type: Boolean,
        default: false
    },
    achieved: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal