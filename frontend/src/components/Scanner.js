import React from 'react'

const Scanner = (props) => {

             var barcode='';
             var interval;
             document.addEventListener('keydown',function(evt){
               //console.log("listening")
               if(interval){clearInterval(interval)}
               if(evt.code==='Enter')
               {
                 if(barcode)
                 {
                  
                   props.handleBar(barcode)
       
                   barcode='';
                   return;
                 }
               }
               if(evt.key!=='Shift')
               {
                 barcode+=evt.key;
                 interval=setInterval(()=>barcode='',200);
               }
             });
            
  
  return (
   <></>
  )
}

export default Scanner