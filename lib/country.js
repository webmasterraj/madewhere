// Data from http://country.io/names.json
// You can use this code to get country data in the same format as below
// //////////////////////
//
// let cts = await (await fetch("http://country.io/names.json")).json()
// let data = []
// for (let i = 0; i < Object.values(cts).length; i++) {
//     data.push({code:Object.keys(cts)[i], name:Object.values(cts)[i], flag:`https://flagsapi.com/${Object.keys(cts)[i]}/flat/32.png`});
// }
//
// ////////////////////


const flagSize = "32";

const CountryData = 
[
    {
        "code": "BD",
        "name": "Bangladesh",
        "flag": `https://flagsapi.com/BD/flat/${flagSize}.png`
    },
    {
        "code": "BE",
        "name": "Belgium",
        "flag": `https://flagsapi.com/BE/flat/${flagSize}.png`
    },
    {
        "code": "BF",
        "name": "Burkina Faso",
        "flag": `https://flagsapi.com/BF/flat/${flagSize}.png`
    },
    {
        "code": "BG",
        "name": "Bulgaria",
        "flag": `https://flagsapi.com/BG/flat/${flagSize}.png`
    },
    {
        "code": "BA",
        "name": "Bosnia and Herzegovina",
        "flag": `https://flagsapi.com/BA/flat/${flagSize}.png`
    },
    {
        "code": "BB",
        "name": "Barbados",
        "flag": `https://flagsapi.com/BB/flat/${flagSize}.png`
    },
    {
        "code": "WF",
        "name": "Wallis and Futuna",
        "flag": `https://flagsapi.com/WF/flat/${flagSize}.png`
    },
    {
        "code": "BL",
        "name": "Saint Barthelemy",
        "flag": `https://flagsapi.com/BL/flat/${flagSize}.png`
    },
    {
        "code": "BM",
        "name": "Bermuda",
        "flag": `https://flagsapi.com/BM/flat/${flagSize}.png`
    },
    {
        "code": "BN",
        "name": "Brunei",
        "flag": `https://flagsapi.com/BN/flat/${flagSize}.png`
    },
    {
        "code": "BO",
        "name": "Bolivia",
        "flag": `https://flagsapi.com/BO/flat/${flagSize}.png`
    },
    {
        "code": "BH",
        "name": "Bahrain",
        "flag": `https://flagsapi.com/BH/flat/${flagSize}.png`
    },
    {
        "code": "BI",
        "name": "Burundi",
        "flag": `https://flagsapi.com/BI/flat/${flagSize}.png`
    },
    {
        "code": "BJ",
        "name": "Benin",
        "flag": `https://flagsapi.com/BJ/flat/${flagSize}.png`
    },
    {
        "code": "BT",
        "name": "Bhutan",
        "flag": `https://flagsapi.com/BT/flat/${flagSize}.png`
    },
    {
        "code": "JM",
        "name": "Jamaica",
        "flag": `https://flagsapi.com/JM/flat/${flagSize}.png`
    },
    {
        "code": "BV",
        "name": "Bouvet Island",
        "flag": `https://flagsapi.com/BV/flat/${flagSize}.png`
    },
    {
        "code": "BW",
        "name": "Botswana",
        "flag": `https://flagsapi.com/BW/flat/${flagSize}.png`
    },
    {
        "code": "WS",
        "name": "Samoa",
        "flag": `https://flagsapi.com/WS/flat/${flagSize}.png`
    },
    {
        "code": "BQ",
        "name": "Bonaire, Saint Eustatius and Saba ",
        "flag": `https://flagsapi.com/BQ/flat/${flagSize}.png`
    },
    {
        "code": "BR",
        "name": "Brazil",
        "flag": `https://flagsapi.com/BR/flat/${flagSize}.png`
    },
    {
        "code": "BS",
        "name": "Bahamas",
        "flag": `https://flagsapi.com/BS/flat/${flagSize}.png`
    },
    {
        "code": "JE",
        "name": "Jersey",
        "flag": `https://flagsapi.com/JE/flat/${flagSize}.png`
    },
    {
        "code": "BY",
        "name": "Belarus",
        "flag": `https://flagsapi.com/BY/flat/${flagSize}.png`
    },
    {
        "code": "BZ",
        "name": "Belize",
        "flag": `https://flagsapi.com/BZ/flat/${flagSize}.png`
    },
    {
        "code": "RU",
        "name": "Russia",
        "flag": `https://flagsapi.com/RU/flat/${flagSize}.png`
    },
    {
        "code": "RW",
        "name": "Rwanda",
        "flag": `https://flagsapi.com/RW/flat/${flagSize}.png`
    },
    {
        "code": "RS",
        "name": "Serbia",
        "flag": `https://flagsapi.com/RS/flat/${flagSize}.png`
    },
    {
        "code": "TL",
        "name": "East Timor",
        "flag": `https://flagsapi.com/TL/flat/${flagSize}.png`
    },
    {
        "code": "RE",
        "name": "Reunion",
        "flag": `https://flagsapi.com/RE/flat/${flagSize}.png`
    },
    {
        "code": "TM",
        "name": "Turkmenistan",
        "flag": `https://flagsapi.com/TM/flat/${flagSize}.png`
    },
    {
        "code": "TJ",
        "name": "Tajikistan",
        "flag": `https://flagsapi.com/TJ/flat/${flagSize}.png`
    },
    {
        "code": "RO",
        "name": "Romania",
        "flag": `https://flagsapi.com/RO/flat/${flagSize}.png`
    },
    {
        "code": "TK",
        "name": "Tokelau",
        "flag": `https://flagsapi.com/TK/flat/${flagSize}.png`
    },
    {
        "code": "GW",
        "name": "Guinea-Bissau",
        "flag": `https://flagsapi.com/GW/flat/${flagSize}.png`
    },
    {
        "code": "GU",
        "name": "Guam",
        "flag": `https://flagsapi.com/GU/flat/${flagSize}.png`
    },
    {
        "code": "GT",
        "name": "Guatemala",
        "flag": `https://flagsapi.com/GT/flat/${flagSize}.png`
    },
    {
        "code": "GS",
        "name": "South Georgia and the South Sandwich Islands",
        "flag": `https://flagsapi.com/GS/flat/${flagSize}.png`
    },
    {
        "code": "GR",
        "name": "Greece",
        "flag": `https://flagsapi.com/GR/flat/${flagSize}.png`
    },
    {
        "code": "GQ",
        "name": "Equatorial Guinea",
        "flag": `https://flagsapi.com/GQ/flat/${flagSize}.png`
    },
    {
        "code": "GP",
        "name": "Guadeloupe",
        "flag": `https://flagsapi.com/GP/flat/${flagSize}.png`
    },
    {
        "code": "JP",
        "name": "Japan",
        "flag": `https://flagsapi.com/JP/flat/${flagSize}.png`
    },
    {
        "code": "GY",
        "name": "Guyana",
        "flag": `https://flagsapi.com/GY/flat/${flagSize}.png`
    },
    {
        "code": "GG",
        "name": "Guernsey",
        "flag": `https://flagsapi.com/GG/flat/${flagSize}.png`
    },
    {
        "code": "GF",
        "name": "French Guiana",
        "flag": `https://flagsapi.com/GF/flat/${flagSize}.png`
    },
    {
        "code": "GE",
        "name": "Georgia",
        "flag": `https://flagsapi.com/GE/flat/${flagSize}.png`
    },
    {
        "code": "GD",
        "name": "Grenada",
        "flag": `https://flagsapi.com/GD/flat/${flagSize}.png`
    },
    {
        "code": "GB",
        "name": "United Kingdom",
        "flag": `https://flagsapi.com/GB/flat/${flagSize}.png`
    },
    {
        "code": "GA",
        "name": "Gabon",
        "flag": `https://flagsapi.com/GA/flat/${flagSize}.png`
    },
    {
        "code": "SV",
        "name": "El Salvador",
        "flag": `https://flagsapi.com/SV/flat/${flagSize}.png`
    },
    {
        "code": "GN",
        "name": "Guinea",
        "flag": `https://flagsapi.com/GN/flat/${flagSize}.png`
    },
    {
        "code": "GM",
        "name": "Gambia",
        "flag": `https://flagsapi.com/GM/flat/${flagSize}.png`
    },
    {
        "code": "GL",
        "name": "Greenland",
        "flag": `https://flagsapi.com/GL/flat/${flagSize}.png`
    },
    {
        "code": "GI",
        "name": "Gibraltar",
        "flag": `https://flagsapi.com/GI/flat/${flagSize}.png`
    },
    {
        "code": "GH",
        "name": "Ghana",
        "flag": `https://flagsapi.com/GH/flat/${flagSize}.png`
    },
    {
        "code": "OM",
        "name": "Oman",
        "flag": `https://flagsapi.com/OM/flat/${flagSize}.png`
    },
    {
        "code": "TN",
        "name": "Tunisia",
        "flag": `https://flagsapi.com/TN/flat/${flagSize}.png`
    },
    {
        "code": "JO",
        "name": "Jordan",
        "flag": `https://flagsapi.com/JO/flat/${flagSize}.png`
    },
    {
        "code": "HR",
        "name": "Croatia",
        "flag": `https://flagsapi.com/HR/flat/${flagSize}.png`
    },
    {
        "code": "HT",
        "name": "Haiti",
        "flag": `https://flagsapi.com/HT/flat/${flagSize}.png`
    },
    {
        "code": "HU",
        "name": "Hungary",
        "flag": `https://flagsapi.com/HU/flat/${flagSize}.png`
    },
    {
        "code": "HK",
        "name": "Hong Kong",
        "flag": `https://flagsapi.com/HK/flat/${flagSize}.png`
    },
    {
        "code": "HN",
        "name": "Honduras",
        "flag": `https://flagsapi.com/HN/flat/${flagSize}.png`
    },
    {
        "code": "HM",
        "name": "Heard Island and McDonald Islands",
        "flag": `https://flagsapi.com/HM/flat/${flagSize}.png`
    },
    {
        "code": "VE",
        "name": "Venezuela",
        "flag": `https://flagsapi.com/VE/flat/${flagSize}.png`
    },
    {
        "code": "PR",
        "name": "Puerto Rico",
        "flag": `https://flagsapi.com/PR/flat/${flagSize}.png`
    },
    {
        "code": "PS",
        "name": "Palestinian Territory",
        "flag": `https://flagsapi.com/PS/flat/${flagSize}.png`
    },
    {
        "code": "PW",
        "name": "Palau",
        "flag": `https://flagsapi.com/PW/flat/${flagSize}.png`
    },
    {
        "code": "PT",
        "name": "Portugal",
        "flag": `https://flagsapi.com/PT/flat/${flagSize}.png`
    },
    {
        "code": "SJ",
        "name": "Svalbard and Jan Mayen",
        "flag": `https://flagsapi.com/SJ/flat/${flagSize}.png`
    },
    {
        "code": "PY",
        "name": "Paraguay",
        "flag": `https://flagsapi.com/PY/flat/${flagSize}.png`
    },
    {
        "code": "IQ",
        "name": "Iraq",
        "flag": `https://flagsapi.com/IQ/flat/${flagSize}.png`
    },
    {
        "code": "PA",
        "name": "Panama",
        "flag": `https://flagsapi.com/PA/flat/${flagSize}.png`
    },
    {
        "code": "PF",
        "name": "French Polynesia",
        "flag": `https://flagsapi.com/PF/flat/${flagSize}.png`
    },
    {
        "code": "PG",
        "name": "Papua New Guinea",
        "flag": `https://flagsapi.com/PG/flat/${flagSize}.png`
    },
    {
        "code": "PE",
        "name": "Peru",
        "flag": `https://flagsapi.com/PE/flat/${flagSize}.png`
    },
    {
        "code": "PK",
        "name": "Pakistan",
        "flag": `https://flagsapi.com/PK/flat/${flagSize}.png`
    },
    {
        "code": "PH",
        "name": "Philippines",
        "flag": `https://flagsapi.com/PH/flat/${flagSize}.png`
    },
    {
        "code": "PN",
        "name": "Pitcairn",
        "flag": `https://flagsapi.com/PN/flat/${flagSize}.png`
    },
    {
        "code": "PL",
        "name": "Poland",
        "flag": `https://flagsapi.com/PL/flat/${flagSize}.png`
    },
    {
        "code": "PM",
        "name": "Saint Pierre and Miquelon",
        "flag": `https://flagsapi.com/PM/flat/${flagSize}.png`
    },
    {
        "code": "ZM",
        "name": "Zambia",
        "flag": `https://flagsapi.com/ZM/flat/${flagSize}.png`
    },
    {
        "code": "EH",
        "name": "Western Sahara",
        "flag": `https://flagsapi.com/EH/flat/${flagSize}.png`
    },
    {
        "code": "EE",
        "name": "Estonia",
        "flag": `https://flagsapi.com/EE/flat/${flagSize}.png`
    },
    {
        "code": "EG",
        "name": "Egypt",
        "flag": `https://flagsapi.com/EG/flat/${flagSize}.png`
    },
    {
        "code": "ZA",
        "name": "South Africa",
        "flag": `https://flagsapi.com/ZA/flat/${flagSize}.png`
    },
    {
        "code": "EC",
        "name": "Ecuador",
        "flag": `https://flagsapi.com/EC/flat/${flagSize}.png`
    },
    {
        "code": "IT",
        "name": "Italy",
        "flag": `https://flagsapi.com/IT/flat/${flagSize}.png`
    },
    {
        "code": "VN",
        "name": "Vietnam",
        "flag": `https://flagsapi.com/VN/flat/${flagSize}.png`
    },
    {
        "code": "SB",
        "name": "Solomon Islands",
        "flag": `https://flagsapi.com/SB/flat/${flagSize}.png`
    },
    {
        "code": "ET",
        "name": "Ethiopia",
        "flag": `https://flagsapi.com/ET/flat/${flagSize}.png`
    },
    {
        "code": "SO",
        "name": "Somalia",
        "flag": `https://flagsapi.com/SO/flat/${flagSize}.png`
    },
    {
        "code": "ZW",
        "name": "Zimbabwe",
        "flag": `https://flagsapi.com/ZW/flat/${flagSize}.png`
    },
    {
        "code": "SA",
        "name": "Saudi Arabia",
        "flag": `https://flagsapi.com/SA/flat/${flagSize}.png`
    },
    {
        "code": "ES",
        "name": "Spain",
        "flag": `https://flagsapi.com/ES/flat/${flagSize}.png`
    },
    {
        "code": "ER",
        "name": "Eritrea",
        "flag": `https://flagsapi.com/ER/flat/${flagSize}.png`
    },
    {
        "code": "ME",
        "name": "Montenegro",
        "flag": `https://flagsapi.com/ME/flat/${flagSize}.png`
    },
    {
        "code": "MD",
        "name": "Moldova",
        "flag": `https://flagsapi.com/MD/flat/${flagSize}.png`
    },
    {
        "code": "MG",
        "name": "Madagascar",
        "flag": `https://flagsapi.com/MG/flat/${flagSize}.png`
    },
    {
        "code": "MF",
        "name": "Saint Martin",
        "flag": `https://flagsapi.com/MF/flat/${flagSize}.png`
    },
    {
        "code": "MA",
        "name": "Morocco",
        "flag": `https://flagsapi.com/MA/flat/${flagSize}.png`
    },
    {
        "code": "MC",
        "name": "Monaco",
        "flag": `https://flagsapi.com/MC/flat/${flagSize}.png`
    },
    {
        "code": "UZ",
        "name": "Uzbekistan",
        "flag": `https://flagsapi.com/UZ/flat/${flagSize}.png`
    },
    {
        "code": "MM",
        "name": "Myanmar",
        "flag": `https://flagsapi.com/MM/flat/${flagSize}.png`
    },
    {
        "code": "ML",
        "name": "Mali",
        "flag": `https://flagsapi.com/ML/flat/${flagSize}.png`
    },
    {
        "code": "MO",
        "name": "Macao",
        "flag": `https://flagsapi.com/MO/flat/${flagSize}.png`
    },
    {
        "code": "MN",
        "name": "Mongolia",
        "flag": `https://flagsapi.com/MN/flat/${flagSize}.png`
    },
    {
        "code": "MH",
        "name": "Marshall Islands",
        "flag": `https://flagsapi.com/MH/flat/${flagSize}.png`
    },
    {
        "code": "MK",
        "name": "Macedonia",
        "flag": `https://flagsapi.com/MK/flat/${flagSize}.png`
    },
    {
        "code": "MU",
        "name": "Mauritius",
        "flag": `https://flagsapi.com/MU/flat/${flagSize}.png`
    },
    {
        "code": "MT",
        "name": "Malta",
        "flag": `https://flagsapi.com/MT/flat/${flagSize}.png`
    },
    {
        "code": "MW",
        "name": "Malawi",
        "flag": `https://flagsapi.com/MW/flat/${flagSize}.png`
    },
    {
        "code": "MV",
        "name": "Maldives",
        "flag": `https://flagsapi.com/MV/flat/${flagSize}.png`
    },
    {
        "code": "MQ",
        "name": "Martinique",
        "flag": `https://flagsapi.com/MQ/flat/${flagSize}.png`
    },
    {
        "code": "MP",
        "name": "Northern Mariana Islands",
        "flag": `https://flagsapi.com/MP/flat/${flagSize}.png`
    },
    {
        "code": "MS",
        "name": "Montserrat",
        "flag": `https://flagsapi.com/MS/flat/${flagSize}.png`
    },
    {
        "code": "MR",
        "name": "Mauritania",
        "flag": `https://flagsapi.com/MR/flat/${flagSize}.png`
    },
    {
        "code": "IM",
        "name": "Isle of Man",
        "flag": `https://flagsapi.com/IM/flat/${flagSize}.png`
    },
    {
        "code": "UG",
        "name": "Uganda",
        "flag": `https://flagsapi.com/UG/flat/${flagSize}.png`
    },
    {
        "code": "TZ",
        "name": "Tanzania",
        "flag": `https://flagsapi.com/TZ/flat/${flagSize}.png`
    },
    {
        "code": "MY",
        "name": "Malaysia",
        "flag": `https://flagsapi.com/MY/flat/${flagSize}.png`
    },
    {
        "code": "MX",
        "name": "Mexico",
        "flag": `https://flagsapi.com/MX/flat/${flagSize}.png`
    },
    {
        "code": "IL",
        "name": "Israel",
        "flag": `https://flagsapi.com/IL/flat/${flagSize}.png`
    },
    {
        "code": "FR",
        "name": "France",
        "flag": `https://flagsapi.com/FR/flat/${flagSize}.png`
    },
    {
        "code": "IO",
        "name": "British Indian Ocean Territory",
        "flag": `https://flagsapi.com/IO/flat/${flagSize}.png`
    },
    {
        "code": "SH",
        "name": "Saint Helena",
        "flag": `https://flagsapi.com/SH/flat/${flagSize}.png`
    },
    {
        "code": "FI",
        "name": "Finland",
        "flag": `https://flagsapi.com/FI/flat/${flagSize}.png`
    },
    {
        "code": "FJ",
        "name": "Fiji",
        "flag": `https://flagsapi.com/FJ/flat/${flagSize}.png`
    },
    {
        "code": "FK",
        "name": "Falkland Islands",
        "flag": `https://flagsapi.com/FK/flat/${flagSize}.png`
    },
    {
        "code": "FM",
        "name": "Micronesia",
        "flag": `https://flagsapi.com/FM/flat/${flagSize}.png`
    },
    {
        "code": "FO",
        "name": "Faroe Islands",
        "flag": `https://flagsapi.com/FO/flat/${flagSize}.png`
    },
    {
        "code": "NI",
        "name": "Nicaragua",
        "flag": `https://flagsapi.com/NI/flat/${flagSize}.png`
    },
    {
        "code": "NL",
        "name": "Netherlands",
        "flag": `https://flagsapi.com/NL/flat/${flagSize}.png`
    },
    {
        "code": "NO",
        "name": "Norway",
        "flag": `https://flagsapi.com/NO/flat/${flagSize}.png`
    },
    {
        "code": "NA",
        "name": "Namibia",
        "flag": `https://flagsapi.com/NA/flat/${flagSize}.png`
    },
    {
        "code": "VU",
        "name": "Vanuatu",
        "flag": `https://flagsapi.com/VU/flat/${flagSize}.png`
    },
    {
        "code": "NC",
        "name": "New Caledonia",
        "flag": `https://flagsapi.com/NC/flat/${flagSize}.png`
    },
    {
        "code": "NE",
        "name": "Niger",
        "flag": `https://flagsapi.com/NE/flat/${flagSize}.png`
    },
    {
        "code": "NF",
        "name": "Norfolk Island",
        "flag": `https://flagsapi.com/NF/flat/${flagSize}.png`
    },
    {
        "code": "NG",
        "name": "Nigeria",
        "flag": `https://flagsapi.com/NG/flat/${flagSize}.png`
    },
    {
        "code": "NZ",
        "name": "New Zealand",
        "flag": `https://flagsapi.com/NZ/flat/${flagSize}.png`
    },
    {
        "code": "NP",
        "name": "Nepal",
        "flag": `https://flagsapi.com/NP/flat/${flagSize}.png`
    },
    {
        "code": "NR",
        "name": "Nauru",
        "flag": `https://flagsapi.com/NR/flat/${flagSize}.png`
    },
    {
        "code": "NU",
        "name": "Niue",
        "flag": `https://flagsapi.com/NU/flat/${flagSize}.png`
    },
    {
        "code": "CK",
        "name": "Cook Islands",
        "flag": `https://flagsapi.com/CK/flat/${flagSize}.png`
    },
    {
        "code": "XK",
        "name": "Kosovo",
        "flag": `https://flagsapi.com/XK/flat/${flagSize}.png`
    },
    {
        "code": "CI",
        "name": "Ivory Coast",
        "flag": `https://flagsapi.com/CI/flat/${flagSize}.png`
    },
    {
        "code": "CH",
        "name": "Switzerland",
        "flag": `https://flagsapi.com/CH/flat/${flagSize}.png`
    },
    {
        "code": "CO",
        "name": "Colombia",
        "flag": `https://flagsapi.com/CO/flat/${flagSize}.png`
    },
    {
        "code": "CN",
        "name": "China",
        "flag": `https://flagsapi.com/CN/flat/${flagSize}.png`
    },
    {
        "code": "CM",
        "name": "Cameroon",
        "flag": `https://flagsapi.com/CM/flat/${flagSize}.png`
    },
    {
        "code": "CL",
        "name": "Chile",
        "flag": `https://flagsapi.com/CL/flat/${flagSize}.png`
    },
    {
        "code": "CC",
        "name": "Cocos Islands",
        "flag": `https://flagsapi.com/CC/flat/${flagSize}.png`
    },
    {
        "code": "CA",
        "name": "Canada",
        "flag": `https://flagsapi.com/CA/flat/${flagSize}.png`
    },
    {
        "code": "CG",
        "name": "Republic of the Congo",
        "flag": `https://flagsapi.com/CG/flat/${flagSize}.png`
    },
    {
        "code": "CF",
        "name": "Central African Republic",
        "flag": `https://flagsapi.com/CF/flat/${flagSize}.png`
    },
    {
        "code": "CD",
        "name": "Democratic Republic of the Congo",
        "flag": `https://flagsapi.com/CD/flat/${flagSize}.png`
    },
    {
        "code": "CZ",
        "name": "Czech Republic",
        "flag": `https://flagsapi.com/CZ/flat/${flagSize}.png`
    },
    {
        "code": "CY",
        "name": "Cyprus",
        "flag": `https://flagsapi.com/CY/flat/${flagSize}.png`
    },
    {
        "code": "CX",
        "name": "Christmas Island",
        "flag": `https://flagsapi.com/CX/flat/${flagSize}.png`
    },
    {
        "code": "CR",
        "name": "Costa Rica",
        "flag": `https://flagsapi.com/CR/flat/${flagSize}.png`
    },
    {
        "code": "CW",
        "name": "Curacao",
        "flag": `https://flagsapi.com/CW/flat/${flagSize}.png`
    },
    {
        "code": "CV",
        "name": "Cape Verde",
        "flag": `https://flagsapi.com/CV/flat/${flagSize}.png`
    },
    {
        "code": "CU",
        "name": "Cuba",
        "flag": `https://flagsapi.com/CU/flat/${flagSize}.png`
    },
    {
        "code": "SZ",
        "name": "Swaziland",
        "flag": `https://flagsapi.com/SZ/flat/${flagSize}.png`
    },
    {
        "code": "SY",
        "name": "Syria",
        "flag": `https://flagsapi.com/SY/flat/${flagSize}.png`
    },
    {
        "code": "SX",
        "name": "Sint Maarten",
        "flag": `https://flagsapi.com/SX/flat/${flagSize}.png`
    },
    {
        "code": "KG",
        "name": "Kyrgyzstan",
        "flag": `https://flagsapi.com/KG/flat/${flagSize}.png`
    },
    {
        "code": "KE",
        "name": "Kenya",
        "flag": `https://flagsapi.com/KE/flat/${flagSize}.png`
    },
    {
        "code": "SS",
        "name": "South Sudan",
        "flag": `https://flagsapi.com/SS/flat/${flagSize}.png`
    },
    {
        "code": "SR",
        "name": "Suriname",
        "flag": `https://flagsapi.com/SR/flat/${flagSize}.png`
    },
    {
        "code": "KI",
        "name": "Kiribati",
        "flag": `https://flagsapi.com/KI/flat/${flagSize}.png`
    },
    {
        "code": "KH",
        "name": "Cambodia",
        "flag": `https://flagsapi.com/KH/flat/${flagSize}.png`
    },
    {
        "code": "KN",
        "name": "Saint Kitts and Nevis",
        "flag": `https://flagsapi.com/KN/flat/${flagSize}.png`
    },
    {
        "code": "KM",
        "name": "Comoros",
        "flag": `https://flagsapi.com/KM/flat/${flagSize}.png`
    },
    {
        "code": "ST",
        "name": "Sao Tome and Principe",
        "flag": `https://flagsapi.com/ST/flat/${flagSize}.png`
    },
    {
        "code": "SK",
        "name": "Slovakia",
        "flag": `https://flagsapi.com/SK/flat/${flagSize}.png`
    },
    {
        "code": "KR",
        "name": "South Korea",
        "flag": `https://flagsapi.com/KR/flat/${flagSize}.png`
    },
    {
        "code": "SI",
        "name": "Slovenia",
        "flag": `https://flagsapi.com/SI/flat/${flagSize}.png`
    },
    {
        "code": "KP",
        "name": "North Korea",
        "flag": `https://flagsapi.com/KP/flat/${flagSize}.png`
    },
    {
        "code": "KW",
        "name": "Kuwait",
        "flag": `https://flagsapi.com/KW/flat/${flagSize}.png`
    },
    {
        "code": "SN",
        "name": "Senegal",
        "flag": `https://flagsapi.com/SN/flat/${flagSize}.png`
    },
    {
        "code": "SM",
        "name": "San Marino",
        "flag": `https://flagsapi.com/SM/flat/${flagSize}.png`
    },
    {
        "code": "SL",
        "name": "Sierra Leone",
        "flag": `https://flagsapi.com/SL/flat/${flagSize}.png`
    },
    {
        "code": "SC",
        "name": "Seychelles",
        "flag": `https://flagsapi.com/SC/flat/${flagSize}.png`
    },
    {
        "code": "KZ",
        "name": "Kazakhstan",
        "flag": `https://flagsapi.com/KZ/flat/${flagSize}.png`
    },
    {
        "code": "KY",
        "name": "Cayman Islands",
        "flag": `https://flagsapi.com/KY/flat/${flagSize}.png`
    },
    {
        "code": "SG",
        "name": "Singapore",
        "flag": `https://flagsapi.com/SG/flat/${flagSize}.png`
    },
    {
        "code": "SE",
        "name": "Sweden",
        "flag": `https://flagsapi.com/SE/flat/${flagSize}.png`
    },
    {
        "code": "SD",
        "name": "Sudan",
        "flag": `https://flagsapi.com/SD/flat/${flagSize}.png`
    },
    {
        "code": "DO",
        "name": "Dominican Republic",
        "flag": `https://flagsapi.com/DO/flat/${flagSize}.png`
    },
    {
        "code": "DM",
        "name": "Dominica",
        "flag": `https://flagsapi.com/DM/flat/${flagSize}.png`
    },
    {
        "code": "DJ",
        "name": "Djibouti",
        "flag": `https://flagsapi.com/DJ/flat/${flagSize}.png`
    },
    {
        "code": "DK",
        "name": "Denmark",
        "flag": `https://flagsapi.com/DK/flat/${flagSize}.png`
    },
    {
        "code": "VG",
        "name": "British Virgin Islands",
        "flag": `https://flagsapi.com/VG/flat/${flagSize}.png`
    },
    {
        "code": "DE",
        "name": "Germany",
        "flag": `https://flagsapi.com/DE/flat/${flagSize}.png`
    },
    {
        "code": "YE",
        "name": "Yemen",
        "flag": `https://flagsapi.com/YE/flat/${flagSize}.png`
    },
    {
        "code": "DZ",
        "name": "Algeria",
        "flag": `https://flagsapi.com/DZ/flat/${flagSize}.png`
    },
    {
        "code": "US",
        "name": "USA",
        "flag": `https://flagsapi.com/US/flat/${flagSize}.png`
    },
    {
        "code": "US",
        "name": "United States",
        "flag": `https://flagsapi.com/US/flat/${flagSize}.png`
    },
    {
        "code": "UY",
        "name": "Uruguay",
        "flag": `https://flagsapi.com/UY/flat/${flagSize}.png`
    },
    {
        "code": "YT",
        "name": "Mayotte",
        "flag": `https://flagsapi.com/YT/flat/${flagSize}.png`
    },
    {
        "code": "UM",
        "name": "United States Minor Outlying Islands",
        "flag": `https://flagsapi.com/UM/flat/${flagSize}.png`
    },
    {
        "code": "LB",
        "name": "Lebanon",
        "flag": `https://flagsapi.com/LB/flat/${flagSize}.png`
    },
    {
        "code": "LC",
        "name": "Saint Lucia",
        "flag": `https://flagsapi.com/LC/flat/${flagSize}.png`
    },
    {
        "code": "LA",
        "name": "Laos",
        "flag": `https://flagsapi.com/LA/flat/${flagSize}.png`
    },
    {
        "code": "TV",
        "name": "Tuvalu",
        "flag": `https://flagsapi.com/TV/flat/${flagSize}.png`
    },
    {
        "code": "TW",
        "name": "Taiwan",
        "flag": `https://flagsapi.com/TW/flat/${flagSize}.png`
    },
    {
        "code": "TT",
        "name": "Trinidad and Tobago",
        "flag": `https://flagsapi.com/TT/flat/${flagSize}.png`
    },
    {
        "code": "TR",
        "name": "Turkey",
        "flag": `https://flagsapi.com/TR/flat/${flagSize}.png`
    },
    {
        "code": "LK",
        "name": "Sri Lanka",
        "flag": `https://flagsapi.com/LK/flat/${flagSize}.png`
    },
    {
        "code": "LI",
        "name": "Liechtenstein",
        "flag": `https://flagsapi.com/LI/flat/${flagSize}.png`
    },
    {
        "code": "LV",
        "name": "Latvia",
        "flag": `https://flagsapi.com/LV/flat/${flagSize}.png`
    },
    {
        "code": "TO",
        "name": "Tonga",
        "flag": `https://flagsapi.com/TO/flat/${flagSize}.png`
    },
    {
        "code": "LT",
        "name": "Lithuania",
        "flag": `https://flagsapi.com/LT/flat/${flagSize}.png`
    },
    {
        "code": "LU",
        "name": "Luxembourg",
        "flag": `https://flagsapi.com/LU/flat/${flagSize}.png`
    },
    {
        "code": "LR",
        "name": "Liberia",
        "flag": `https://flagsapi.com/LR/flat/${flagSize}.png`
    },
    {
        "code": "LS",
        "name": "Lesotho",
        "flag": `https://flagsapi.com/LS/flat/${flagSize}.png`
    },
    {
        "code": "TH",
        "name": "Thailand",
        "flag": `https://flagsapi.com/TH/flat/${flagSize}.png`
    },
    {
        "code": "TF",
        "name": "French Southern Territories",
        "flag": `https://flagsapi.com/TF/flat/${flagSize}.png`
    },
    {
        "code": "TG",
        "name": "Togo",
        "flag": `https://flagsapi.com/TG/flat/${flagSize}.png`
    },
    {
        "code": "TD",
        "name": "Chad",
        "flag": `https://flagsapi.com/TD/flat/${flagSize}.png`
    },
    {
        "code": "TC",
        "name": "Turks and Caicos Islands",
        "flag": `https://flagsapi.com/TC/flat/${flagSize}.png`
    },
    {
        "code": "LY",
        "name": "Libya",
        "flag": `https://flagsapi.com/LY/flat/${flagSize}.png`
    },
    {
        "code": "VA",
        "name": "Vatican",
        "flag": `https://flagsapi.com/VA/flat/${flagSize}.png`
    },
    {
        "code": "VC",
        "name": "Saint Vincent and the Grenadines",
        "flag": `https://flagsapi.com/VC/flat/${flagSize}.png`
    },
    {
        "code": "AE",
        "name": "United Arab Emirates",
        "flag": `https://flagsapi.com/AE/flat/${flagSize}.png`
    },
    {
        "code": "AD",
        "name": "Andorra",
        "flag": `https://flagsapi.com/AD/flat/${flagSize}.png`
    },
    {
        "code": "AG",
        "name": "Antigua and Barbuda",
        "flag": `https://flagsapi.com/AG/flat/${flagSize}.png`
    },
    {
        "code": "AF",
        "name": "Afghanistan",
        "flag": `https://flagsapi.com/AF/flat/${flagSize}.png`
    },
    {
        "code": "AI",
        "name": "Anguilla",
        "flag": `https://flagsapi.com/AI/flat/${flagSize}.png`
    },
    {
        "code": "VI",
        "name": "U.S. Virgin Islands",
        "flag": `https://flagsapi.com/VI/flat/${flagSize}.png`
    },
    {
        "code": "IS",
        "name": "Iceland",
        "flag": `https://flagsapi.com/IS/flat/${flagSize}.png`
    },
    {
        "code": "IR",
        "name": "Iran",
        "flag": `https://flagsapi.com/IR/flat/${flagSize}.png`
    },
    {
        "code": "AM",
        "name": "Armenia",
        "flag": `https://flagsapi.com/AM/flat/${flagSize}.png`
    },
    {
        "code": "AL",
        "name": "Albania",
        "flag": `https://flagsapi.com/AL/flat/${flagSize}.png`
    },
    {
        "code": "AO",
        "name": "Angola",
        "flag": `https://flagsapi.com/AO/flat/${flagSize}.png`
    },
    {
        "code": "AQ",
        "name": "Antarctica",
        "flag": `https://flagsapi.com/AQ/flat/${flagSize}.png`
    },
    {
        "code": "AS",
        "name": "American Samoa",
        "flag": `https://flagsapi.com/AS/flat/${flagSize}.png`
    },
    {
        "code": "AR",
        "name": "Argentina",
        "flag": `https://flagsapi.com/AR/flat/${flagSize}.png`
    },
    {
        "code": "AU",
        "name": "Australia",
        "flag": `https://flagsapi.com/AU/flat/${flagSize}.png`
    },
    {
        "code": "AT",
        "name": "Austria",
        "flag": `https://flagsapi.com/AT/flat/${flagSize}.png`
    },
    {
        "code": "AW",
        "name": "Aruba",
        "flag": `https://flagsapi.com/AW/flat/${flagSize}.png`
    },
    {
        "code": "IN",
        "name": "India",
        "flag": `https://flagsapi.com/IN/flat/${flagSize}.png`
    },
    {
        "code": "AX",
        "name": "Aland Islands",
        "flag": `https://flagsapi.com/AX/flat/${flagSize}.png`
    },
    {
        "code": "AZ",
        "name": "Azerbaijan",
        "flag": `https://flagsapi.com/AZ/flat/${flagSize}.png`
    },
    {
        "code": "IE",
        "name": "Ireland",
        "flag": `https://flagsapi.com/IE/flat/${flagSize}.png`
    },
    {
        "code": "ID",
        "name": "Indonesia",
        "flag": `https://flagsapi.com/ID/flat/${flagSize}.png`
    },
    {
        "code": "UA",
        "name": "Ukraine",
        "flag": `https://flagsapi.com/UA/flat/${flagSize}.png`
    },
    {
        "code": "QA",
        "name": "Qatar",
        "flag": `https://flagsapi.com/QA/flat/${flagSize}.png`
    },
    {
        "code": "MZ",
        "name": "Mozambique",
        "flag": `https://flagsapi.com/MZ/flat/${flagSize}.png`
    }
];
