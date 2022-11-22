const visitorRouter = require('./visitorRouter')
const filmRouter = require('./filmRouter')
const userRouter = require('./userRouter')
const actorRouter = require('./actorRouter')
const subscriptionRouter = require('./subscriptionRouter')
const notificationRouter = require('./notificationRouter')
const promotionRouter = require('./promotionRouter')
const complainRouter = require('./complainRouter')
const commentRouter = require('./commentRouter')
const watchFilmRouter  = require('./watchFilmRouter')
const adminRouter = require('./adminRouter')
const requestRouter = require('./requestRouter')
const genreRouter = require('./genreRouter')

function route(app) {
    app.use('/apis/',visitorRouter)   
    app.use('/apis/film/',filmRouter)
    app.use('/apis/user/',userRouter)
    app.use('/apis/admin/',adminRouter)
    app.use('/apis/actor/',actorRouter)
    app.use('/apis/genre/',genreRouter)
    app.use('/apis/notification/',notificationRouter)    
    app.use('/apis/subscription/',subscriptionRouter)
    app.use('/apis/promotion/', promotionRouter)
    app.use('/apis/complain/', complainRouter)
    app.use('/apis/request/', requestRouter)
    app.use('/apis/comment/',commentRouter)
    app.use('/apis/watchfilm/',watchFilmRouter)


}

module.exports = route