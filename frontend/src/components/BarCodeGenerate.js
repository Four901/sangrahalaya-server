import React from 'react'
import Barcode from 'react-barcode';
const BarCodeGenerate = (props) => {

  return (
     <Barcode value={props.barcodeNumber} />
  )
}

export default BarCodeGenerate
