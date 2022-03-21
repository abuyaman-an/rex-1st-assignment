import { createAction } from "@reduxjs/toolkit"

export const createAsyncActions = (baseType) => {
    return {
        started: createAction(`${baseType}_STARTED`),
        succeeded: createAction(`${baseType}_SUCCEEDED`),
        failed: createAction(`${baseType}_FAILED`),
    }
};