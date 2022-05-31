const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // if (await User.isEmailTaken(userBody.username)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  // }

  // const user = prisma.users.create({
  //   data: {
  //     username: userBody.username,
  //     password: userBody.password,
  //     name: userBody.name,
  //     profilepictureurl: userBody.profilepictureurl
  //   },
  // });

  const saltRounds = 10;

  userBody.password = await bcrypt.hash(userBody.password, saltRounds);

  const checkUsername = await prisma.users.findUnique({
    where: {
      username: userBody.username,
    },
  });

  if (checkUsername) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }

  const user = prisma.users.create({
    data: userBody,
  });

  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  // return User.findById(id);
  return prisma.users.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {
  // return User.findOne({ username });
  return prisma.users.findUnique({
    where: {
      username,
    },
  });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const deleteUser = await prisma.users.delete({
    where: {
      id: userId,
    },
  });
  // const user = await getUserById(userId);
  if (!deleteUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // await user.remove();
  return deleteUser;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByUsername,
  updateUserById,
  deleteUserById,
};
