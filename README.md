# How to run

```bash
# install dependencies
npm install

# run in dev mode
npm run dev

# build production
npm run build

# run in production mode
npm run preview
```

# FAQ

## Why you chose to structure and write your code the way you did.

I chose a modular and scalable code structure to ensure the project follows best practices and remains easy to maintain as it grows. Each part of the application is split into distinct folders and files based on its role:

- `pages`: Organized main views or screens of the application. This approach allows for easy scaling and routing as the app grows.
- `components`: For reusable and testable React components.
- `contexts`: To manage the state of the Tic Tac Toe board and share it across components efficiently.
- `styles`: To encapsulate styles using SCSS modules, ensuring styles are scoped to individual components and avoiding conflicts.
- `utils`: For helper functions like dynamically generating winning combinations, which makes the logic reusable and testable.
- `assets`: Stores static files like images, icons, and fonts. This ensures these resources are organized and accessible without cluttering the codebase.

## What libraries or tools you used and why.

- Vite: Chosen as the project bundler because it provides a fast development server, quick build times, and excellent support for modern JavaScript and React projects.
- React: Used for building the user interface due to its component-based architecture and state management capabilities.
- React Context: Implemented for board state management to provide a clean and centralized way to manage the game state across components without prop drilling.
- CSS/SCSS Modules: Used for styling to take advantage of nested styles, variables, and mixins for better organization and maintainability, while SCSS modules provide style encapsulation.
- npm: Used as the package manager to handle dependencies effectively.
- ESLint and Prettier: For linting and formatting to enforce coding standards and maintain code quality.

## Any other design decisions that you feel are important and need to be described.

- Dynamic Board Size: The board's size and win condition are dynamically calculated to support scalability, making the game adaptable to both small (e.g., 3x3) and large (e.g., 10x10) boards.
- State Management with Context and `useReducer`: React Context and `useReducer` were chosen over more complex solutions like Redux because the application's state is relatively simple and doesn't require advanced features like middleware.
