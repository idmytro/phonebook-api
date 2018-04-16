"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("express-sessions");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// need to be declare before Passport
const UsersModel = require("./api/v1/users/users.model");

module.exports = app => {
	// add body and cookie parsers
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());

	// add cookie-session
	app.use(
		session({
			name: "sessionId",
			secret: process.env.SECRET,
			saveUninitialized: false,
			resave: false,
			unset: "destroy",
			cookie: {
				maxAge: 24 * 60 * 60 * 1000, // 24 hours
				httpOnly: true
				// secure: true
			},
			store: new MongoStore({
				storage: "mongodb",
				instance: mongoose, // optional;)
				collection: "ExpressSessions"
			})
		})
	);

	// Passport local strategy
	passport.use(
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: "email"
			},
			UsersModel.checkUser.bind(UsersModel)
		)
	);
	passport.serializeUser(UsersModel.serializeUser.bind(UsersModel));
	passport.deserializeUser(UsersModel.deserializeUser.bind(UsersModel));

	app.use(passport.initialize());
	app.use(passport.session());

	// connect API routes
	app.use("/api", require("./api/v1"));

	// error handler
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.status(400).send({ message: err.message || err });
	});
};
