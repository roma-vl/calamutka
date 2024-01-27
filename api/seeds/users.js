const { faker } = require('@faker-js/faker');

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            const users = [];
            for (let i = 0; i < 3; i++) {
                users.push({
                    username: faker.internet.userName(),
                    password: faker.internet.password()
                });
            }
            return knex('users').insert(users);
        });
};
