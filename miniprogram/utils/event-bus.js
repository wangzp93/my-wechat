/**
 * 事件总线
 */
function EventBus() {
    const _events = {}  // 事件队列
    let _eventId = 1    // 事件id，递增

    /**
     * 绑定事件
     * 传入事件名称和函数，返回事件id
     * @param event 事件名称，必选
     * @param fn 事件函数，必选
     */
    this.on = function(event, fn) {
        (_events[event] || (_events[event] = {}))[_eventId] = fn
        return _eventId++
    }

    /**
     * 触发事件
     * 传入事件名称和回调数据
     * @param event 事件名称，必选
     * @param params 回调数据，可选
     */
    this.emit = function(event, data) {
        const cbs = _events[event] || {}
        for (let key in cbs) {
            cbs[key](data)
        }
    }

    /**
     * 解绑事件
     * 传入事件
     * 默认删除当前事件所有回调函数，也可根据事件id删除指定函数
     * @param event 事件名称，必选
     * @param id 指定的事件id，可选
     */
    this.off = function (event, id) {
        if (!id) {
            delete _events[event]
        } else {
            delete (_events[event] || {})[event]
        }
    }
}

export const eventBus = new EventBus()