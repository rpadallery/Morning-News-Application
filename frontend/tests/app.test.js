import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Article from '../components/Article'
import '@testing-library/jest-dom'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('next/image', () => {
	return {
		__esModule: true,
		default: () => {
			return <img />
		},
	}
})

describe('Article Component', () => {
	let store

	beforeEach(() => {
		store = mockStore({
			user: {
				value: {
					token: 'mockToken',
				},
			},
		})
	})

	test('renders article with bookmark icon', () => {
		const props = {
			title: 'Test Article',
			author: 'Test Author',
			urlToImage: 'test-image-url',
			description: 'Test Description',
			isBookmarked: false,
			inBookmarks: false,
		}
		render(
			<Provider store={store}>
				<Article {...props} />
			</Provider>
		)

		const bookmarkIcon = screen.getByTestId('bookmark-icon')
		expect(bookmarkIcon).toBeInTheDocument()
	})

	test('dispatches addBookmark action when bookmark icon is clicked', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ result: true, canBookmark: true }),
			})
		)
		const props = {
			title: 'Test Article',
			author: 'Test Author',
			urlToImage: 'test-image-url',
			description: 'Test Description',
			isBookmarked: false,
			inBookmarks: false,
		}
		render(
			<Provider store={store}>
				<Article {...props} />
			</Provider>
		)

		const bookmarkIcon = screen.getByTestId('bookmark-icon')
		fireEvent.click(bookmarkIcon)

		await waitFor(() => {
			expect(store.getActions()).toEqual([
				{ type: 'bookmarks/addBookmark', payload: { ...props } },
			])
		})
	})
})