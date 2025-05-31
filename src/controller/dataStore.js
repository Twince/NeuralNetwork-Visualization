import eventBus from "./EventBus.js";
import { DATA_EVENTS } from "./constants/events.js"

export class DataStore {
    constructor() {
        _queryInfo = null;
        _nodeState = {};
        _queryResult = null;

        eventBus.on(DATA_EVENTS.NODE_UPDATE, this.setQueryInfo.bind(this));
        eventBus.on(DATA_EVENTS.RESULT_UPDATE, this.setQueryResult.bind(this));
    }

    setQueryInfo(queryInfo) {
        this._queryInfo = queryInfo;
        eventBus.emit(DATA_EVENTS.QUERY_CHANGED, queryInfo)
    }
    getQueryInfo() {
        return this._queryInfo;
    }

    setNodeState(nodeState) {
        this._nodeState = nodeState;
    }
    getNodeState() {
        return this._nodeState;
    }

    setQueryResult(queryResult) {
        this._queryResult = queryResult;
        eventBus.emit(DATA_EVENTS.QUERY_CHANGED, queryResult);
    }
    getQueryResult() {
        return this._queryResult;
    }

    reset() {
        this._queryInfo = null;
        this._nodeState = {};
        this._queryResult = null;
    }
}