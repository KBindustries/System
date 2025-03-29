import React, {useState} from 'react'
import QRCode from 'react-qr-code'

const QrCodeCard =({component} ) =>{
    const [showCode, setShowCode] = useState(false);

    const handleClick =() =>{
        setShowCode(true);
    }
    // const componentString = JSON.stringify(component);
    return(
        <>
        <button onClick={handleClick}>Generate code</button>
        {showCode && <QRCode size={100} value='test'/>}
        </>
    )
}
export default QrCodeCard