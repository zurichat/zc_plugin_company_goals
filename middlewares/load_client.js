import path from 'path';
import express from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export default (app) => {
  app.use(
    (_, res, next) => {
      if (!isProduction) {
        return res.send(`This is development build <a href="http://127.0.0.1:3000">View Frontend</a>`);
      }
      next();
    }, // below this are for production
    express.static(path.resolve(path.resolve(), '../client/build')),
    (_, res) => res.sendFile(path.resolve(path.resolve(), '../client/build/index.html')) // let frontend handle 404
  );
};
