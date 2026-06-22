const router = require('express').Router();
const auth = require('../middleware/auth');
const { getExperiences, submitExperience, upvoteExperience } = require('../controllers/experienceController');
router.get('/', getExperiences);
router.post('/', auth, submitExperience);
router.post('/:id/upvote', auth, upvoteExperience);
module.exports = router;
