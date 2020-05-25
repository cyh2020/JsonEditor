import React from "react";
import { connect } from 'react-redux';
import EditPanelAdd from '../edit/EditPanelAdd';
import TreeObj from './TreeObj';
import EditPanelModify from "../edit/EditPanelModify";

class EditArea extends React.Component {
  constructor(props) {
    super(props)
    this.showPanel = this.showPanel.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps === this.props) {
      return false
    } else {
      return true
    }
  }

  showPanel() {

  }

  render() {
    let o = this.props.obj;
    // console.log(o)
    if (!o) {
      return null
    }

    let type = Object.prototype.toString.call(o).slice(8, -1)
    if (type === "Object" || type === "Array") {
      if (!this.props.showPanel) {
        return (//展示edit面板
          <div className="editArea ">
            <div className="editAreaScroll style-4">
              <TreeObj root={o} faid="root"></TreeObj>
            </div>
          </div>
        );
      } else {//展示修改与增加面板
        if (!!this.props.modify) {
          return (
            <div className="editArea ">
              <EditPanelModify
                faId={this.props.faId}
                selfId={this.props.selfId}
                rightVal={this.props.rightVal}
                isArray={this.props.isArray}
              ></EditPanelModify>
            </div>)
        } else {
          return (
            <div className="editArea ">
              <EditPanelAdd
                faId={this.props.faId}
                isArray={this.props.isArray}
              ></EditPanelAdd>
            </div>
          )
        }
      }

    } else {
      return (
        <div className="editArea ">
          {this.showPanel()}
          <div faid="root">{o}</div>
        </div>
      )
    }

  }

}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(EditArea)

