import React,{useState} from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Scanner1(props) {
  
  const [stopStream, setStopStream] =useState(false);

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        stopStream={stopStream}
        onUpdate={(err, result) => {
          if (result) {
            //console.log("dsgmnl")
           
            props.handleBar(result.text)
            setStopStream(true);
          } else {
            
            //console.log(err)
          }
        }}
      />
      
    </>
  );
}

export default Scanner1;
