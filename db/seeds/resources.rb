Resource.delete_all

Event.find_by_name('War of the Roses').resources << [
  Resource.create({
    name: 'A Song of Ice and Fire',
    summary: 'A story of fiction inspired by The War of the Roses',
    source_url: 'http://www.amazon.com/gp/product/0345535529/ref=pd_lpo_sbs_dp_ss_1?pf_rd_p=1944687602&pf_rd_s=lpo-top-stripe-1&pf_rd_t=201&pf_rd_i=0307292134&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=0VTZC2WVPXENKWD4PTXD'
  }),
  Resource.create({
    name: 'The War of the Roses: The Fall of the Plantagenets and the Rise of the Tudors',
    summary: 'A historical account of the War of the Roses',
    source_url: 'http://www.amazon.com/Wars-Roses-Fall-Plantagenets-Tudors/dp/0143127888/ref=sr_1_2?ie=UTF8&qid=1443022681&sr=8-2&keywords=war+of+the+roses' 
  })
]

Event.find_by_name('The Renaissance').resources << [
  Resource.create({
    name: 'The Renaissance: A Short History',
    summary: 'An explanation of the economic, technological and social developments during the Renaissance',
    source_url: 'http://www.amazon.com/The-Renaissance-History-Library-Chronicles/dp/0812966198'
  }),
  Resource.create({
    name: 'Medici: Godfathers of the Renaissance',
    summary: 'A PBS documentary about the Medici family and their connection to the Renaissance',
    source_url: 'http://www.imdb.com/title/tt0392433/'
  })
]

Event.find_by_name('The Age of Discovery').resources << [
  Resource.create({
    name: 'The Globe Encompassed: The Age of European Discovery',
    summary: 'An introduction to European explorers',
    source_url: 'http://www.amazon.com/Globe-Encompassed-European-Discovery-1500/dp/0131933884/ref=sr_1_6?ie=UTF8&qid=1443023268&sr=8-6&keywords=age+of+discovery'
  }),
  Resource.create({
    name: 'Conquistadors',
    summary: 'A PBS documentary on the spanish explorers and their conquests of the Americas',
    source_url: 'http://www.imdb.com/title/tt0291114/' 
  })
]

Event.find_by_name('World War I').resources << [
  Resource.create({
    name: 'The Guns of August',
    summary: 'Accounts of the first month of the first world war',
    source_url: 'http://www.amazon.com/Guns-August-Pulitzer-Prize-Winning-Outbreak/dp/0345476093/ref=sr_1_1?s=books&ie=UTF8&qid=1443023897&sr=1-1&keywords=wwi' 
  })
]

Event.find_by_name('World War II').resources << [
  Resource.create({
    name: 'Code Talker',
    summary: 'The First and Only Memoir By One of the Original Navajo Code Talkers of WWII',
    source_url: 'http://www.amazon.com/Code-Talker-Memoir-Original-Talkers/dp/0425244237/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1443024061&sr=1-2' 
  }),
  Resource.create({
    name: 'Band of Brothers',
    summary: 'An HBO miniseries about a company serving in World War II',
    source_url: 'http://www.imdb.com/title/tt0185906/'
  })
]
