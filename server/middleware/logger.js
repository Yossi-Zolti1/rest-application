import url from 'url'

const myLogger = (req, res, next) => {
    console.log('Someone entered to the site' + fullUrl(req) ,  new Date());
    next();
    };

    export default myLogger;

    function fullUrl(req) {
        return url.format({
          protocol: req.protocol,
          host: req.get('host'),
          pathname: req.originalUrl
        });
      }