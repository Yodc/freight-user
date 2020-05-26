const width = 793.706;
const height = 1122.52;
let line = 30;
let new_line = 20;

let header_data = [];
header_data.company_name  = "JN SUCCESS CO., LTD";
header_data.address_1 = "58/12 MOO 5, T.BANGMEANANG," ;
header_data.address_2 = "A.BANGYAI, NONTHABURI 11140,THAILAND" ;
header_data.contract = "TEL:(66) 0 2916 4274 FAX: (66) 0 2916 4274";
header_data.vat_register_no = "VAT REGISTERED NO: 0-1255-53016-10-9";

let booking_data = [];
booking_data.booking_header = "BOOKING CONFIRAMATION ";
booking_data.to = "To";
booking_data.to_detail = "Yodchai";
booking_data.date = "Date";
booking_data.date_datail = "03/04/1997";
booking_data.attn = "ATTN";
booking_data.attn_detail = "asdaf";
booking_data.from = "From";
booking_data.from_detail = "LOLOLOL";

let text_pdf = [];
text_pdf.please_find_bellow = "PLEASE FIND BELOW OUR BOOKING CONFIRMATION WITH DETAILS OF SAILING SCHEDULE FROM SINGAPORE TO BANGKOK ,THAILAND AND OTHER NECESSARY INFORMATION AS FOLLOW:- ";
text_pdf.thx = "THANK YOU VERY MUCH FOR YOUR KIND PATRONAGE IN CHOOSING OUR SERVICE AND WE ARELOOKING FORWARD FOR YOUR CONTINUE SUPPORT. FPOR FURTHER INFORMATION PLEASE CONTACT US AT YOUR CONVENIENCE.";
text_pdf.end_text = "YOURS FAITHFULLY,";

const genPDF = () =>{
    let doc = new jsPDF('p', 'pt', [width , height]);

    //header
    doc.setFontSize(20);         
    doc.text(header_data.company_name,(doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(header_data.company_name) * doc.internal.getFontSize() / 2),line+=new_line);
    doc.setFontSize(15);
    doc.text(header_data.address_1,(doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(header_data.address_1) * doc.internal.getFontSize() / 2),line+=new_line);
    doc.text(header_data.address_2,(doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(header_data.address_2) * doc.internal.getFontSize() / 2),line+=new_line);
    doc.text(header_data.contract,(doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(header_data.contract) * doc.internal.getFontSize() / 2),line+=new_line);
    doc.text(header_data.vat_register_no,(doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(header_data.vat_register_no) * doc.internal.getFontSize() / 2),line+=new_line);

    // Booking
    doc.setFontSize(20);
    doc.text(booking_data.booking_header,(doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(booking_data.booking_header) * doc.internal.getFontSize() / 2),line+=(new_line+30));
    doc.setFontSize(15); 

    doc.text(booking_data.to,25,line+=new_line+10);
    doc.text(booking_data.to_detail,100,line);
    doc.text(booking_data.date,((doc.internal.pageSize.width ) - (doc.getStringUnitWidth(booking_data.date) * doc.internal.getFontSize())-150),line);
    doc.text(booking_data.date_datail,((doc.internal.pageSize.width ) - (doc.getStringUnitWidth(booking_data.date_datail) * doc.internal.getFontSize())-50),line);
    
    doc.text(booking_data.attn,25,line+=new_line);
    doc.text(booking_data.attn_detail,100,line);
    doc.text(booking_data.from,25,line+=new_line);
    doc.text(booking_data.from_detail,100,line);

    doc.text(text_pdf.please_find_bellow,25,line+=new_line+10);

    //table
    doc.autoTable({ html: '#table',startY: line+new_line,theme:  'grid'});
    doc.setFontSize(15); 
    doc.autoTable({ html: '#endtable',startY: line += $('#table').height()-60,theme:  'grid'});

    //end text
    doc.setFontSize(10); 
    doc.text(text_pdf.thx,10, line += $('#endtable').height()+30);
    doc.text(text_pdf.end_text,10, line+=15);
    doc.text(header_data.company_name,10, line+=15);





    //doc.output("dataurlnewwindow");
    doc.save("dataurlnewwindow");
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