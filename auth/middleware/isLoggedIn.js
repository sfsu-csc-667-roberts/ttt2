module.exports = (request, response, next) => {
  if (request.isAuthenticated()) {
    response.locals = { user: request.user };
    return next();
  } else {
    response.redirect('/users/login');
  }
};
