const logger = store => next => action => {
    console.log('LOGGER || action was dispatched, action: ', action.type);
    next(action)
}

export default logger;