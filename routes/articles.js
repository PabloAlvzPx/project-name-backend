const router = require('express').Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const {
  validateArticleBody,
  validateArticleId,
} = require('../middlewares/validation');

router.get('/', getArticles);
router.post('/', validateArticleBody, createArticle);
router.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = router;
