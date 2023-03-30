import React, { useState, useEffect } from "react";
import LeaderboardService from "../services/leaderboards";
import { FaCrown } from "react-icons/fa";

const Leaderboard = () => {
	const [users, setUsers] = useState([]);
	const [mainUser, setMainUser] = useState("");
	const [userPosition, setUserPosition] = useState(0);

	useEffect(() => {
		// Here you can fetch the data from your API or database
		LeaderboardService
			.getAll()
			.then((users) => {
				setUsers(users);
			}
		);
	}, []);

	// Randomize profile pictures for users
	const imageCount = 15;
	const randomizeProfilePictures = () => {
		const randInt = Math.floor(Math.random() * imageCount) + 1;
		return `${randInt}.avif`;
	}

	// Sort the users by their points
	const sortedUsers = users.sort((a, b) => b.points - a.points);

	useEffect(() => {
		window.localStorage.setItem("userID", "162804203307686"); //TODO remove
		// Get mainUser userId from local storage
		const storedMainUser = window.localStorage.getItem("userID"); //TODO check if correct way to get userID
		if (storedMainUser) {
			setMainUser(storedMainUser);
		}

		// Find the index of mainUser in sortedUsers
		const index = sortedUsers.findIndex((user) => user.userId === storedMainUser);
		setUserPosition(index)
		
	}, [sortedUsers]);

	return (
		<div>
			<div className="text-center my-5">
				<h3>Leaderboard</h3>
			</div>
			{sortedUsers.length > 0 ? (
				<>
					<div className="text-center row px-5">
						<div className="col-4 m-0 p-0">
							<div className="mb-2">
								<label><strong>2</strong></label><br/>
							</div>
							<img
								src={require(`../assets/profiles/${randomizeProfilePictures()}`)}
								alt="Profile"
								className="profile rounded-circle border border-success border-2 mb-2"
								style={{ width: "80px", height: "80px", boxShadow: "0 0 6px 2px rgba(0, 255, 0, 0.5)" }}
							/>
							<br/>
							<label><strong>@{sortedUsers[1].name}</strong></label><br/>
							<label><strong className="top-three">{sortedUsers[1].points}</strong></label>
						</div>
						<div className="text-center col-4 m-0 p-0">
							<div className="mb-2">
								<label><strong>1</strong></label><br/>
								<FaCrown size={40} color="gold"/>
							</div>
							<img
								src={require(`../assets/profiles/${randomizeProfilePictures()}`)}
								alt="Profile"
								className="profile rounded-circle border border-success border-3 mb-2"
								style={{ width: "100px", height: "100px", boxShadow: "0 0 10px 4px rgba(0, 255, 0, 0.5)" }}
							/>
							<br/>
							<label><strong>@{sortedUsers[0].name}</strong></label><br/>
							<label><strong className="top-three">{sortedUsers[0].points}</strong></label>
						</div>
						<div className="col-4 m-0 p-0">
							<div className="mb-2">
								<label><strong>3</strong></label><br/>
							</div>
							<img
								src={require(`../assets/profiles/${randomizeProfilePictures()}`)}
								alt="Profile"
								className="profile rounded-circle border border-success border-2 mb-2"
								style={{ width: "80px", height: "80px", boxShadow: "0 0 6px 2px rgba(0, 255, 0, 0.5)" }}
							/>
							<br/>
							<label><strong>@{sortedUsers[2].name}</strong></label><br/>
							<label><strong className="top-three">{sortedUsers[2].points}</strong></label>
						</div>
					</div>
					<table className="table table-borderless text-center mt-4">
						<tbody>
							{sortedUsers.slice(3).map((user, index) => (
								<tr key={user.userId}>
									<td>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<label>{ index + 4 }</label>
										</div>	
										<div 
											className={`badge badge-pill p-0 ${user.userId === mainUser ? 'glow' : ''}`} 
											style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
										>
											<img
												src={require(`../assets/profiles/${randomizeProfilePictures()}`)}
												alt="Profile"
												className="profile rounded-circle me-5 ps-0"
												style={{ width: "50px", height: "50px" }}
											/>
											<label className="text-center">@{user.name}</label>
											<label className="mx-5">{user.points}</label>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Leaderboard;
