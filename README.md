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
For the frontend i've used React on version "19.0.0-rc-66855b96-20241106" and NextJs on version 15.0.3, this project was created to also be simple and easy to understand.

In this case, i've tryied to make it simple as well, as instructed, i add the possibility to create, edit and delete cards, also add a confirmation screen before deleting and editing cards.

For displaying cards, to use a modal coded on the Card component to open the cards and for adding new cards i decided to use a separate modal component, just to show the difference in both code styles.

For all modals showing card information or to edit, we'll have the possibility of hide/show the password.

Also add the possibility to filter cards simply typing one letter or sequence of letter that is part of the "name" field, the results will change as you type.