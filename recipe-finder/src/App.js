
import {useEffect, useRef, useState} from 'react'
import './App.css';
function App() {
  const [ingredients,setIngredients]=useState([])
 
  const[loading,setLoading]=useState(false);

  let apiId="b594d288";
  let  appKey="5521b7867105cf63dc56b83614ae4a96"	;
 

  const inputRef=useRef(null)

  const handleSearch=()=>{
    searchForRecipe(inputRef.current.value);
    inputRef.current.value=""
  }

  const searchForRecipe=(query)=> {
    let apiUrl=`https://api.edamam.com/search?q=${query}&app_id=${apiId}&app_key=${appKey}`
    setLoading(true)
    fetch(apiUrl).then(res=>res.json()).then(res=>{
      
      setIngredients(res.hits);
      setLoading(false  );

  }).catch(err=>{console.log(err)
  setLoading(false)});
  }

  useEffect(() => {
  searchForRecipe('chicken')
  
  },[])

  
  
  return (
    <div className="App">
     Recipe Finder
     <div className='search'>
    <input ref={inputRef}type='text' placeholder='Search here'/>
    <button onClick={handleSearch}>Search</button>
     </div>
  {loading&&<p>Loading...</p>}
     <div className='main'>
  {ingredients.map((recipeItem)=>
    <div key={recipeItem.recipe.label} className='recipies'> 
   <span>{recipeItem.recipe.label}</span>
   <img src={recipeItem.recipe.image}/>
   <div className='Ingridients'>
   {recipeItem.recipe.ingredientLines.map((actualIngredients,idx)=>  
  <div key={idx}>
   {actualIngredients}</div>
  )}
 </div>
    </div>)
  
}
</div>
    </div>
  );
}

export default App;
