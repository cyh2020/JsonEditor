import React from "react";
import store from "../store"
import 'antd/dist/antd.css';
import { Select } from 'antd';
import AddObjectList from "./AddObjectList";
import AddArrList from "./AddArrList";
const { Option } = Select;

export default class EditPanelModify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectItem: typeof(this.props.rightVal)||"string",
            leftVal: this.props.selfId||"",
            rightVal: this.props.rightVal || ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLeftChange = this.handleLeftChange.bind(this)
        this.handleRightChange = this.handleRightChange.bind(this)
        this.handleRightBlur = this.handleRightBlur.bind(this)
        this.showWhich = this.showWhich.bind(this)
        this.gatherAll = this.gatherAll.bind(this)

        this.childRef = React.createRef(null)
    }

    handleChange(value) {
        this.setState(prevState => ({
            selectItem: value
        }));
    }

    handleLeftChange(e) {
        this.setState({
            leftVal: e.target.value
        });
    }

    handleRightChange(e) {
        this.setState({
            rightVal: e.target.value
        });
    }

    handleRightBlur(e) {
        let out = e.target.value
        //匹配属性
        switch (this.state.selectItem) {
            case "string":
                break;
            case "number":
                out = parseInt(out)
                break;
            case "boolean":
                if (out === "true") {
                    out = true
                } else if (out === "false") {
                    out = false
                } else {
                    alert("请输入true或者false")
                    out = "false"
                }
                break;
            default:
        }
        this.setState({
            rightVal: out
        });
    }

    //展示增加obj的还是arr
    showWhich() {
        if (this.state.selectItem === "object") {
            return (
                <AddObjectList ref={this.childRef}></AddObjectList>
            )

        } else if (this.state.selectItem === "array") {
            return <AddArrList ref={this.childRef}></AddArrList>;
        } else {
            return (
                <input type="text" size="20" maxLength="20" value={this.state.rightVal}
                    onChange={this.handleRightChange} onBlur={this.handleRightBlur} />
            )
        }
    }

    //收集所有的子元素信息
    gatherAll() {
        let r = undefined
        // let l = undefined
        console.log(this.childRef)
        if (this.childRef.current) {//has obj
            r = this.childRef.current.emitGetChildVal()
        } else {//value
            r = this.state.rightVal;
        }
        console.log(r)
        // l = this.state.leftVal

        let faId = this.props.faId
        let selfId = this.props.selfId
        console.log(faId, selfId)
        const action = {
            type: "modify",
            data: {
                "faId": faId,
                "selfId": selfId,
                "obj": r
            }
        }

        store.dispatch(action);
    }

    //取消
    cancel() {
        const action = {
            type: "cancel",
        }
        store.dispatch(action);
    }

    render() {
        return (
            <div className="Panel style-4">
                <div className="inputWrapper">
                    <input type="text" size="20" maxLength="20" disabled="disabled"
                        value={this.state.leftVal} onChange={this.handleLeftChange}
                    />
                    <Select
                        defaultValue={this.state.selectItem}
                        onChange={this.handleChange}
                    >
                        <Option value="string">string</Option>
                        <Option value="number">number</Option>
                        <Option value="boolean">boolean</Option>
                        <Option value="object">object</Option>
                        <Option value="array">array</Option>
                    </Select>
                    {this.showWhich()}
                </div>

                <div className="panelBtn">
                    <button onClick={this.cancel}>取消</button>
                    <button onClick={this.gatherAll}>确认</button>
                </div>
            </div>)
    }
}