const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/users')

const newUser = {
	username: 'test-lacapsule',
	password: 'test123',
	token: 'faketoken',
	canBookmark: true,
}

beforeEach(async () => {
	await User.deleteOne({ username: new RegExp(newUser.username, 'i') })
})

it('Users schema & model', () => {
	expect(User).toBeDefined()

	const newFakeUser = new User(newUser)

	expect(newFakeUser).toHaveProperty('_id')
	expect(newFakeUser).toHaveProperty('username', newUser.username)
	expect(newFakeUser).toHaveProperty('password', newUser.password)
	expect(newFakeUser).toHaveProperty('token', newUser.token)
	expect(newFakeUser).toHaveProperty('canBookmark', newUser.canBookmark)
})

it('POST /users/signup', async () => {
	const res = await request(app).post('/users/signup').send(newUser)

	expect(res.statusCode).toBe(200)
	expect(res.body.result).toBe(true)
	expect(res.body.token).toEqual(expect.any(String))
	expect(res.body.token.length).toBe(32)
})

it('POST /users/signin', async () => {
	const res = await request(app).post('/users/signup').send(newUser)
	expect(res.statusCode).toBe(200)
	expect(res.body.result).toBe(true)
	expect(res.body.token).toEqual(expect.any(String))
	expect(res.body.token.length).toBe(32)

	const res2 = await request(app).post('/users/signin').send({
		username: newUser.username,
		password: newUser.password,
	})
	expect(res2.statusCode).toBe(200)
	expect(res2.body.result).toBe(true)
	expect(res.body.token).toEqual(expect.any(String))
	expect(res.body.token.length).toBe(32)
})

it('GET /users/canBookmark/:token', async () => {
	const res = await request(app).post('/users/signup').send(newUser)
	expect(res.statusCode).toBe(200)
	expect(res.body.result).toBe(true)
	expect(res.body.token).toEqual(expect.any(String))
	expect(res.body.token.length).toBe(32)

	await User.updateOne({ token: res.body.token }, { canBookmark: false })

	const res2 = await request(app).get(`/users/canBookmark/${res.body.token}`)
	expect(res2.statusCode).toBe(200)
	expect(res2.body.result).toBe(true)
	expect(res2.body.canBookmark).toBe(false)
})

afterAll(async () => {
	await User.deleteOne({ username: new RegExp(newUser.username, 'i') })
	mongoose.connection.close()
})
