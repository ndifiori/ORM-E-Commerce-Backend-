const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// TODO: The `/api/tags` endpoint
  // this will follow essentially the same structure as the category routes we worked on

// TODO: find all tags and include its associated Product data
   // findall method used to query data from sql table to application (similar to select SQL)
    // will return table rows as array of objects 
  // the include option will include multiple models in the query

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  }).then((tags) => res.status(200).json(tags)).catch((err) => res.status(500).json(err));
});

// TODO: find a single tag by its `id` and include its associated Product data
  // find one method obtains first entry it finds that fulfills it
  // where option will filter our query

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  }).then((tag) => res.status(200).json(tag)).catch((err) => res.status(404).json(err));
});

// TODO: create a new tag
  // .create will insert a new row into our database table 

router.post('/', (req, res) => {
  Tag.create(req.body).then((tag) => res.status(200).json(tag)).catch((err) => res.status(404).json(err));
});

// TODO: update a tag's name by its `id` value
    // .update will update an existing row in our database table

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((tag) => res.status(200).json(tag)).catch((err) => res.status(404).json(err));
});

// TODO: delete on tag by its `id` value
  // .destroy will delete an existing row in our database table 

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((tag) => res.status(200).json(tag)).catch((err) => res.status(404).json(err));
});

module.exports = router;
