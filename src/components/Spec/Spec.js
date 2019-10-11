import React, { Component } from "react";

class Spec extends Component {
  formatMemory = () => {
    const memory = this.props.systemInfo.memory.map((el, index) => {
      return (
        <div key={index}>
          <p>{`Slot ${index}: ${el.manufacturer} ${el.size} GB ${el.type} ${el.clockSpeed}`}</p>
        </div>
      );
    });
    return memory;
  };

  formatDisk = () => {
    const disks = this.props.systemInfo.disks.map((el, index) => {
      return (
        <div key={index}>
          <p>{`Disk ${index}: ${el.type} ${el.name} ${el.size} GB`}</p>
        </div>
      );
    });
    return disks;
  };

  formatGraphics = () => {
    const graphics = this.props.systemInfo.graphics.map((el, index) => {
      return (
        <div key={index}>
          <p>{`GPU ${index}: ${el.vendor} ${el.model} ${el.vram} GB`}</p>
        </div>
      );
    });
    return graphics;
  };

  render() {
    return (
      <div>
        <p>{this.props.systemInfo.make}</p>
        <p>{this.props.systemInfo.model}</p>
        <p>{this.props.systemInfo.serial}</p>

        <h4 id="formTitle">Processor</h4>
        {this.props.systemInfo.processor && (
          <div>
            <p>{`${this.props.systemInfo.processor.make} ${this.props.systemInfo.processor.model}`}</p>
          </div>
        )}
        <h4 id="formTitle">Memory</h4>
        {this.props.systemInfo.memory && (
          <p>{`Slots: ${this.props.systemInfo.memory.length}`}</p>
        )}
        {this.props.systemInfo.memory && this.formatMemory()}
        {this.props.systemInfo.battery && (
          <div>
            <h4 id="formTitle">Battery</h4>
            <p>{`Battery: ${this.props.systemInfo.battery.type} ${this.props.systemInfo.battery.max} ${this.props.systemInfo.battery.model}`}</p>
          </div>
        )}
        <h4 id="formTitle">Storage</h4>
        {this.props.systemInfo.disks && this.formatDisk()}
        <h4 id="formTitle">Graphics</h4>
        {this.props.systemInfo.graphics && this.formatGraphics()}
      </div>
    );
  }
}

export default Spec;
