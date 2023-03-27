import React, { useState, useEffect } from "react";
import LeaderboardService from "../services/leaderboards";

const Leaderboard = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		// Here you can fetch the data from your API or database
		LeaderboardService
			.getAll()
			.then((users) => {
				setUsers(users);
			}
		);
	}, []);

	// Sort the users by their points
	const sortedUsers = users.sort((a, b) => b.points - a.points);

	// Randomize profile pictures for users
	const imageCount = 15;
	const randomizeProfilePictures = () => {
		const randInt = Math.floor(Math.random() * imageCount) + 1;
		return `${randInt}.avif`;
	}

	return (
		<div>
			<h2>Leaderboard</h2>
			<table>
				<thead>
				<tr>
					<th>Rank</th>
					<th>Name</th>
					<th>Points</th>
				</tr>
				</thead>
				<tbody>
				{sortedUsers.map((user, index) => (
					<tr key={user.id}>
						<td>
							<img
								src={require(`../assets/profiles/${randomizeProfilePictures()}`)}
								alt="Profile"
								className="profile rounded-circle"
								style={{ width: "50px", height: "50px" }}
							/>
						</td>
						<td>{index + 1}</td>
						<td>{user.name}</td>
						<td>{user.points}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default Leaderboard;
