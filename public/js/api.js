var db = firebase.firestore()
var auth = firebase.auth().currentUser
db.collection('orders')
  .doc('SF')
  .onSnapshot(function(doc) {
    console.log('Current data: ', doc.data())
  })
$('#addAir').on('click', function() {
  var batch = db.batch()
  let air = [
    {
      air_name: 'Aberdeen,UK'
    },
    {
      air_name: "Abidjan,Cote D'lvore"
    },
    {
      air_name: 'Abu Dhabai,U.A.E.'
    },
    {
      air_name: 'Accra,Ghana'
    },
    {
      air_name: 'Addis Ababa,Ethiopia'
    },
    {
      air_name: 'Adelaide,SA, Australia'
    },
    {
      air_name: 'Amsterdam,Netherland'
    },
    {
      air_name: 'Anchorage,AK, USA'
    },
    {
      air_name: 'Antananarivo,Madagascar'
    },
    {
      air_name: 'Ashgabad,Turkmenistan'
    },
    {
      air_name: 'Athens,Greece'
    },
    {
      air_name: 'Atlanta,GA, USA'
    },
    {
      air_name: 'Auckland,New Zealand'
    },
    {
      air_name: 'Banghdad,Iraq'
    },
    {
      air_name: 'Bahrain,Bahrain'
    },
    {
      air_name: 'Bandar Seri Begawan,Brunei'
    },
    {
      air_name: 'Barcelona,Spain'
    },
    {
      air_name: 'Basle,Switzerland'
    },
    {
      air_name: 'Beijing,P.R. China'
    },
    {
      air_name: 'Beirut,Lebanon'
    },
    {
      air_name: 'Belfast,UK'
    },
    {
      air_name: 'Belgrade,Serbia'
    },
    {
      air_name: 'Berlin,Germany'
    },
    {
      air_name: 'Birmingham,UK'
    },
    {
      air_name: 'Bombay,Indea'
    },
    {
      air_name: 'Boston,MA, USA'
    },
    {
      air_name: 'Bremen,Germany'
    },
    {
      air_name: 'Brisbane,QL, Australia'
    },
    {
      air_name: 'Brussels,Belgium'
    },
    {
      air_name: 'Bucharest,Romania'
    },
    {
      air_name: 'Budapest,Hungary'
    },
    {
      air_name: 'Buenos Aires,Argentina'
    },
    {
      air_name: 'Cairns,QL, Australia'
    },
    {
      air_name: 'Cairo,Egypt'
    },
    {
      air_name: 'Calcutta/Kolkata,India'
    },
    {
      air_name: 'Canberra,AC, Australia'
    },
    {
      air_name: 'Cape Town,South Africa'
    },
    {
      air_name: 'Cebu,Philippines'
    },
    {
      air_name: 'Changchun,China'
    },
    {
      air_name: 'Chengdu,P.R. China'
    },
    {
      air_name: 'Chennai,India'
    },
    {
      air_name: 'Chicago,IL, USA'
    },
    {
      air_name: 'Chittagong,Bangladesh'
    },
    {
      air_name: 'Christchurch,New Zealand'
    },
    {
      air_name: 'Cincinnati,OH, USA'
    },
    {
      air_name: 'Cologne,Germany'
    },
    {
      air_name: 'Colombo,Sri Lanka'
    },
    {
      air_name: 'Copenhagen,Denmark'
    },
    {
      air_name: 'Dakar,Senegal'
    },
    {
      air_name: 'Dallas/Fort Worth,TX, USA'
    },
    {
      air_name: 'Dammascus,Syria'
    },
    {
      air_name: 'Danang,Vietnam'
    },
    {
      air_name: 'Dar Es Salaam,Tanzania'
    },
    {
      air_name: 'Darwin,NT,Australia'
    },
    {
      air_name: 'Delhi,India'
    },
    {
      air_name: 'Denpasar (Bali),Indonesia'
    },
    {
      air_name: 'Detroit,MI, USA'
    },
    {
      air_name: 'Dhahran,Saudi Arabia'
    },
    {
      air_name: 'Doha,Qatar'
    },
    {
      air_name: 'Douala,Cameroon'
    },
    {
      air_name: 'Dubai,U.A.E.'
    },
    {
      air_name: 'Dublin,Ireland REP'
    },
    {
      air_name: 'Durban,South Africa'
    },
    {
      air_name: 'Dusseldorf,Germany'
    },
    {
      air_name: 'Entebbe,Uganda'
    },
    {
      air_name: 'Frankfurt,Germany'
    },
    {
      air_name: 'Fukuoka,Japan'
    },
    {
      air_name: 'Geneva,Switzerland'
    },
    {
      air_name: 'Glasgow,UK'
    },
    {
      air_name: 'Gothenburg,Sweden'
    },
    {
      air_name: 'Guam,Guam'
    },
    {
      air_name: 'Guangzhou,P.R. China'
    },
    {
      air_name: 'Guilin,P.R. china'
    },
    {
      air_name: 'Guwahati,India'
    },
    {
      air_name: 'Haikou,P.R. China'
    },
    {
      air_name: 'Hamburg,Germany'
    },
    {
      air_name: 'Hangzhou,P.R. China'
    },
    {
      air_name: 'Hanoi,Vietnam'
    },
    {
      air_name: 'Hanover,Germany'
    },
    {
      air_name: 'Harbin,P.R China'
    },
    {
      air_name: 'Helsinki,Finland'
    },
    {
      air_name: 'Hiroshima,Japan'
    },
    {
      air_name: 'Ho Chi Min City,Vietnam'
    },
    {
      air_name: 'Hong Kong,Hong Kong'
    },
    {
      air_name: 'Honolulu,HI, USA'
    },
    {
      air_name: 'Houston,TX, USA'
    },
    {
      air_name: 'Hyderabad,India'
    },
    {
      air_name: 'Incheon,Rep. of Korea'
    },
    {
      air_name: 'Islamabad,Pakistan'
    },
    {
      air_name: 'Istanbul,Turkey'
    },
    {
      air_name: 'Jaipur,India'
    },
    {
      air_name: 'Jakarta,Indonesia'
    },
    {
      air_name: 'Jeddah,Saudi Arabia'
    },
    {
      air_name: 'Jinan,P R China'
    },
    {
      air_name: 'Jinghong,C N China'
    },
    {
      air_name: 'Johannesburg,South Africa'
    },
    {
      air_name: 'Johor Bahru,Malaysia'
    },
    {
      air_name: 'Kagoshima,Japan'
    },
    {
      air_name: 'Kaohsiung,Taiwan'
    },
    {
      air_name: 'Karachi,Pakistan'
    },
    {
      air_name: 'Kathmandu,Nepal'
    },
    {
      air_name: 'Khartoum,Sudan'
    },
    {
      air_name: 'Kiev,Ukraine'
    },
    {
      air_name: 'Kilimanjaro,Tanzania'
    },
    {
      air_name: 'Kolkata,India'
    },
    {
      air_name: 'Kota Kinabalu,Malaysia'
    },
    {
      air_name: 'Kuala Lumpur,Malaysia'
    },
    {
      air_name: 'Kuching,P R China'
    },
    {
      air_name: 'Kuwait,Kuwait'
    },
    {
      air_name: 'Lagos,Nigeria'
    },
    {
      air_name: 'Lahore,Pakistan'
    },
    {
      air_name: 'Larnca,Cyprus'
    },
    {
      air_name: 'Las Vegus,U.S.A'
    },
    {
      air_name: 'Lisbon,Portugal'
    },
    {
      air_name: 'London,UK'
    },
    {
      air_name: 'Los Angeles,CA USA'
    },
    {
      air_name: 'Luang PraBang,Laos'
    },
    {
      air_name: 'Luxembourg,Luxembourg'
    },
    {
      air_name: 'Lyon,France'
    },
    {
      air_name: 'Madras,India'
    },
    {
      air_name: 'Madrid,Spain'
    },
    {
      air_name: 'Mahe,Seychelles'
    },
    {
      air_name: 'Male,Maldives'
    },
    {
      air_name: 'Manchester,UK'
    },
    {
      air_name: 'Manila,Philippines'
    },
    {
      air_name: 'Mauritius,Mauritius'
    },
    {
      air_name: 'Medan,Indonesia'
    },
    {
      air_name: 'Melbourne,VL Australia'
    },
    {
      air_name: 'Memphis,TN, USA'
    },
    {
      air_name: 'Mexico City,Mexcio'
    },
    {
      air_name: 'Miami,FL, USA'
    },
    {
      air_name: 'Milan,Italy'
    },
    {
      air_name: 'Moscow,Russian Fed.'
    },
    {
      air_name: 'Mumbai (Bombay),India'
    },
    {
      air_name: 'Munich,Germany'
    },
    {
      air_name: 'Muscat,Oman'
    },
    {
      air_name: 'Nagasaki,Japan'
    },
    {
      air_name: 'Nagoya,Japan'
    },
    {
      air_name: 'Nairobi,Kenya'
    },
    {
      air_name: 'Naples,Italy'
    },
    {
      air_name: 'Newcastle,UK'
    },
    {
      air_name: 'New York,NY, USA'
    },
    {
      air_name: 'Nice,France'
    },
    {
      air_name: 'Nigata,Japan'
    },
    {
      air_name: 'Nuremberg,Germany'
    },
    {
      air_name: 'Oita,Japan'
    },
    {
      air_name: 'Okayama,Japan'
    },
    {
      air_name: 'Okinawa,Japan'
    },
    {
      air_name: 'Orlando,FL, USA'
    },
    {
      air_name: 'Osaka,Japan'
    },
    {
      air_name: 'Oslo,Norway'
    },
    {
      air_name: 'Paris,France'
    },
    {
      air_name: 'Paro,Bhutan'
    },
    {
      air_name: 'Penang,Malaysia'
    },
    {
      air_name: 'Perth,WA, Australia'
    },
    {
      air_name: 'Philadelphia,PA, USA'
    },
    {
      air_name: 'Phnom Penh,Cambodia'
    },
    {
      air_name: 'Phuket,Thailand'
    },
    {
      air_name: 'Portland,ME, USA'
    },
    {
      air_name: 'Prague,Czech Republic'
    },
    {
      air_name: 'Pyongyang,DPR Korea'
    },
    {
      air_name: 'Qingdao,P R China'
    },
    {
      air_name: 'Riga,Latvia'
    },
    {
      air_name: 'Rio De Janerio,Brazil'
    },
    {
      air_name: 'Riyadh,Saudi Arabia'
    },
    {
      air_name: 'Rome,Italy'
    },
    {
      air_name: 'St Peterberg,Bussian Federation'
    },
    {
      air_name: 'Salt Lake City,U.S.A'
    },
    {
      air_name: 'Salzburg,Austria'
    },
    {
      air_name: 'San Diego,U.S.A'
    },
    {
      air_name: 'San Francisco,CA, U.S.A'
    },
    {
      air_name: 'Sao Paulo,Brazil'
    },
    {
      air_name: 'Sapporo,Japan'
    },
    {
      air_name: 'Seattle,WA, USA'
    },
    {
      air_name: 'Sendai,Japan'
    },
    {
      air_name: 'Seoul,Korea REP'
    },
    {
      air_name: 'Shanghai,P R China'
    },
    {
      air_name: 'Shantou,P R China'
    },
    {
      air_name: 'Sharaj,U.A.E'
    },
    {
      air_name: 'Shenzhen,P R China'
    },
    {
      air_name: 'Shenyang,P R China'
    },
    {
      air_name: 'Singapore,Singapore'
    },
    {
      air_name: 'Sofia,Bulgaria'
    },
    {
      air_name: 'Stavanger,Norway'
    },
    {
      air_name: 'Stockholm,Sweden'
    },
    {
      air_name: 'Stuttgart,Germany'
    },
    {
      air_name: 'Surabaya,Indonisia'
    },
    {
      air_name: 'Sydney,NS, Australia'
    },
    {
      air_name: 'Taipei,Taiwan R O C'
    },
    {
      air_name: 'Tashkent,Uzbekistan'
    },
    {
      air_name: 'Tehran,Iran'
    },
    {
      air_name: 'Tel Aviv,Israel'
    },
    {
      air_name: 'Tirana,Albania'
    },
    {
      air_name: 'Tiruchirapally,India'
    },
    {
      air_name: 'Tokyo,Japan'
    },
    {
      air_name: 'Toronto,OT, Canada'
    },
    {
      air_name: 'Tripoli,Libya'
    },
    {
      air_name: 'Trivandrum,India'
    },
    {
      air_name: 'Tunis,Tunisia'
    },
    {
      air_name: 'Vancouver,BC Canada'
    },
    {
      air_name: 'Venice,Italy'
    },
    {
      air_name: 'Vienna,Austria'
    },
    {
      air_name: 'Vientaine,Lao P D R'
    },
    {
      air_name: 'Vladivistok,Russia'
    },
    {
      air_name: 'Warsaw,Porland'
    },
    {
      air_name: 'Washington,DC U.S.A'
    },
    {
      air_name: 'Wellington,New Zealand'
    },
    {
      air_name: 'Wuhan,P.R China'
    },
    {
      air_name: 'Xiamen,P R China'
    },
    {
      air_name: "Xi'an,P R China"
    },
    {
      air_name: 'Yangon,Myanmar'
    },
    {
      air_name: 'Zhengzhou,China'
    },
    {
      air_name: 'Zurich,Switzerland'
    }
  ]
  for (const i in air) {
    let ref = db.collection('air').doc(air[i])
    batch.set(ref, air[i])
  }
  batch.commit().then(() => {
    console.log('batch success')
  })
})

$('#status').on('click', function() {
  $.ajax({
    url: `${baseapi}/status`,
    type: 'Get',
    contentType: 'application/json;charset=utf-8',

    success: function(results) {
      console.log('Ticket ' + results.id + ' successfully created')
    },
    error: function(x, y, z) {
      console.log('Network error has occurred. Please try again!', { x, y, z })
      status = {
        status: 'newBooking',
        data: {
          newBooking: {
            width: '100',
            height: '100',
            depth: '100',
            weight: '100',
            type: '100',
            item_name: 'Atomic Bomb',
            from: 'Bankok, Thailand',
            to: 'Hiroshima,Japan',
            trans_type: 'Air'
          },
          booking: null,
          invoice: null,
          receipt: null
        }
      }
      if (status.status === 'newBooking') {
        getDropdown('air')
        $('.booking-card').on('click', function() {
          let transId = $(this).attr('id')
          switch (transId) {
            case 'air-booking-card':
              $('.booking-card').removeClass('active')
              $('#air-booking-card').addClass('active')
              $('.booking-trans').removeAttr('checked')
              $('#air_booking').attr('checked', 'checked')
              $('#input-trans').addClass('hide')
              $('#select-trans').removeClass('hide')
              break
            case 'sea-booking-card':
              $('.booking-card').removeClass('active')
              $('#sea-booking-card').addClass('active')
              $('.booking-trans').removeAttr('checked')
              $('#sea_booking').attr('checked', 'checked')
              $('#input-trans').addClass('hide')
              $('#select-trans').removeClass('hide')
              break
            case 'land-booking-card':
              $('.booking-card').removeClass('active')
              $('#land-booking-card').addClass('active')
              $('.booking-trans').removeAttr('checked')
              $('#land_booking').attr('checked', 'checked')
              $('#input-trans').removeClass('hide')
              $('#select-trans').addClass('hide')
              break
            default:
              break
          }
        })
      }
    }
  })
})
login = (email, password) => {
  $.ajax({
    url: `${baseapi}/login`,
    type: 'Get',
    contentType: 'application/json;charset=utf-8',
    data: {
      email,
      password
    },
    success: function(results) {
      console.log('Ticket ' + results.id + ' successfully created')
    },
    error: function(x, y, z) {
      localStorage.setItem('token', 'lbnbnige231a@')
      localStorage.setItem('first_name', 'Pranitarn')
      localStorage.setItem('last_name', 'Fuaengfuvongrat')
      location.reload()
      console.log('Network error has occurred. Please try again!', { x, y, z })
    }
  })
}
