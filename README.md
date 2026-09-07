# MovieWeb

A movie discovery app that lets you explore movies through recommendations and build your own path from one movie to the next - filtered by streaming providers.

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS

### Tools
- Vite
- ESLint
- Prettier

## Features

- Search for movies using the TMDB API
- Get movie recommendations based on your selected movie
- Explore movies by continuously choosing from new recommendations
- Filter recommendations by selected streaming providers
- View movie posters, titles and release years
- Responsive design
- Loading states while fetching movies and images

## Getting Started

Clone the repository:

```bash
git clone https://github.com/ahmedzsolt/movieweb.git
```

Navigate to the project directory:

```bash
cd <project-folder>
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add your TMDB Read Access Token:

```env
VITE_TMDB_READ_TOKEN=your_tmdb_read_access_token
```

Start the development server:

```bash
npm run dev
```

## API

Movie data, recommendations and streaming provider information are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Live Demo

[View the live demo](live-demo-url)
