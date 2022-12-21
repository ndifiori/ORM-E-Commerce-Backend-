const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// TODO: The `/api/products` endpoint

// TODO: find all products and include its associated Category and Tag data
  // findall method used to query data from sql table to application (similar to select SQL)
    // will return table rows as array of objects
  // the include option will include multiple models in the query

router.get('/', (req, res) => {
  Product.findAll({
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  }).then((products) => res.json(products)).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// TODO: find a single product by its `id` and include its associated Category and Tag data
  // find one method obtains first entry it finds that fulfills it
  // where option will filter our query

router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  }).then((products) => res.json(products)).catch((err) => {
    console.log(err); 
    res.status(400).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// TODO: delete one product by its `id` value
  // .destroy will delete an existing row in our database table
  
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  }).then((products) => {
    console.log(products);
    res.json(products);
  }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
