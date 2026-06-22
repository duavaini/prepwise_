const router = require('express').Router();
const auth = require('../middleware/auth');
const { analyzeProfile, getCachedAnalysis } = require('../controllers/analysisController');
router.post('/:companySlug', auth, analyzeProfile);
router.get('/:companySlug/cached', auth, getCachedAnalysis);
module.exports = router;
