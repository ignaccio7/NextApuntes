
export function sleep(t:number  = 1) {
  return new Promise((resolve) => {
    setTimeout(()=> {
      resolve(true)
    },t*1000)
  })
}