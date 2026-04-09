import React, { useState } from 'react';
import Nav from "./Nav";

import hogs from "../porkers_data";

const HogTile = ({ hog, onHideHog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="ui eight wide column">
      <div className="ui card" aria-label="hog card" onClick={() => setShowDetails(!showDetails)}>
        <div className="image">
          <img src={hog.image} alt={hog.name} />
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
	// state check active greased pig 
	const [showGreased, setShowGreased] = useState(false); 

	// state pig name or weight 
	const [sortBy, setSortBy] = useState("name"); 

	// hide hogs
	const [hiddenHogs, setHiddenHogs] = useState([]); 

	// hide hog 
	const handleHideHog = (name) => {
  		setHiddenHogs([...hiddenHogs, name]);
	};

	// filter logic
	const filteredAndSortedHogs = [...hogs]
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
			<HogContainer hogs={filteredAndSortedHogs} onHideHog={handleHideHog}/>
		</div>
	);
}

export default App;
