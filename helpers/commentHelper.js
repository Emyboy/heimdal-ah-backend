const getCommentWhereClause = (article, comment, roleId, userId) => {
  let commentWhere;
  if (roleId === 1) {
    commentWhere = {};
  } else if (userId === article.userId || userId === comment.userId) {
    commentWhere = {
      isArchived: false,
    };
  } else {
    commentWhere = {
      isPrivate: false,
      isArchived: false
    };
  }
  return commentWhere;
};

const getArticleWhereClause = (article, roleId, userId) => {
  let articleWhere = {
    isArchived: false,
    isPublished: true,
  };
  if (roleId === 1) {
    articleWhere = {};
  }

  if (roleId === 3) {
    articleWhere = {
      isArchived: false,
    };
  }

  if (userId === article.userId) {
    articleWhere = {
      isArchived: false,
    };
  }
  return articleWhere;
};

export { getCommentWhereClause, getArticleWhereClause };
