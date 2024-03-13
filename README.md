# Virtual Event Management Platform

Welcome to the Virtual Event Management Platform! This project focuses on developing a robust backend system for managing virtual events, including user registration, event scheduling, and participant management. The system is created using MongoDB as the database for storing and retrieving data.

# Features

User Management:

- Secure user registration based on roles.

- JWT-based session management for user authentication.
  Event Management:

- Create, update, and delete event details, including date, time, description, and participant list.
- Accessible only to authenticated and authorized users.
  Participant Management:

- Users can register for events.
- View and manage their event registrations.

The project utilizes Node.js, Express.js, and various NPM packages.

## Installation

Clone the repository:

```bash
  git clone https://github.com/yash17-12-98/virtual-event-management-system.git
```

Navigate to the project directory:

```bash
  cd virtual-event-management-system
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Endpoints

- POST /api/v1/auth/login: Login a user.

- POST /api/v1/auth/register: Register a new user.

- GET /api/v1/events/: Retrieve the list of events.

- POST /api/v1/events/: Create a new event.

- PUT /api/v1/events/:id: Update the event.

- DELETE /api/v1/events/:id: Delete the event.

- POST /events/:id/register: Register for the event by the user.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`API_SECRET`
