console.log("a test")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent= ''
            }else{
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
    })
})