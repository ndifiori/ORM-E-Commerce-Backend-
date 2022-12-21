// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// note to self

  // one to one --> one record of one table points to exactly one records of another table
    // usually only one primary key on the initial table

  // one to many --> one record of one table points to multiple records of another table
    // usually only one primary key on the initial table
    // usually one primary key on the secondary table with the first's table PK and the FK

  // many to many --> relates many rows in one table to many rows in another table
    // these work through junction tables (https://www.tutorialsteacher.com/sqlserver/tables-relations)


// TODO: Products belongsTo Category
  // belongsTO means theres a one to one relation
  // FK belonging to product

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// TODO: Categories have many Products
  // hasMany means theres a one to many relation
  // FK belonging to category

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// TODO: Products belongToMany Tags (through ProductTag)
  // belongsToMany means theres a many to many relation betwen Product and Tag with ProductTag as the junction table

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

// TODO: Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

// this allows us to package our models and export them as an object so we can import them together and use their proper names
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
