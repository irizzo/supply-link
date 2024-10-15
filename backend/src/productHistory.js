function productHistory(tokens, tokenId) {
  const relatedProcesses = tokens
    .filter((token) => {
      token.outs.includes(tokenId)
    })
  const processInputs = relatedProcesses.map((process) => {
    return process.entries
  })
}

function compareTokenByDate(a, b) {
  let _a_date = Date.parse(a.date)
  let _b_date = Date.parse(b.date)

  let _year  = Number(_a_date.getFullYear()) - Number(_b_date.getFullYear())
  let _month = Number(_a_date.getMonth()) - Number(_b_date.getMonth())
  let _day   = Number(_a_date.getDate()) - Number(_b_date.getDate())
  let _hours = Number(_a_date.getHours()) - Number(_b_date.getHours())
  let _time  = Number(_a_date.getMinutes()) - Number(_b_date.getMinutes())

  if      (_year  > 0) return  1
  else if (_year  < 0) return -1
  else if (_month > 0) return  1
  else if (_month < 0) return -1
  else if (_day   > 0) return  1
  else if (_day   < 0) return -1
  else if (_hours > 0) return  1
  else if (_hours < 0) return -1
  else if (_time  > 0) return  1
  else if (_time  < 0) return -1
  else return 0
}

