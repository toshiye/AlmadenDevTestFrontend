# AlmadenDevTestFrontend
This is the solution for the **Coding Challenge Password Management** built by Gabriel Sassaki.

This test were built using Visual Studio Code.

The coding took me 4 hours to complete and i took 2 more hours to review and manually test the code.

## How to run the test app

 - Download or clone(https://github.com/toshiye/AlmadenDevTestFrontend.git) this project in a folder of your choice.
 - To start the frontend navigate to the AlmadenDevTestFrontend folder using the terminal, cmd or you preferred cli.
 - Run **npm i** or **npm install** and wait until finishing the dependecies installation.
 - Run **npm run dev** and the frontend will try to start at "http://localhost:3000/", but since it's already being used by the backend, it will automatically start on "http://localhost:3001/", you can also run **npm run dev -- -p 3001**.
 - After loading the application, you'll see the address to have the application running on the browser on the cli of your choice.

## Algorithm & Approach
For the frontend, I used React (version 19.0.0-rc-66855b96-20241106) and Next.js (version 15.0.3). The goal of this project was to keep the implementation simple and easy to understand.

To meet this requirement, I implemented features that allow users to create, edit, and delete cards. To enhance user experience, a confirmation screen appears before deleting or editing a card.

For displaying the cards, I created a Card component that renders all the cards on the screen. Within this component, I embedded a modal for viewing card details. For adding new cards, I opted for a separate modal component to demonstrate different approaches to implementing similar features.

All modals, whether for viewing or editing card details, include the option to show/hide passwords.

Additionally, I added a filtering feature that allows users to search for cards by typing a single letter or sequence of letters from the name field. The results update dynamically as the user types.
