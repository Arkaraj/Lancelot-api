# Lancelot API

Lancelot - A simple & easy way to raise funds, A Place where independent creators can come together to bring new ideas to life through kickstaters.

This is the Server Side Code for Lancelot.

## IDEAS

- In app coin - lancels, donate to fundraisers/create fundraisers to gain lancels.
- User can transanct in Lancels. Ex. 1ln = 1000Rs
- User can join/create organisation through code or some other way.

# TECH STACK

- Node.js TypeScript
- GraphQL Apollo Server
- Mysql
- Express.js

## Tech

```bash
# Migrations
npx ts-node ./node_modules/.bin/typeorm migration:generate -n initialEntities

# Dev Server
npm run dev
```

## To-Do

- [x] Create Users
- [x] Create Fundraiser
- [x] Create Organization
- [x] View Fundraisers
- [x] View Organization
