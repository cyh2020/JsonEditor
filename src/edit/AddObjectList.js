import React from "react";
import 'antd/dist/antd.css';
import AddObject from "./AddObject";
import { guid } from "../utils/utils";

class AddObjectList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemList: [],
        }
        this.refList = []

        this.handleClick = this.handleClick.bind(this)
        this.emitGetChildVal = this.emitGetChildVal.bind(this)
        this.handleDelClick = this.handleDelClick.bind(this)
    }



    emitGetChildVal() {
        let o = {}
        // console.log(this.refList)
        this.refList.forEach((e) => {
            if (e) {
                let r = e.emitGetChildVal()
                Object.assign(o, r);
            }
        })
        return o
    }


    handleClick() {
        this.setState(prevState => {
            let l = [...prevState.itemList]
            l.push(guid())
            return ({
                itemList: l
            })
        })
    }


    //删除
    handleDelClick(e) {
        let index = this.state.itemList.indexOf(e.target.value);
        let l = [...this.state.itemList]
        l.splice(index, 1)
        this.setState({
            itemList: l
        })
        console.log(this.refList)
        // this.forceUpdate();
    }



    render() {
        return (
            <div className="inputList" >
                {this.state.itemList.map((n, i) => {
                    return (
                        <div key={n} className = "innerInputWrapper">
                            <AddObject ref={
                                a => this.refList[i] = a
                            } ></AddObject>

                            {/* <button value={n} onClick={this.handleDelClick}>del</button> */}
                        </div>
                    )

                })}
                <i className="fa fa-plus-square inputListBtn" onClick={this.handleClick}> </i>
            </div>)
    }

}


export default AddObjectList;