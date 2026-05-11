# Integrating With HubSpot I: Foundations Practicum — Board Game Collection

This repository is my submission for the [Integrating With HubSpot I: Foundations](https://app.hubspot.com/academy/) practicum. It is a small Node + Express + Pug app that reads and writes records of a `Board Game` custom object in a HubSpot developer test account.

**Put your HubSpot developer test account custom objects URL link here:** https://app.hubspot.com/contacts/51453911/objects/62299495/views/all/list

## What the app does

- `GET /` — fetches every record from the `Board Game` custom object via the HubSpot CRM API and renders a table with name, genre, min/max players and play time.
- `GET /update-cobj` — renders a Pug form that lets the user add a new board game.
- `POST /update-cobj` — submits the form data, creates a new custom-object record through the API and redirects back to the homepage.

## Custom object

- Object name: `board_game` (singular `Board Game`, plural `Board Games`)
- Object type ID: `2-62299495`
- Properties used by the app:
  - `name` (string, required) — the name of the board game
  - `genre` (string) — e.g. Strategy, Co-op, Party
  - `min_players` (number)
  - `max_players` (number)
  - `play_time_minutes` (number)
- Associated with: `Contacts`

## Running locally

1. Clone this repository.
2. Copy `.env.example` to `.env` and paste your HubSpot private app access token into `PRIVATE_APP_ACCESS`.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the app:
   ```
   npm start
   ```
5. Open <http://localhost:3000>.

The token is loaded with `dotenv` and **never committed** (the `.env` file is git-ignored).

## HubSpot setup recap

This app expects:
- A developer test account with the `board_game` custom object defined and associated with Contacts.
- A private app with these scopes:
  - `crm.schemas.custom` (read, write)
  - `crm.objects.custom` (read, write)
  - `crm.objects.contacts` (read, write)
