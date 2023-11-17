const key = 'ac8525e58d05cd4d26f11ebb4dae33d7'

function cliqueiNoBotao(value) {
   const cidade = document.querySelector('.input-cidade').value
   buscarCidade(cidade)
}

async function buscarCidade(cidade)
{
   const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())
   colocarDadosNaTela(dados)
}

function colocarDadosNaTela(dados)
{
   console.log(dados)
   if (dados.message == 'city not found')
   {
      document.querySelector('.cidade').innerHTML = 'CIDADE INVÁLIDA!'
      document.querySelector('.input-cidade').value = ''
      document.querySelector('.input-cidade').innerHTML = ''
      document.querySelector('.cidade').classList.add('error')
      document.querySelector('.img-previsao').classList.add('patternImg')
      document.querySelector('.temperatura').innerHTML = '[temperatura]'
      document.querySelector('.texto-previsao').innerHTML = '[descrição]'
      document.querySelector('.umidade').innerHTML = 'Umidade: 0%'
      document.querySelector('.img-previsao').src = 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png'
      return
   }
   document.querySelector('.img-previsao').classList.remove('patternImg')
   document.querySelector('.cidade').classList.remove('error')
   document.querySelector('.cidade').innerHTML = `Tempo em ${dados.name}, ${dados.sys.country}`
   document.querySelector('.temperatura').innerHTML = Math.floor(dados.main.temp) + "°C"
   document.querySelector('.texto-previsao').innerHTML = (dados.weather[0].description)
   document.querySelector('.umidade').innerHTML = "Umidade: " + dados.main.humidity + "%"
   document.querySelector('.img-previsao').src = 'https://openweathermap.org/img/wn/' + dados.weather[0].icon + '.png'
}