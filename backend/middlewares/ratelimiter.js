const rateLimit = require('express-rate-limit');

const limiter = {
     gen: rateLimit({
          windowMs: 1 * 1 * 1000, // 1 seconde
          max: 2, // Limit each IP to 2 request per `window`
          standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
          legacyHeaders: false, // Disable the `X-RateLimit-*` headers
     }),
     mod: rateLimit({
          windowMs: 1 * 60 * 1000, // 1 minute
          max: 6, // Limit each IP to 6 requests per `window` (here, per minute)
          standardHeaders: true,
          legacyHeaders: false,
     }),
     auth: rateLimit({
          windowMs: 1 * 60 * 1000, // 10 minutes
          max: 3, // Limit each IP to 5 requests per `window` (here, per 10 minutes)
          standardHeaders: true,
          legacyHeaders: false,
     })
};

module.exports = limiter;