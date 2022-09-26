function createEmployeeRecord([firstName, familyName, title, payPerHour,]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}
function createEmployeeRecords(records) {
  const recordObjects = records.map(createEmployeeRecord)
  return recordObjects
}

function createTimeInEvent(record, date) {
  const timeRecord =  {
    type: 'TimeIn',
    hour: parseInt(date.slice(11,15)),
    date: date.slice(0,10)
  }
  record.timeInEvents.push(timeRecord)
  return record
}

function createTimeOutEvent(record, date) {

const timeRecord =  {
  type: 'TimeOut',
  hour: parseInt(date.slice(11,15)),
  date: date.slice(0,10)
}
record.timeOutEvents.push(timeRecord)
return record
}

function hoursWorkedOnDate(record,date){
  const startHour = record.timeInEvents.find(value => {
    return value.date === date
  }).hour
const endHour = record.timeOutEvents.find(value => {
  return value.date === date
}).hour
return Math.ceil(endHour - startHour)/100
}

function wagesEarnedOnDate(record, date) {
  const hoursWorked = hoursWorkedOnDate(record, date)
  const {payPerHour} = record
  return payPerHour*hoursWorked
}

function allWagesFor(record) {
  let wagesEarned = 0
for(let i = 0; i < record.timeInEvents.length; i++){
  wagesEarned += wagesEarnedOnDate(record, record.timeInEvents[i].date)
}
return wagesEarned
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(record => {
    return record.firstName === firstName
  })
}

function calculatePayroll(array) {
  let totalWages = 0 
  array.forEach(record => {
    totalWages += allWagesFor(record)
  });
  return totalWages
}