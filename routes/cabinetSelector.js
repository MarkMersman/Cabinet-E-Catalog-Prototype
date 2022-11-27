const express = require('express')
const router = express.Router()

const {   
  getFrame,     
} = require('../controllers/frame.js')
const {   
  getMaterial,     
} = require('../controllers/material.js')
const {   
  getDoorStyle,     
} = require('../controllers/doorStyle.js')
const {   
  getDoor,     
} = require('../controllers/door.js')
const {   
  getCabPrice,     
} = require('../controllers/cabinet.js')
const {   
  getDrawer,     
} = require('../controllers/drawer.js')

router.route('/price-info').post(getCabPrice);
router.route('/frame/:id').get(getFrame);
router.route('/drawer/:id').get(getDrawer);
router.route('/material/:id').get(getMaterial);
router.route('/door-style/:id').get(getDoorStyle);
router.route('/door-type/:id').get(getDoor);


module.exports = router