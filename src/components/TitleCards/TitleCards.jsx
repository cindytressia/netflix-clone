import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmI1NzIyNmJmZThkY2MzNTI0YjU3NzkyNjEwZDRlZiIsIm5iZiI6MTc2MjE2MjI5Ni4xOCwic3ViIjoiNjkwODc2NzhjOGZiZTIwNWU5NDY0NDRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Noq1L8KYZH7j9kp7qtTJVbzPspdxvp63ruwsipl-WVM'
  }
};



const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(
  `https://api.themoviedb.org/3/movie/${category?category : 'now_playing'}?language=en-US&page=1`,
  options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel)
},[]) 

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <div className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </div>
        })}
      </div>
    </div>
  );
};



export default TitleCards
