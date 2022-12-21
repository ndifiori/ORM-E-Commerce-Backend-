const router = require('express').Router();
const { Category, Product } = require('../../models');

// TODO: The `/api/categories` endpoint

// TODO: find all categories and include its associated products
  // findall method used to query data from sql table to application (similar to select SQL)
    // will return table rows as array of objects 

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  }).then((categories) => res.json(categories)).catch((err) => res.status(500).json(err));
});

// TODO: find one category by its `id` value and include its associated products
  // find one method obtains first entry it finds that fulfills it
  // where option will filter our query

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  }).then((category) => res.json(category)).catch((err) => res.status(400).json(err));
});


// TODO: create a new category
  // .create will insert a new row into our database table 

router.post('/', (req, res) => {
  Category.create(req.body).then((category) => res.status(200).json(category)).catch((err) => res.status(400).json(err));
});


// TODO: update a category by its `id` value
  // .update will update an existing row in our database table

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((category) => res.status(200).json(category)).catch((err) => res.status(400).json(err));
});


// TODO: delete a category by its `id` value
  // .destroy will delete an existing row in our database table 

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((category) => res.status(200).json(category)).catch((err) => res.status(400).json(err));
});

module.exports = router;
