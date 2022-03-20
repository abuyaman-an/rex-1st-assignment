const logger = store => next => action => {
    console.log('this is the logger', action.type);
    next(action)
}

export default logger;