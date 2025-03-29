import React,{useState, useEffect} from "react";
import QRCode from "react-qr-code";


function GenerateQrCode({children}){
    //use ref to access the child component's dom node

    const childRef = React.useRef();

    //use state to store the qrcod value

    const [value, setValue] = useState('');

    //use effect to update the qrcode value when the child component changes 

    useEffect(() => {

        //Get the child component's dom node

        const node = childRef.current;

        //check if the node exists
        if(node){

            //convert to a data-url using htmlCanvasElement.toDataURL()

            node.toDataURL('image/png', (err, dataUrl) => {
                //check if there is no error 
                if(!err){

                    // update the qrcode value with the data url
                    setValue(dataUrl)
                }
            });
        }
    },[children]);

    return(
        <>
        <h1>Generate QrCode</h1>
        <div className="flex">
            <div className="w-1/2">
                <h2>Child component</h2>
                {/* Render the child component and pass the ref */}

                {React.cloneElement(children, {ref : childRef})}

            </div>
            <div className="w-1/2">
                <h2>QR Code</h2>
                {/* Render the qr code componet with the value */}
                <QRCode value={value} />
            </div>
        </div>
        </>
    )
}

export default GenerateQrCode