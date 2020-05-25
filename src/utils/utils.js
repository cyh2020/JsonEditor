export function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export function parseJSON(text) {
    let o = null;
    try {
        o = JSON.parse(text)
    } catch (e) {
        o = e.message;
    }
    addId(o)

    // console.log(o)
    return o
}


export function addId(obj) {
    let type = Object.prototype.toString.call(obj).slice(8, -1)
    if (type === "Array") {
        obj.spacial_id = guid()
        // Object.defineProperty(obj, "spacial_id", {
        //     enumerable: false
        // });
        for (let i in obj) {
            addId(obj[i])
        }
    } else if (type === "Object") {
        obj.spacial_id = guid()
        // Object.defineProperty(obj, "spacial_id", {
        //     enumerable: false
        // });
        let keys = Object.keys(obj)
        for (let i of keys) {
            addId(obj[i])
        }
    } else {
        return
    }
}

let NodePath = []
//find father node
export function findFa(root, faId) {
    NodePath.push(root)
    if (root) {
        if (root.spacial_id === faId) {
            // console.log(NodePath)
            //change spacial_id of path
            changeId(NodePath)
            NodePath.pop()
            return root
        } else {
            let keys = Object.keys(root)
            // console.log(keys)
            for (let i = 0; i < keys.length; i++) {
                let va = root[keys[i]];
                // console.log(va)
                if (typeof (va) === "object") {//object or array
                    let node = findFa(root[keys[i]], faId)
                    if (node) {
                        return node
                    }
                }

            }
            NodePath.pop()
        }
    }
}
function changeId(arr) {
    arr.forEach((n) => {
        n.spacial_id = guid()
    })

}

export function findSelf(root, selfId) {
    // console.log(root)
    // console.log(selfId)
    if (Array.isArray(root)) {//arr
        for (let i = 0; i < root.length; i++) {
            if (root[i].spacial_id === selfId) {
                return root[i]
            }
        }
    } else {//obj
        let keys = Object.keys(root)
        for (let i=0;i<keys.length;i++){
            if (root[keys[i]].spacial_id === selfId) {
                return root[keys[i]];
            }
        }
    }
}

//del itself
export function delSelfNode(root, selfId) {
    if (Array.isArray(root)) {//arr
        for (let i = 0; i < root.length; i++) {
            if (root[i].spacial_id === selfId) {
                root.splice(i, 1)
                break;
            }
        }

    } else {//obj
        let keys = Object.keys(root)
        keys.forEach((e) => {
            if (root[e].spacial_id === selfId) {
                delete root[e];
            }
        })
    }
}

//delSelfLeaf
export function delSelfLeaf(root, selfId) {
    if (Array.isArray(root)) {//arr
        let index = parseInt(selfId)
        root.splice(index, 1)
    } else {//obj
        delete root[selfId];
    }
}


//使用递归的方式实现数组、对象的深拷贝
export function deepClone(obj) {
    //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    var objClone = Array.isArray(obj) ? [] : {};
    //进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}


//beautifyJSON
export function beautifyJSON(text) {
    function replacer(key, value) {
        // Filtering out properties
        if (key === 'spacial_id') {
            return;
        }
        return value;
    }

    return JSON.stringify(text, replacer, 4)
}

