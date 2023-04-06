import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import Email from '../utils/email.js'

// @desc Auth user & get token
// @desc POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isAssistant: user.isAssistant,
      favorites: user.favorites,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Naplatný email alebo heslo')
  }
})

// @descRegister a new user
// @desc POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })

  const url = `${req.protocol}://${req.get('host')}`

  if (user) {
    await new Email(user, url).sendWelcome()

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isAssistant: user.isAssistant,

      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new ErrorEvent('Naplatné dáta užívateľa')
  }
})

// @desc Get user profile
// @desc GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isAssistant: user.isAssistant,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Update user profile
// @desc PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isAssistant: user.isAssistant,

      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get all users
// @desc GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc Delete user
// @desc DELETE /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found ')
  }
})

// @desc Get user by ID
// @desc GET /api/users/:id
// @access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Update user
// @desc PUT /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const favorites = req.body.favorites
  // console.log(favorites, user)
  if (favorites) {
    user.favorites.push(favorites)

    const updatedUser = await user.save()
    console.log('FUU:', updatedUser)

    res.json({
      _id: updatedUser._id,
      favorites: updatedUser.favorites,
    })
  } else if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    user.isAssistant = req.body.isAssistant

    const updatedUser = await user.save()
    console.log('UU:', updatedUser)

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      favorites: updatedUser.favorites,
      isAdmin: updatedUser.isAdmin,
      isAssistant: updatedUser.isAssistant,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const addToFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const { productId } = req.body

  if (user) {
    console.log(user)
    user.favorites.push(productId)

    const updatedUser = await user.save()

    res.json(updatedUser)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addToFavorites,
}
