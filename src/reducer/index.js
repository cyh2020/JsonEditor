const util = require("../utils/utils")

const initState = {
    text: "",
    obj: null,
    showPanel: false,
    selfId: ""
}

exports.reducer = (state = initState, action) => {
    switch (action.type) {
        case 'change_context': {
            //parse JSON
            let o = util.parseJSON(action.newContext)
            let text = undefined
            if (typeof(o) === "string" && o.slice(0, 16) === "Unexpected token") {
                return {
                    text: state.text,
                    obj: o
                }
            } else {
                text = util.beautifyJSON(o)
                return {
                    text: text,
                    obj: o
                }
            }

        }
        case 'del': {
            let { fa, selfId } = action.info
            if (fa === "root") {
                return {
                    text: "老铁，no json",
                    obj: "请输入json"
                }
            }

            let o = util.deepClone(state.obj)
            // console.log(o)

            // 找到父亲
            let faNode = util.findFa(o, fa)
            // console.log(faNode)
            //删除自己
            util.delSelfNode(faNode, selfId)
            // console.log(o)

            //返回text
            let text = util.beautifyJSON(o)
            return {
                text: text,
                obj: o
            }
        }
        case "preAdd": {
            let boo = undefined
            //selfId 这个是添加到的根
            let { fa, selfId } = action.info
            let o = util.deepClone(state.obj)
            let faNode = null;
            let selfNode = null;
            if (fa === "root") {
                selfNode = o;
            } else {
                // 找到父亲
                faNode = util.findFa(o, fa)
                // 找到自己
                selfNode = util.findSelf(faNode, selfId)
                // console.log(faNode)
                // console.log(selfNode)
            }

            //判断自己是不是array
            if (Array.isArray(selfNode)) {
                boo = true
            } else {
                boo = false
            }
            return {
                text: state.text,
                obj: state.obj,
                showPanel: true,
                faId: selfId,
                isArray: boo
            }
        }

        case 'delLeaf': {
            let { fa, selfId } = action.info
            // console.log(fa,selfId)

            let o = util.deepClone(state.obj)
            // console.log(o)

            // 找到父亲
            let faNode = util.findFa(o, fa)
            // console.log(faNode)
            //删除自己
            util.delSelfLeaf(faNode, selfId)
            // console.log(o)

            //返回text
            let text = util.beautifyJSON(o)
            return {
                text: text,
                obj: o
            }
        }
        case 'preModify':
            let { fa, selfId } = action.info
            console.log(fa)
            console.log(selfId)
            let o = util.deepClone(state.obj)
            // console.log(o)
            // 找到父亲
            let faNode = util.findFa(o, fa)
            let rightVal = undefined;
            if (Array.isArray(faNode)) {//arr
                let index = parseInt(selfId)
                rightVal = faNode[index]
            } else {//obj
                rightVal = faNode[selfId];
            }

            return {
                text: state.text,
                obj: state.obj,
                showPanel: true,
                modify: true,
                faId: fa,
                selfId: selfId,
                rightVal: rightVal
            }
        case "cancel": {
            return {
                text: state.text,
                obj: state.obj,
                showPanel: false,
                modify: false,
                faId: "",
                selfId: "",
                rightVal: ""
            }
        }
        case "add": {
            let { faId, obj } = action.data;
            console.log(faId)

            if (faId === "root") {
                console.log("yes")
            }

            let o = util.deepClone(state.obj)
            // 找到父亲,也就是插入点
            let faNode = util.findFa(o, faId)
            if (Array.isArray(faNode)) {//arr
                let val = obj.array
                faNode.push(val)
            } else {//obj
                Object.assign(faNode, obj)
            }

            //标记
            util.addId(faNode)
            //返回text
            let text = util.beautifyJSON(o)
            return {
                text: text,
                obj: o
            }
        }
        case "modify": {
            let { faId, selfId, obj } = action.data;
            let o = util.deepClone(state.obj)
            // 找到父亲,也就是插入点
            let faNode = util.findFa(o, faId)

            if (Array.isArray(faNode)) {//arr
                let index = parseInt(selfId)
                faNode[index] = obj
            } else {//obj
                faNode[selfId] = obj
            }
            //标记
            util.addId(faNode)
            //返回text
            let text = util.beautifyJSON(o)
            return {
                text: text,
                obj: o
            }
        }
        default:
            return state;
    }
}
