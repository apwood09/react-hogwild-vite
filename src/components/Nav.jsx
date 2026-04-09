import React from "react";
import piggy from "../assets/porco.png";

const Nav = ({ showGreased, setShowGreased, sortBy, setSortBy }) => {
	return (
		<div className="navWrapper">
			<h1>Hog Wild!</h1>
			
			<button onClick={() => setShowGreased(!showGreased)}>
        		{showGreased ? "Show All Hogs" : "Show Greased Hogs"}
      		</button>
			
			<span className="normalText">
				A React App for County Fair Hog Fans
			</span>

			<div className="filterWrapper">
				{/* greased pigs checkbox */}
				<label htmlFor="greased-filter">Greased Pigs Only?</label>
				<input 
					id="greased-filter"
					type="checkbox" 
					checked={showGreased} 
					onChange={(e) => setShowGreased(e.target.checked)} 
				/>

				{/* sortBy: name or weight */}
				<label htmlFor="sort-dropdown" style={{ marginLeft: "20px" }}>Sort by: </label>
        		<select id="sort-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          			<option value="name">Name</option>
  					<option value="weight">Weight</option>
        		</select>
			</div>
		</div>
	);
};

export default Nav;
