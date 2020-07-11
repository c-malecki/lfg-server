// local JSON routes
exports.localGroups = require("./local/groups");
exports.localMessages = require("./local/messages");
exports.localPosts = require("./local/posts");
exports.localUsers = require("./local/users");
exports.localLogin = require("./local/login");
// database routes
exports.devGroups = require("./dev/groups");
exports.devMessages = require("./dev/messages");
exports.devPosts = require("./dev/posts");
exports.devUsers = require("./dev/users");
exports.devLogin = require("./dev/login");
