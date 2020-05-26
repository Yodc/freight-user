const width = 793.706
const height = 1122.52
let line = 30
let new_line = 20

let header_data = []
header_data.company_name_en = 'JN SUCCESS CO., LTD'
header_data.company_name_th = 'บริษัท เจเอ็น สำเร็จ กำจัด'
header_data.address_1_en = 'address1'
header_data.address_1_th = 'ที่อยู่1'
header_data.address_2_en = 'address2'
header_data.address_2_th = 'ที่อยู่2'
header_data.address_3_en = 'address3'
header_data.address_3_th = 'ที่อยู่3'
header_data.address_4_en = 'address4'
header_data.address_4_th = 'ที่อยู่4'

let invoice_data = []
invoice_data.inv_header_th = 'ใบแจ้งหนี้'
invoice_data.inv_header_en = 'INVOICE'
invoice_data.customer_name = 'Yodchai Thammakeson'
invoice_data.invoice_no = '12356789'
invoice_data.customer_address_1 = 'customer_address_1'
invoice_data.customer_address_2 = 'customer_address_2'
invoice_data.customer_address_3 = 'customer_address_3'
invoice_data.customer_date = '2/2/2'
invoice_data.customer_terms = '30 Days'
invoice_data.customer_due_date = '3/3/3'
invoice_data.customer_job_no = '2/2/2'
invoice_data.customer_obl_no = 'aef11'
invoice_data.customer_hbl_no = ''
invoice_data.tax1percent = '1.11'
invoice_data.tax3percent = '2.22'
invoice_data.net_amount = '3.33'

let remark_data = []
remark_data.foot_1 = 'adsdsaasdfasaafdfghjklzwaexsvftgbyhnumijokzasexdftgsgdhfjh'
remark_data.foot_2 = 'adsdsaasdfaszxvjh'

const genPDF = () => {
  let doc = new jsPDF('p', 'pt', [width, height])
  let imgData = new Image()
  imgData.src = 'logo.jpg'
  console.log(imgData)
  doc.addImage(imgData, 'JPEG', 40, 20, 100, 100)

  doc.addFont('supermarket.ttf', 'supermarket', 'normal')

  doc.setFont('supermarket')
  doc.setFontSize(20)
  doc.text(header_data.company_name_th, 150, line)
  doc.text(header_data.company_name_en, 150, (line += new_line))
  doc.setFontSize(15)
  doc.text(header_data.address_1_th, 150, (line += new_line))
  doc.text(header_data.address_1_en, 500, line)
  doc.text(header_data.address_2_th, 150, (line += new_line))
  doc.text(header_data.address_2_en, 500, line)
  doc.text(header_data.address_3_th, 150, (line += new_line))
  doc.text(header_data.address_3_en, 500, line)
  doc.text(header_data.address_4_th, 150, (line += new_line))
  doc.text(header_data.address_4_en, 500, line)

  doc.text(
    invoice_data.inv_header_th,
    width / 2 - invoice_data.inv_header_th.length / 2,
    (line += new_line)
  )
  doc.text(
    invoice_data.inv_header_en,
    width / 2 - invoice_data.inv_header_en.length / 2,
    (line += new_line)
  )

  doc.text(`ชื่อลูกค้า/Customer Name : ${invoice_data.customer_name}`, 25, (line += new_line))
  doc.text(`invoice : ${invoice_data.invoice_no}`, 500, line)

  doc.text(
    `ที่อยุ่/Address                 : ${invoice_data.customer_address_1}`,
    25,
    (line += new_line)
  )
  doc.text(`DATE : ${invoice_data.customer_date}`, 500, line)
  doc.text(
    `                                    ${invoice_data.customer_address_2}`,
    25,
    (line += new_line)
  )
  doc.text(`TERMS : ${invoice_data.customer_terms}`, 500, line)
  doc.text(
    `                                    ${invoice_data.customer_address_3}`,
    25,
    (line += new_line)
  )
  doc.text(`TERMS : ${invoice_data.customer_due_date}`, 500, line)
  doc.text(`JOB NO. : ${invoice_data.customer_job_no}`, 500, (line += new_line))
  doc.text(`OBL NO. : ${invoice_data.customer_obl_no}`, 500, (line += new_line))
  doc.text(`HBL NO. : ${invoice_data.customer_hbl_no}`, 500, (line += new_line))

  doc.autoTable({ html: '#table-1', startY: (line += new_line), theme: 'grid' })
  doc.autoTable({ html: '#table-2', startY: (line += $('#table-1').height() - 60), theme: 'grid' })
  doc.autoTable({
    html: '#table-3',
    startY: (line += $('#table-2').height() - 5),
    theme: 'grid',
    columnStyles: { 0: { cellWidth: 380 }, 1: { cellWidth: 170 } },
  })
  doc.autoTable({
    html: '#table-4 ',
    startY: (line += $('#table-3').height() - 5),
    theme: 'grid',
    columnStyles: { 0: { cellWidth: 380 }, 1: { cellWidth: 170 } },
  })

  doc.text(`BHT : esjfo aofnoisngor`, 35, (line += new_line + 50))

  doc.text(`REMARKS :     invoice no.: asd1511-51`, 35, (line += new_line))
  doc.text(`LESS: WITH HOLDING TAX 1%         ${invoice_data.tax1percent}`, 500, line)
  doc.text(`LESS: WITH HOLDING TAX 3%         ${invoice_data.tax3percent}`, 500, (line += new_line))
  doc.text(`NET AMOUNT ${invoice_data.net_amount}`, 500, (line += new_line))

  doc.setFontSize(10)
  doc.text(`For and on behalf of`, 550, (line += new_line))
  doc.setFontSize(15)
  doc.text(header_data.company_name_en, 530, (line += new_line))
  line += new_line + 10
  doc.setLineWidth(1)
  doc.setDrawColor(0, 0, 0)
  doc.line(520, line, 660, line)

  doc.text(`Authorizes Signatory`, 535, (line += 12))
  doc.setLineWidth(1)
  doc.setDrawColor(0, 0, 0)
  line += 12
  doc.line(50, line, 740, line)

  doc.setFontSize(10)
  doc.text(remark_data.foot_1, width / 2 - remark_data.foot_1.length * 2, (line += 12))
  doc.text(remark_data.foot_2, width / 2 - remark_data.foot_2.length * 2, (line += 12))

  //   doc.output('dataurlnewwindow')
  doc.save('s.pdf')
}

const gentabledata = (data) => {
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
            `

  $('#div-table').html(html)
}

$(document).ready(function () {
  $('#pdf').click(function () {
    // gentabledata(data);
    genPDF()
  })
})
