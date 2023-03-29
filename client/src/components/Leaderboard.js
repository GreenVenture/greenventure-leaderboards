import React, { useState, useEffect } from "react";
import LeaderboardService from "../services/leaderboards";
import { FaCrown } from "react-icons/fa";

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
			<div class="text-center my-5">
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
								style={{ width: "80px", height: "80px", boxShadow: "0 0 8px 2px rgba(0, 255, 0, 0.5)" }}
							/>
							<br/>
							<label><strong>@{sortedUsers[1].name}</strong></label><br/>
							<label>{sortedUsers[1].points}</label>
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
							<label><strong>@{sortedUsers[0].name}</strong></label><br/>
							<label>{sortedUsers[0].points}</label>
						</div>
						<div className="col-4 m-0 p-0">
							<div className="mb-2">
								<label><strong>3</strong></label><br/>
							</div>
							<img
								src={require(`../assets/profiles/${randomizeProfilePictures()}`)}
								alt="Profile"
								className="profile rounded-circle border border-success border-2 mb-2"
								style={{ width: "80px", height: "80px", boxShadow: "0 0 8px 2px rgba(0, 255, 0, 0.5)" }}
							/>
							<br/>
							<label><strong>@{sortedUsers[2].name}</strong></label><br/>
							<label>{sortedUsers[2].points}</label>
						</div>
					</div>
					<table className="table table-borderless text-center">
						<tbody>
							{sortedUsers.slice(3).map((user, index) => (
								<tr key={user.id}>
									<td>
									<label>{index + 4}</label>
										<img
											src={require(`../assets/profiles/${randomizeProfilePictures()}`)}
											alt="Profile"
											className="profile rounded-circle border border-success border-1"
											style={{ width: "50px", height: "50px" }}
										/>
										<span> {user.name}</span>
										<span>{user.points}</span>
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
