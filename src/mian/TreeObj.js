import React from "react";
// import { connect } from 'react-redux';
import store from "../store"


export default class TreeObj extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shink: false,
            id: this.props.root.spacial_id
        }
        this.handleShink = this.handleShink.bind(this)
        this.handleDel = this.handleDel.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleDelLeaf = this.handleDelLeaf.bind(this)
        this.handleModify = this.handleModify.bind(this)
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.root.spacial_id !== this.state.id) || (nextState.shink !== this.state.shink)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.id !== nextProps.root.spacial_id) {
            return {
                id: nextProps.root.spacial_id
            };
        }
        // 否则，对于state不进行任何操作
        return null;
    }

    handleShink() {
        this.setState(prevState => ({
            shink: !prevState.shink
        }));
    }
    handleDel() {
        let info = { fa: this.props.faid, selfId: this.props.root.spacial_id }
        const action = {
            type: "del",
            info: info
        }
        store.dispatch(action);
    }
    handleAdd() {
        let info = { fa: this.props.faid, selfId: this.props.root.spacial_id }
        const action = {
            type: "preAdd",
            info: info
        }
        store.dispatch(action);
    }

    handleDelLeaf(e) {
        e.persist();
        let info = { fa: this.props.root.spacial_id, selfId: e.nativeEvent.srcElement.attributes[1].nodeValue }
        const action = {
            type: "delLeaf",
            info: info
        }
        store.dispatch(action);
    }

    handleModify(e) {
        e.persist();
        // console.log(e.nativeEvent.srcElement.attributes[1].nodeValue)
        let info = { fa: this.props.root.spacial_id, selfId: e.nativeEvent.srcElement.attributes[1].nodeValue }
        const action = {
            type: "preModify",
            info: info
        }
        store.dispatch(action);
    }

    render() {
        if (!this.props.root) {
            return [<div>json 格式错误</div>]
        }

        if (this.state.shink) {
            return <span className="btnSpan">
                <i className="fa fa-angle-double-down" onClick={this.handleShink}> </i>
            </span>
        } else {
            let keys = Object.keys(this.props.root)
            let result = keys.map((key) => {
                //debug时候要注销
                if (key === "spacial_id") return null

                let value = this.props.root[key]
                let type = Object.prototype.toString.call(value).slice(8, -1)

                if (type === "Object" || type === "Array") {
                    return (
                        <div
                            style={{ padding: "0px 25px", borderLeft: "solid 1px grey" }}
                            key={value.spacial_id}>
                            <span className="wrapKey">{key}</span>
                            <TreeObj root={value} faid={this.props.root.spacial_id}></TreeObj>
                        </div>
                    )
                } else {
                    return (
                        <div
                            style={{
                                padding: "0px 25px",
                                borderLeft: "solid 1px grey"
                            }}
                            key={key}
                            faid={this.props.root.spacial_id}
                        >
                            <span className="wrapKey">{key} -> {value} </span>

                            <span value={key} onClick={this.handleDelLeaf}>
                                <i className="fa fa-trash-o" value={key}> </i>
                            </span>
                            <span value={key} onClick={this.handleModify}>
                                <i className="fa fa-pencil" value={key}> </i>
                            </span>
                        </div>
                    )
                }
            })

            return (
                <>
                    <span className="btnSpan">
                        <i className="fa fa-angle-double-up" onClick={this.handleShink}> </i>
                        <i className="fa fa-trash-o" onClick={this.handleDel}> </i>
                        <i className="fa fa-plus-square-o" onClick={this.handleAdd}> </i>
                    </span>
                    {result}
                </>
            )
        }

    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         sendAction: (info) => {
//             dispatch({
//                 type: "del",
//                 info: info
//             })
//         }
//     }
// }

//  connect(null, mapDispatchToProps)(TreeObj)
