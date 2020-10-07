const array = [1,'2','3',4,5,6];



function p4() {
  let interval = null
  let i = 0
  let array =[]

  interval = setInterval(() => {
    array.push(i++)

    if (i === 5) {
      clearInterval(interval)
      console.log(array)
    }
  }, 1000)
}

p4()