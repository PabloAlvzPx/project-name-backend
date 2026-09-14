const Article = require('../models/article');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        const error = new Error('Artículo no encontrado');
        error.statusCode = 404;
        return next(error);
      }
      if (article.owner.toString() !== req.user._id) {
        const error = new Error(
          'Prohibido: No puedes eliminar artículos de otros usuarios',
        );
        error.statusCode = 403;
        return next(error);
      }

      return Article.findByIdAndDelete(req.params.articleId).then(() => res.send({ message: 'Artículo eliminado con éxito' }));
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
