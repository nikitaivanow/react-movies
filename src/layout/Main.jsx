import React, {useEffect, useState} from "react"
import {Movies} from '../components/Movies'
import {Search} from '../components/Search'
import {Preloader} from '../components/Preloader'

const API_KEY = process.env.REACT_APP_API_KEY

function Main() {
	const [movies, setMovies] = useState([])
	const[loading, changeLoading] = useState(true)



 const searchMovies = (str, type='all') => {
	changeLoading(true)
	fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== "all" ? `&type=${type}` : ''}`)
			.then(response => response.json())
			.then((data) => {
				setMovies(data.Search)
				changeLoading(false)
			})
			.catch((err) => {
				console.log(err)
				changeLoading(false)
			})
 }

 useEffect(()=>{
	fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
		.then((response)=> response.json())
		.then((data) => {
			setMovies(data.Search)
			changeLoading(false)
		})
		.catch((err) => {
			console.log(err)
			changeLoading(false)
		})
 },[])



	return <main className= 'container content'>
		<Search searchMovies={searchMovies}/>
		{
			loading ? (
				<Preloader/>
			) : <Movies movies={movies}/>
		}
	</main>

}
export {Main}