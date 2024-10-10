import {faker} from '@faker-js/faker';

export const seed = async function (knex) {

  await knex('product_images').del();
  await knex('products').del();
  // Generate fake data for products
  const products = [];
  for (let i = 0; i < 20; i++) {
    products.push({
      name: faker.commerce.productName(),
      quantity: faker.number.float({min: 10, max: 100, multipleOf: 0.02}),
      description: faker.lorem.paragraph(2),
      price: faker.commerce.price(),
      main_image: faker.image.url(),
      category_id: faker.number.int({ min: 1, max: 10 }),
    });
  }
  // Inserts seed entries for products
  await knex('products').insert(products);
  // Generate fake data for product images
  const productImages = [];
  for (let i = 0; i < 20; i++) {
    productImages.push({
      product_id: faker.number.int({min: 1, max: 10}), // Assuming product ids start from 1 and end at 20
      url: faker.image.url(),
      description: faker.lorem.sentences(1),
    });
  }
  await knex('product_images').insert(productImages);
};
