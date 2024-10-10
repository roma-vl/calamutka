import { faker } from '@faker-js/faker';

export const seed = async function (knex) {
  // Спочатку очищаємо таблицю
  await knex('categories').del();

  // Генеруємо фейкові дані для категорій
  const categories = [];
  for (let i = 0; i < 20; i++) {
    categories.push({
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department().toLowerCase()),
      description: faker.lorem.sentence(5),
      parent_id: i > 0 ? faker.number.int({ min: 1, max: i }) : null,
    });
  }

  // Вставляємо згенеровані дані в таблицю `categories`
  await knex('categories').insert(categories);
};

