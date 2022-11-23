import React, { Component } from 'react'
import BarcodeReader from 'react-barcode-reader'


    class BarScanner extends Component {
      constructor(props){
        super(props)
        this.state = {
          result: 'No result',
        }

        this.handleScan = this.handleScan.bind(this)
      }
      handleScan(data){
        this.setState({
          result: data,
        })
       
        this.props.handleBar(data);
      }
      handleError(err){
      
      }
      render(){

        return(
          <div>
            <BarcodeReader
              onError={this.handleError}
              onScan={this.handleScan}
              />
           
          </div>
        )
      }
    }

    export default BarScanner