const router = require('express').Router();
const { getAllCompanies, getCompany } = require('../controllers/companyController');
router.get('/', getAllCompanies);
router.get('/:slug', getCompany);
module.exports = router;
