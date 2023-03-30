# greenventure-leaderboards

docker build -t leaderboards .  

docker run --name greenventure-leaderboards -p 5103:5103  leaderboards

# API Documentation

## Base API URL
https://localhost:3001/api/leaderboards

## User Related APIs

#### Get all users
**GET:** /<br>
**Send:** NIL <br>
**Receive:** All Users || Response Code - 404 || Response Code - 404, unknown endpoint

#### Get specific user
**GET:** /:userId <br>
**Send:** NIL <br>
**Receive:** Specific User || Response Code - 404 || Response Code - 404, unknown endpoint

#### Add a user
**POST:** / <br>
**Send:** userId (String), name (String), points (Number)<br>
**Receive:**  User Object, Response Code - 201 || Exception || Response Code - 404, unknown endpoint

#### Update a user's points
**PATCH:** /:userId <br>
**Send:** points (Number) <br>
**Receive:** Response Code - 204, No Content || Respose Code - 404 ||Respose Code - 404, unknown endpoint
