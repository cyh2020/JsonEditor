import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { Select } from 'antd';
import AddArrList from './AddArrList';
import AddObjectList from './AddObjectList'
import 'antd/dist/antd.css';
const { Option } = Select;

const AddArr = forwardRef((props, refa) => {
    let [selectItem, setSelectItem] = useState("string")
    // let [leftVal, setLeftVal] = useState("")
    let [rightVal, setRightVal] = useState("")

    const childRef = useRef(null);
    useImperativeHandle(refa, () => ({
        // leftVal: leftVal,
        rightVal: rightVal,
        emitGetChildVal: () => {
            if (childRef.current) {
                let r = childRef.current.emitGetChildVal()
                return r
            } else {
                return rightVal
            }

        }
    }), [rightVal])

    //展示增加obj的还是arr
    function showWhich() {
        if (selectItem === "object") {
            return <AddObjectList ref={childRef}></AddObjectList>;
        } else if (selectItem === "array") {
            return <AddArrList ref={childRef}></AddArrList>;
        } else {
            return (
                <input type="text" size="20" maxLength="20" value={rightVal}
                    onChange={handleRightChange} 
                    onBlur={handleRightBlur} 
                    />
            )
        }
    }

    function handleSelectChange(value) {
        setSelectItem(value)
    }

    // function handleLeftChange(e) {
    //     setLeftVal(e.target.value)
    // }

    function handleRightChange(e) {
        setRightVal(e.target.value)
    }

    function handleRightBlur(e) {
        let out = e.target.value
        //匹配属性
        switch (selectItem) {
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
        setRightVal(out)
    }

    return (
    <div >
        {/* <input type="text" size="20" maxLength="20" value={leftVal} onChange={handleLeftChange} /> */}
        <Select
            // defaultValue="string"
            onChange={handleSelectChange}
            defaultValue={selectItem}
        >
            <Option value="string">string</Option>
            <Option value="number">number</Option>
            <Option value="boolean">boolean</Option>
            <Option value="object">object</Option>
            <Option value="array">array</Option>
        </Select>
        {showWhich()}
    </div>)
})


export default AddArr;