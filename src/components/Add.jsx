import React, { useState, useContext } from 'react';
import {ThemeContext}from "../context/ThemeContext"
import { FullCard } from './FullCard';
import SearchGif from '../assets/search.webp';
import './add.css';

export const Add = () => {
	// Theme Switcher
	const { darkTheme, setDarkTheme } = useContext(ThemeContext);
	let darkClass = darkTheme ? ' dark' : '';
	// Add
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [page, setPage] = useState('');
	const [totalPages, setTotalPages] = useState('');

	const Search = (page) => (e) => {
		e.preventDefault();
		setPage(1);

		setQuery(e.target.value);
		fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=b8723cef7967276c30d0623e7338bcc4&language=en-US&page=1&include_adult=false&query=${e.target.value}&page=${page}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (!data.errors) {
					console.log(data);
					console.log('page is ' + page);
					let arr = data.results.filter((item) => {
						// Unifies name and title for Movies and TV Shows
						if (item.media_type === 'tv') item.title = item.name;
						// Filters Movie and TV Shows, excludes i.e. Persons
						return item.media_type === 'movie' || item.media_type === 'tv';
					});

					setTotalPages(data.total_pages);
					setResults(arr);
				} else {
					setResults([]);
				}
			});
	};

	const nextPage = (e) => {
		e.preventDefault();
		setPage(2);
		console.log(page);
		setQuery(e.target.value);
		fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=b8723cef7967276c30d0623e7338bcc4&language=en-US&page=1&include_adult=false&query=${e.target.value}&page=${page}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (!data.errors) {
					console.log(data);
					console.log(page);
					let arr = data.results.filter((item) => {
						// Unifies name and title for Movies and TV Shows
						if (item.media_type === 'tv') item.title = item.name;
						// Filters Movie and TV Shows, excludes i.e. Persons
						return item.media_type === 'movie' || item.media_type === 'tv';
					});

					setTotalPages(data.total_pages);
					setResults(arr);
				} else {
					setResults([]);
				}
			});
	};
	const prevPage = (e) => {
		e.preventDefault();
		// let current = page;
		// let previous = current - 1;
		// setPage(previous);
		// // Search(page);
		// console.log(page);
	};

	return (
		<div className={'add__container' + darkClass}>
			<h2 className={'add__title' + darkClass}>Add Movies and TV Shows</h2>
			<div className={'input__wrapper' + darkClass}>
				<input
					type="text"
					placeholder="Search for a Movie or TV Show"
					value={query}
					onChange={Search(page)}
					// if (e.target.value.length >= 3)
				/>
			</div>

			{results.length > 0 ? (
				<React.Fragment>
					<ul className={'add__results' + darkClass}>
						{results.map((item) => (
							<FullCard item={item} />
						))}
					</ul>
					{totalPages > 1 && (
						<div className="button">
							<button className={'add__prev-page' + darkClass} onClick={prevPage}>
								Previous
							</button>
							<button className={'add__next-page' + darkClass} onClick={nextPage}>
								Next
							</button>
						</div>
					)}
				</React.Fragment>
			) : (
				<div className={'add__gif-container' + darkClass}>
					<img src={SearchGif} alt="Sarch GIF from Giphy.com" className={'add__gif' + darkClass} />
				</div>
			)}
		</div>
	);
};
