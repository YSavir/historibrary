Event.delete_all

Event.create([
  {
    name: 'War of the Roses',
    summary: 'An English Civil War',
    start_date: '5/22/1455',
    end_date: '1/1/1487'
  },
  {
    name: 'World War I',
    summary: 'World War I',
    start_date: '7/28/1914',
    end_date: '11/11/1918'
  },
  {
    name: 'World War II',
    summary: 'World War II',
    start_date: '9/1/1939',
    end_date: '9/2/1945'
  },
  # {
    # name: 'Alexander the Great',
    # summary: 'Alexander the Great conquered Persia, bringing Greek culture to the known world',
    # start_date: '7/20/-356',
    # end_date: '6/10/-323'
  # },
  # {
    # name: 'The First Punic War',
    # summary: 'The first conflict between Ancient Rome and Carthage',
    # start_date: '1/1/-264',
    # end_date: '1/1/-241'
  # },
  {
    name: 'The Renaissance',
    summary: 'A period of cultural and intellectual growth in Europse',
    start_date: '1/1/1300',
    end_date: '1/1/1700'
  },
  {
    name: 'The Age of Discovery',
    summary: 'A period of European global exploration',
    start_date: '1/1/1419',
    end_date: '1/1/1778'
  }
])
