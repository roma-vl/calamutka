npx knex migrate:make update_users_table
npx knex migrate:latest
npx knex migrate:rollback --all

npx knex seed:run
