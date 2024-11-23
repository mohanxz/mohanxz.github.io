import { useState } from "react"
export const QrCode=()=>{
   const [img,setImg] =useState("");
   const[loading,setLoading]=useState(false);
   const[QrData,setQrData]=useState();
   const[QrSize,setQrSize]=useState();

   async function generateQr(){
    setLoading(true);
    try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${QrSize}x${QrSize}&data=${encodeURIComponent(QrData)}`;
        setImg(url);

    }
    catch(error){
        console.log("error generating QR code",error);
    }
    finally{
        setLoading(false);
    }


   }

   function downloadQr(){
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const linkz=document.createElement('a');
            linkz.href=URL.createObjectURL(blob);
            linkz.download=QrData+"'s QRcode.png";
            document.body.appendChild(linkz);
            linkz.click();
            document.body.removeChild(linkz);
    
        })
       }
   
    return(
        <>
        <div className="app-container" >
            <h1>QR Code Generator</h1>
           { loading && <p>Please wait . . .</p>}
                { img && <img src={img} alt="" className="qrimage"/>}
            <div>
                <label htmlFor="dataInput" className="input-label" >
                    Data for Qr code :
                </label>
                <input type="text" id="dataInput" placeholder="Enter the Data for QR code" value={QrData} onChange={(e)=>setQrData(e.target.value)}/> 
                <label htmlFor="sizeInput"> Image Size(e.g.,150) :
                </label>
                <input type="text" id="sizeInput" placeholder="Enter the image size " value={QrSize} onChange={(a)=>setQrSize(a.target.value)}/>
                <div className="buttons">
                <button className="generate-btn" disabled={loading} onClick={generateQr}>Generate Qr Code</button>
                <button className="download-btn" onClick={downloadQr}>Download QR Code</button>
                <p className="design">Designed by <a href="https://mohanxz.github.io/" id="by"  style={{color:"red"}} >mohanRaj</a></p>
                </div>
            </div>
        </div>

        </>
    )
}