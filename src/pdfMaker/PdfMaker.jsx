import React, { useState } from "react"
import {jsPDF} from "jspdf"

export const PdfMaker = ()=>{
    const [files, setFiles] = useState()

    

    
    
    const makePdfsLol = ()=>{
        const doc = new jsPDF();
       console.log( "making pdf");
       
       
       let i=0
       
       for(i=0;i<files.length; i++ ){
        console.log(files[i]);
        const url = URL.createObjectURL(files[i])
        doc.addImage(url,"jpg", 10, 10)
        if(i+1 != files.length)
        {doc.addPage()}
        
        
        
       }
       
       
       
    // doc.text("hello world l00000olllllll", 10,10)
    doc.save("aq.pdf")
    }

    const handleFileUpload = (e)=>{
       
        setFiles(e.target.files)
        
        
    }
    const logFiles = ()=>{
        console.log(files);
        
    }

    return (
        <>
        make pdfs lol
        <br />
        <input type="file" name="" id="" multiple onChange={(e)=>{handleFileUpload(e)}}/>
        <br />
        <p> --------- </p>
        <button onClick={(e)=>{makePdfsLol(e)}}> make a pdf  </button>
        <br />
        <button onClick={()=>{logFiles()
        }}> log file</button>
        </>
    )
}