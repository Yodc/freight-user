const width = 793.706;
const height = 1122.52;
let line = 30;
let new_line = 20;

let header_data = [];
header_data.company_name_en  = "JN SUCCESS CO., LTD";
header_data.company_name_th  = "บริษัท เจเอ็น สำเร็จ กำจัด";
header_data.address_1_en = "address1";
header_data.address_1_th = "ที่อยู่1";
header_data.address_2_en = "address2";
header_data.address_2_th = "ที่อยู่2";
header_data.address_3_en = "address3";
header_data.address_3_th = "ที่อยู่3";
header_data.address_4_en = "address4";
header_data.address_4_th = "ที่อยู่4";

let receipt_data = [];
receipt_data.inv_header_th = "ใบเสร็จรับเงิน / ใบกำกับภาษี";
receipt_data.inv_header_en = "RECEIPT / TAX INVOICE";

let remark_data = [];
remark_data.foot_1 = "adsdsaasdfasaafdfghjklzwaexsvftgbyhnumijokzasexdftgsgdhfjh";
remark_data.foot_2 = "adsdsaasdfaszxvjh";


const genPDF = () =>{
    let doc = new jsPDF('p', 'pt', [width , height]);
    let imgData = new Image();
    imgData.src ='logo.jpg';
    console.log(imgData);
    doc.addImage(imgData, 'JPEG', 40, 20, 100, 100);

doc.addFont('supermarket.ttf', 'supermarket', 'normal');

doc.setFont('supermarket');
doc.setFontSize(20);
doc.text(header_data.company_name_th,150,line);
doc.text(header_data.company_name_en,150,line+=new_line);
doc.setFontSize(15);
doc.text(header_data.address_1_th,150,line+=new_line);
doc.text(header_data.address_1_en,500,line);
doc.text(header_data.address_2_th,150,line+=new_line);
doc.text(header_data.address_2_en,500,line);
doc.text(header_data.address_3_th,150,line+=new_line);
doc.text(header_data.address_3_en,500,line);
doc.text(header_data.address_4_th,150,line+=new_line);
doc.text(header_data.address_4_en,500,line);


doc.text(receipt_data.inv_header_th,(width/2)-(receipt_data.inv_header_th.length/2),line+=new_line);
doc.text(receipt_data.inv_header_en,(width/2)-(receipt_data.inv_header_en.length/2),line+=new_line);


doc.autoTable({ html: '#table-1',startY: line+=new_line,theme:  'grid'});
doc.text("ได้รับเงินจาก",50,line+14)
doc.text(`เพื่อชำระตามใบแจ้งหนี้ดังต่อไปนี้ :` , 35 , line+=new_line+50);
doc.autoTable({ html: '#table-2',startY: line+=new_line,theme:  'grid'});
doc.autoTable({ html: '#table-2-foot',startY: line+=$('#table-2').height(),theme:  'grid'});
doc.autoTable({ html: '#table-3',startY: line+=$('#table-2-foot').height(),theme:  'grid'});
doc.autoTable({ html: '#table-4',startY: line+=$('#table-3').height(),theme:  'grid'});
doc.autoTable({ html: '#table-5',startY: line+=$('#table-4').height(),theme:  'grid'});


// doc.text(`sadasfsafafafas` , 35 , line+=$('#table-4').height());


// doc.setLineWidth(1);
// doc.setDrawColor(0, 0, 0);
// line+=12;
// doc.line( 50, line ,740,line);

doc.setFontSize(10);
doc.text(remark_data.foot_1 , (width/2)-(remark_data.foot_1.length*2) , line+=12);
doc.text(remark_data.foot_2 , (width/2)-(remark_data.foot_2.length*2) , line+=12);




doc.output("dataurlnewwindow");
   // doc.save("s.pdf");
}

const gentabledata = (data) =>{
    
    let html = `
                <table id="table">
                <tr>
                    <td>
                        BOOKING NO: ${$data.book_no}
                        <br>    
                        SHIPPING NAME: ${data.shipping_name}
                    </td>
                    <td>
                        REFERENCE NO.: ${data.reference_no}
                        <br>    
                        CUST. REFERENCE NO.:${data.cust_reference_no}
                    </td>
                </tr>
                <tr>
                    <td>
                        PORT OF LOADING : ${data.port_of_loading}
                        <br>    
                        PORT OF DISCHARGE : ${data.port_of_discharge}
                        <br>    
                        PORT OF DELIVERY : ${data.port_of_delivery}
                    </td>
                    <td>
                        ETD : ${data.etd}
                        <br>    
                        ETA : ${data.eta_1}
                        <br>    
                        ETA : ${data.eta_2}
                    </td>
                    
                </tr>
                <tr>
                    <td>
                        FEEDER VESSEL : ${data.feeder_vessel}
                        <br>    
                        MOTHER VESSEL : ${data.mother_vessel}
                    </td>
                    <td>
                        FEEDER VOYAGE : ${data.feeder_voyage}
                        <br>    
                        MOTHER VOYAGE : ${data.mother_voyage}
                    </td>
                </tr>
                <tr>
                    <td> WEIGHT : ${data.weight} KGS
                        <br>    
                        QUANTITY : ${data.pallets} PALLETS & ${data.corton} CORTON </td>
                    <td>
                        VOLUME : ${data.volume} CBM
                        <br>    
                        
                    </td>
                </tr>
                <tr>
                    <td>
                        LOADING AT : ${data.loading_at}
                        <br>    
                        LOADING DATE : ${data.loading_date}
                        <br>    
                        CONTACT : ${data.contact}
                        <br>    
                        TEL : ${data.tel}
                        <br>    
                        CLOSING DATE : ${data.closing_date}
                        <br>    
                        CLOSING TIME : ${data.closing_time}
                    </td>
                    <td>
                        TRANSPORTER : ${data.transporter}
                        <br>    
                        TEL : ${data.tel}
                        <br>    
                        TRUCK TYPE : ${data.truck_type}
                        <br>    
                        TRUCK NO. : ${data.truck_no}
                        <br>    
                        SHIPPING CONTACT : ${data.shipping_countact}
                        <br>    
                        TEL : ${data.tel_coutract}
                    </td>
                </tr>
            
            </table>
            </div>
            <div>
            <table id="endtable">
                <tr>
                    <td>NO. OF CONTAINER/SIZE/TYPE : ${data.on_of_container_size_type} </td>
                </tr>
                <tr >
                    <td>REMARK : PLEASE SEND SHIPPING PARTICULAR AND INVOICE & PACKING LIST WITHIN 11 SEPTEMBER 2018</td>
                </tr>
            </table>
            `;

    $('#div-table').html(html);
}

$(document).ready(function(){
    $("#pdf").click(function(){
        //gentabledata(data);
        genPDF();
    });
});