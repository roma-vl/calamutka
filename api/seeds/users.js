import { faker } from '@faker-js/faker';
export const seed = function (knex) {
    return knex('users').del()
        .then(function () {
            const users = [];
            users.push({
                first_name: 'Roma',
                last_name: 'Volkov',
                username: faker.internet.userName(),
                password: 'roma',
                email: 'Drakyla60@gmail.com',
                address: faker.location.streetAddress(),
                phone: faker.phone.number(),
                birthdate: faker.date.past(),
                gender: faker.helpers.arrayElement(['Male', 'Female']),
                profile_picture: faker.image.avatar(),
                last_login: faker.date.past(),
                role: faker.helpers.arrayElement(['Admin', 'User']),
                account_status: faker.helpers.arrayElement(['Active', 'Inactive']),
                social_media_links: faker.internet.url(),
                bio: faker.lorem.paragraph(),
                language: faker.helpers.arrayElement(['English', 'Spanish']),
                is_blocked: faker.datatype.boolean() ,
                blocked_until: faker.date.future(),
                deleted_at: null,
                created_at: knex.fn.now(),
                updated_at: knex.fn.now(),
            });
            for (let i = 0; i < 5; i++) {
                users.push({
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                    email: faker.internet.email(),
                    address: faker.location.streetAddress(),
                    phone: faker.phone.number(),
                    birthdate: faker.date.past(),
                    gender: faker.helpers.arrayElement(['Male', 'Female']),
                    profile_picture: faker.image.avatar(),
                    last_login: faker.date.past(),
                    role: faker.helpers.arrayElement(['Admin', 'User']),
                    account_status: faker.helpers.arrayElement(['Active', 'Inactive']),
                    social_media_links: faker.internet.url(),
                    bio: faker.lorem.paragraph(),
                    language: faker.helpers.arrayElement(['English', 'Spanish']),
                    is_blocked: faker.datatype.boolean() ,
                    blocked_until: faker.date.future(),
                    deleted_at: null,
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now(),
                });
            }
            return knex('users').insert(users);
        });
};

