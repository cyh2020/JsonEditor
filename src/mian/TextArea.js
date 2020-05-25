import React, { useState, useRef, useEffect } from "react";
import { connect } from 'react-redux'

function TextArea(props) {
    const [text, setText] = useState(props.text);
    const textareaEl = useRef(null);

    useEffect(() => {
        setText(props.text)
    }, [props.text]);

    function handleClick() {
        // console.log(textareaEl.current.value)
        props.sendAction(textareaEl.current.value)
    }
    function handleChange() {
        // console.log(textareaEl.current.value)
        setText(textareaEl.current.value)
    }


    return (
        <div>
            <div>
                <textarea
                    // rows="27" cols="80"
                    value={text}
                    ref={textareaEl} onChange={handleChange}
                    className="style-4 textareaStyle"
                >
                </textarea>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <button onClick={handleClick} style={{
                    // marginLeft: "auto",
                    backgroundColor: "rgb(42, 194, 105)",
                    color: "white",
                    borderColor: "white"
                }}>我写好了</button>
            </div>
        </div>
    );

}

const mapDispatchToProps = (dispatch) => {
    return {
        sendAction: (text) => {
            // console.log(this)
            dispatch({
                type: "change_context",
                newContext: text
            })
        }
    }
}

const mapStateToProps = (state) => {
    return state
}
// 加强组件
export default connect(mapStateToProps, mapDispatchToProps)(TextArea)