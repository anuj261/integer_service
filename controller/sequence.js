const mongoose = require('mongoose');
const moment = require('moment');

require('../models/user');

const User = mongoose.model('User');


const utility = require('../lib/utils');
const { request } = require('express');

/**
 * To fetch details of current number by user id
 * @param {*} req purchase id
 * @param {*} res product purchase details
 */
function numberById(req, res) {
	let query = {
		_id: req.user_Id
	}

	User.findOne(query, (err, userResult) => {
		if (err) {
			console.log(`error while fetching purchase ${err || err.stack}`);
			return res.status(400).json({
				error: 'something went wrong, please try again later'
			});
		} else if (!userResult || userResult && userResult.length < 1) {
			return res.status(400).json({
				error: 'Invalid purchase id'
			});
		}

		res.status(200).json({"Current Integer":userResult.sequence});
	});
}

/**
 * To Reset the current integer
 * @param {*} req user id
 * @param {*} res product purchase details
 */
function resetNumber(req, res, next) {
	const payload = req.body;
	let query = {
		_id: req.user_Id
	}

	const validate = utility.validateParams(payload, ['current']);
	if (validate) {
		return res.status(validate.status).json({
			error: validate.error
		})
	}else if(payload.current<0){
		return res.status(400).json({
			error: "Number can not be negative"
		})
	}

	User.findOneAndUpdate(query,{$set:{sequence:payload.current}},{new:true} ,(err, userResult) => {
		if (err) {
			console.log(`error while creating product purchase ${err || err.stack}`);

			return res.status(400).json({
				error: 'something went wrong, please try again later'
			});
		}

		res.status(200).json({
			"Current Number" : userResult.sequence
		});
	});
}


/**
 * To Reset the current integer
 * @param {*} req user id
 * @param {*} res product purchase details
 */
function nextNumber(req, res, next) {
	const payload = req.body;
	let query = {
		_id: req.user_Id
	}

	User.findOneAndUpdate(query,{ $inc: { sequence: 1 } },{new:true} ,(err, userResult) => {
		if (err) {
			console.log(`error while creating product purchase ${err || err.stack}`);

			return res.status(400).json({
				error: 'something went wrong, please try again later'
			});
		}

		res.status(200).json({
			"Next Integer" : userResult.sequence
		});
	});
}

module.exports = {
	nextNumber,
	numberById,
	resetNumber
}