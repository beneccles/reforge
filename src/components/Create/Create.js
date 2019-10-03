import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import './Create.css'

export default class Create extends Component {
    constructor() {
        super()

        this.state = {
            title: "",
            price: 0,
            condition: "",
            processor: "",
            graphicsCard: "",
            primaryStorage: "",
            secondaryStorage: ""
        }
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    handleSubmit = () => {
        axios.post('/api/newPost', this.state).then((res) => {
            swal.fire({ type: 'success', text: res.data.message })
            this.setState = {
                title: "",
                price: 0,
                condition: "",
                processor: "",
                graphicsCard: "",
                primaryStorage: "",
                secondaryStorage: ""
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="formBody">
                <div className="Create">
                    <div id="formTitle">
                        <h1>List a Computer</h1>
                    </div>
                    <div className="formHeader">
                        <input id="title" value={this.state.title} type="text" placeholder="Title" onChange={(e) => this.handleChange(e, 'title')} />
                        <input id="price" value={this.state.price} type="number" placeholder="Price" onChange={(e) => this.handleChange(e, 'price')} />
                    </div>
                    <div className="condition">
                        <input id="condition" value={this.state.conditon} type="text" placeholder="Condition" onChange={(e) => this.handleChange(e, 'condition')} />
                    </div>
                    <h2>Specifications</h2>
                    <select value={this.state.processor} name="Processor" id="processorMenu" onChange={(e) => this.handleChange(e, 'processor')}>
                        <option selected="selected">Processor...</option>
                        <option value="Intel Core i9-9900K">Intel Core i9-9900K</option>
                        <option value="Intel Core i7-9700K">Intel Core i7-9700K</option>
                        <option value="Intel Core i7-8700K">Intel Core i7-8700K</option>
                        <option value="Intel Core i7-8700">Intel Core i7-8700</option>
                        <option value="Intel Core i7-5820K">Intel Core i7-5820K</option>
                        <option value="Intel Core i7-8750H">Intel Core i7-8750H</option>
                        <option value="AMD Ryzen 7 2700X">AMD Ryzen 7 2700X</option>
                        <option value="AMD Ryzen 7 1700X">AMD Ryzen 7 1700X</option>
                    </select>
                    <select value={this.state.graphicsCard} name="Graphics Card" id="graphicsMenu" onChange={(e) => this.handleChange(e, 'graphicsCard')}>
                        <option selected="selected">Graphics Card...</option>
                        <option value="Nvidia RTX 2080TI">Nvidia RTX 2080TI</option>
                        <option value="Nvidia RTX 2080">Nvidia RTX 2080</option>
                        <option value="Nvidia RTX 2070TI">Nvidia RTX 2070TI</option>
                        <option value="Nvidia RTX 2070">Nvidia RTX 2070</option>
                        <option value="Nvidia GTX 1660TI">Nvidia GTX 1660TI</option>
                        <option value="Nvidia GTX 1660">Nvidia GTX 1660</option>
                        <option value="AMD Radeon VII">AMD Radeon VII</option>
                        <option value="AMD Radeon RX 5700">AMD Radeon RX-5700</option>
                        <option value="AMD Radeon RX 5700 XT">AMD Radeon RX-5700-XT</option>
                    </select>
                    <select value={this.state.primaryStorage} name="Prime Storage" id="primaryStorage" onChange={(e) => this.handleChange(e, 'primaryStorage')}>
                        <option selected='selected'>Primary Storage...</option>
                        <option value='256GB SSD'>256GB SSD</option>
                        <option value='500GB SSD'>500GB SSD</option>
                        <option value='1TB SSD'>1TB SSD</option>
                        <option value='2TB SSD'>2TB SSD</option>
                        <option value='500GB HDD'>500GB HDD</option>
                        <option value='1TB HDD'>1TB HDD</option>
                        <option value='2TB HDD'>2TB HDD</option>
                    </select>
                    <select value={this.state.secondaryStorage} name="Secondary Storage" id="secondaryStorage" onChange={(e) => this.handleChange(e, 'secondaryStorage')}>
                        <option selected='selected'>Primary Storage...</option>
                        <option value='256GB SSD'>256GB SSD</option>
                        <option value='500GB SSD'>500GB SSD</option>
                        <option value='1TB SSD'>1TB SSD</option>
                        <option value='2TB SSD'>2TB SSD</option>
                        <option value='500GB HDD'>500GB HDD</option>
                        <option value='1TB HDD'>1TB HDD</option>
                        <option value='2TB HDD'>2TB HDD</option>
                    </select>

                </div>
                <div className="formFooter">
                    <button className="formButton" onClick={this.handleSubmit}>Submit</button>
                    <button className="formButton">Cancel</button>
                </div>
            </div>

        )
    }
}