# Metrics Client

As part of the job interview process with Factorial HR, I was tasked with creating a full-stack application, made up of a frontend and a backend. This repository focuses on the frontend segment of the assignment.

The backend repository can be found [here](https://github.com/michaelito80us/metrics-api)

**Project Requirement from Factorial**:
Develop a Frontend + Backend application that facilitates the posting and visualization of metrics. Each metric entry should possess a timestamp, name, and value. The metrics must be displayed on a timeline and should be capable of showcasing averages per minute, hour, and day. All metrics will be stored persistently in a database.

## Table of Contents

- [Frontend Setup](#frontend-setup)
  - [Installing and Running the Client](#installing-and-running-the-client)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Frontend Setup

### Installing and Running the Client

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run the Client**:
   ```bash
   npm run rev
   ```

After executing these commands, the frontend will be accessible at `http://localhost:5173`.

## Technologies Used

- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Moment.js**: A library to manipulate and format dates.
- **React-Hook-Form**: Efficient, flexible and extensible forms in React.
- **React-Select**: A flexible and powerful Select Input control for React.
- **Recharts**: A tool to easily create charts in React.

## Features

- **Post Metrics**: Users can input new metric data complete with a timestamp, name, and value.
- **Visualize Metrics**: Metrics are presented on a timeline for easy access and visualization.
- **Compute Averages**: The interface allows users to view calculated averages of metrics over different time periods.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
