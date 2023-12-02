
  

# Marvel Movie Maker

  

This is a demo project that lets you create hypothetical movies using Vite, React, Typescript, Vitest and [Marvel's  API](https://developer.marvel.com/)

On the homepage, you can see your movies with the cast information. On the create/edit pages, you can arrange your cast by searching and dragging them over the specific areas.

The goal is to demonstrate javascript code in react. The UI looks ...decent, but not amazing as that was not a goal for this project.

## Inspiration
- **No Frameworks**: To refrain from using React frameworks like Remix or Next. To simply use Vite to create a fast react application to demonstrate that ability. Demonstrate usage of default and custom react hooks.
- **Demonstrate HTML API usage without any libraries**: The project uses HTML `Drag & Drop` API usage without using any NPM libraries. To also demonstrate limits on such action by a MAX parameter on the droppable component.
- **Demonstrate browser API usage**: This project uses `LocalStorage` to persist data between different sessions. This persists the `App` state's movies list. This does not use a 3rd party library, rather react's `useEffect` hook with the `Context API`.
- **No UI Libraries**: To simplify CSS styling, I am using `Tailwind`. But no other UI libraries should be in use. To demonstrate matters like `animation` and `grid` with `responsiveness`.
- **FAST testing with Vitest**: To demonstrate fast testing with `Vitest`.
- **Demonstrate advanced Vite concepts**: Concepts such as `Aliasing` and common patterns such as environmental variables.
- **Demonstrate State Management**: This project uses React's `Context API` with `reducer pattern` to manage both `App` and `Ephimeral` state.
- **Tailwind**: Some Tailwind CSS usage to demonstrate that knowledge.

## Attribution
Data provided by Marvel. © 2014 Marvel.

## Development
1. Copy the .env file with: `cp .env.sample .env`
2. Create a developer account in [Marvel's  API](https://developer.marvel.com/) and acquire an API key.
3. Add `localhost` to the approved domains.
4. Set the API Key value in the `.env` file.
5. Install dependencies with `npm i` or `yarn`
6. To run the development environment, use `npm run dev` or `yarn dev`
7. Access the development site at http://localhost:3000
8. To test, use `npm run test` or `yarn test`
9. To build run `yarn build` and to preview run `yarn preview`

## Notes
1. Marvel's API key is a public key that is bound to your specific approved domains. So it is safe to use it if you have tied it to your deployed domain. But since this is for your localhost, it is best not to deploy with that key since someone else could use it. It is best to use a different key for that purpose.
2. Tests are located in the `__tests__` folder. It's a personal preference. Most projects contain the test files alongside the components themselves.
