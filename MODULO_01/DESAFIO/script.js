window.addEventListener('load', start);

var userList;
var filteredList;
var stats = {
  cntMale: 0,
  cntFemale: 0,
  AgeSum: 0,
  AgeAvg: 0
}

function start() {
  loadUsersIntoVar()
}

async function loadUsersIntoVar() {

  let res = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo")

  let data = await res.json()

  userList = data.results.map(user => {
    return {
      name: user.name.first + " " + user.name.last,
      picture: user.picture.thumbnail,
      age: user.dob.age,
      gender: user.gender
    }
  })
}


function calculateStats() {
  stats.cntMale = filteredList.reduce((accumulator, current) => {
    return accumulator + (current.gender === "male" ? 1 : 0)
  }, 0)

  stats.cntFemale = filteredList.reduce((accumulator, current) => {
    return accumulator + (current.gender === "female" ? 1 : 0)
  }, 0)

  stats.AgeSum = filteredList.reduce((accumulator, current) => {
    return accumulator + current.age
  }, 0)

  stats.AgeAvg = Number((stats.AgeSum / filteredList.length).toFixed(2))

}

function filterUsers(name) {

  filteredList = userList.filter(user => {
    return user.name.toLowerCase().includes(name.toLowerCase())
  })

  calculateStats()
}