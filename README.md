## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technical Decisions

## Framework and libraries used

- Next.js
- TailwindCSS
- HeadlessUI
- TanStack Query
- Jest

### Authentication

- It uses Next.js middleware to protect unauthorized access.
- The application maintains login status by setting a cookie that stores `true` for authenticated users.
- This cookie is configured to expire after approximately 59 minutes, aligning with the one-hour expiration of the Fetch access token.
- In addition to the cookie, the system includes a safeguard: if the Fetch API endpoints return a 401 error, users are redirected to the login page.
- Next.js middleware is employed to prevent unauthorized access to protected routes.
