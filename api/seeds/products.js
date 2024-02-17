import { faker } from '@faker-js/faker';

export const seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Generate fake data for products
      const products = [];
      for (let i = 0; i < 20; i++) {
        products.push({
          name: faker.commerce.productName(),
          quantity: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
          description: faker.lorem.paragraph(2),
          price: faker.commerce.price(),
          main_image: faker.image.url(),
        });
      }
      // Inserts seed entries for products
      return knex('products').insert(products);
    })
    .then(function() {
      // Deletes ALL existing entries
      return knex('product_images').truncate()
        .then(function () {
          // Generate fake data for product images
          const productImages = [];
          for (let i = 0; i < 20; i++) {
            productImages.push({
              product_id: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }), // Assuming product ids start from 1 and end at 20
              url: faker.image.url(),
              description: faker.lorem.sentences(),
            });
          }
          // Inserts seed entries for product images
          return knex('product_images').insert(productImages);
        });
    });
};
