import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable'


@Injectable({
  providedIn: 'root'
})
export class PDFService {
 
  constructor() { }

  generarPDF(columns: any, rows: any,name: String){
  let doc = new jsPDF();
  let specialElementHandlers = {
    '#editor' : function (element, renderer){
      return true
    }
  };
  //doc.text('Total: '+ total,15,15)
  doc.autoTable({
    styleUrls: ['./style.css'],
   
    columns: 
     columns
    ,
    body: 
    rows,
    Text
    
  })
 
  doc.save(name+'.pdf')

  }











  
}
