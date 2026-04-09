import React, { useState } from 'react';
import Nav from "./Nav";

import hogs from "../porkers_data";

function HogForm({ onAddHog }) {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    weight: "",
    greased: false,
    image: "",
    "highest medal achieved": "bronze"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddHog(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="ui form">

      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
      </div>

	  <div>
        <label htmlFor="specialty">Specialty: </label>
        <input id="specialty" type="text" value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} />
      </div>

	  <div>
        <label htmlFor="weight">Weight: </label>
        <input id="weight" type="number" step="0.1" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
      </div>

	  <div>
        <label htmlFor="greased">Greased? </label>
        <input id="greased" type="checkbox" checked={formData.greased} onChange={(e) => setFormData({...formData, greased: e.target.checked})} />
      </div>

	  <div>
        <label htmlFor="image">Image: </label>
        <input id="image" type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
      </div>

      <button type="submit">Add Hog</button>
    </form>
  );
}

const HogTile = ({ hog, onHideHog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="ui eight wide column">
      <div className="ui card" aria-label="hog card" onClick={() => setShowDetails(!showDetails)}>
        <div className="image">
          <img src={hog.image} alt={`Photo of ${hog.name}`} />
        </div>
        <div className="content">
          <h3 className="header">{hog.name}</h3>
          

          {showDetails && (
            <div className="description">
              <p>Specialty: {hog.specialty}</p>
              <p>{hog.weight}</p> 
              <p className="achievement">
            	{hog['highest medal achieved']}
              </p>
              <p>{hog.greased ? "Greased" : "Nongreased"}</p>
            </div>
          )}

          <button 
            className="ui button" 
            onClick={(e) => {
              e.stopPropagation(); 
              onHideHog(hog.name);
            }}
          >
            Hide Me
          </button>
        </div>
      </div>
    </div>
  );
};

function HogContainer({ hogs, onHideHog }) {
  return (
    <div className="ui grid container">
      {hogs.map(hog => (
        <HogTile key={hog.name} hog={hog} onHideHog={onHideHog} />
      ))}
    </div>
  );
}

function App() {
	const [allHogs, setAllHogs] = useState(hogs);

	// state check active greased pig 
	const [showGreased, setShowGreased] = useState(false); 

	// state pig name or weight 
	const [sortBy, setSortBy] = useState("name"); 

	// hide hogs
	const [hiddenHogs, setHiddenHogs] = useState([]); 

	// add hog 
	const handleAddHog = (newHog) => {
    setAllHogs([...allHogs, newHog]);
  	};

	// hide hog 
	const handleHideHog = (name) => {
  		setHiddenHogs([...hiddenHogs, name]);
	};

	// filter logic
	const filteredAndSortedHogs = [...allHogs]
	// hiden hogs 
	.filter(hog => !hiddenHogs.includes(hog.name))
	// greased pig 
    .filter((hog) => (showGreased ? hog.greased : true))
	// sort weight ot name
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "weight") {
        return a.weight - b.weight;
      }
      return 0;
    });

	return (
		<div className="App">
			<Nav showGreased={showGreased} setShowGreased={setShowGreased} sortBy={sortBy} setSortBy={setSortBy}/>
			<HogForm onAddHog={handleAddHog} /> 
			<HogContainer hogs={filteredAndSortedHogs} onHideHog={handleHideHog}/>
		</div>
	);
}

export default App;
