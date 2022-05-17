
const nomeInput = document.querySelector("#Name")
const emailInput = document.querySelector("#Email")
const CMInput = document.querySelector("#CompanyName")
const CFInput = document.querySelector("#CustomFieldsCompanyRazaoSocial")

const cidadeInput = document.querySelector("#localidade")
const estadoInput = document.querySelector("#uf")
const CEPInput = document.querySelector("#cep")
const bairroInput = document.querySelector("#bairro")
const logradouroInput = document.querySelector("#logradouro")
const numeroInput = document.querySelector("#CompanyAddress2")
const complementoInput = document.querySelector("#complemento")

const CNPJInput = document.querySelector("#CustomFieldsCompanyCNPJ")
const RFIput = document.querySelector("#CustomFieldsCompanyUsuárioGranito")
const ERFInput = document.querySelector("#CustomFieldsCompanyEmailResponsávelGranito")
const TRFInput = document.querySelector("#CustomFieldsCompanyTelefoneResponsávelGranito")
const solucao1Input = document.querySelector("#CustomFieldsCompanyPrimeiraSolucao")
const solucao2Input = document.querySelector("#CustomFieldsCompanySegundaSolucao")
const solucao3Input = document.querySelector("#CustomFieldsCompanyTerceiraSolucao")

const passar1 = document.querySelector(".skip2")
const passar2 = document.querySelector(".skip3")

const fields2 = document.querySelectorAll('.etp2[required]')
const fields3 = document.querySelectorAll('.etp3[required]')
console.log(fields3)
const fields1 = document.querySelectorAll('.etp1[required]')

const fields = document.querySelectorAll('select')
console.log(fields)

const msgSucesso = document.querySelector('.sombra')


// Função enviar

function post(url, dados) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dados)
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            document.querySelector('.sombra').style.display = 'block'
            return
        })

    
}


function enviaFormPipz() {
    let url = "https://app.pipz.io/webhook/1624.146.8d5eb"
    dados = {
        'Name': nomeInput.value,
        'Email': emailInput.value,
        'CompanyName': CMInput.value,
        'Custom Fields Company Razao Social': CFInput.value,
        'Company City Name': cidadeInput.value,
        'Company State': estadoInput.value,
        'Company Postal Code': CEPInput.value,
        'Company Region Name': bairroInput.value,
        'Company Address1': logradouroInput.value,
        'Company Address2': numeroInput.value,
        'Custom Fields Company Complemento': complementoInput.value,
        'Custom Fields Company CNPJ': CNPJInput.value,
        'Custom Fields Company Usuário Granito': RFIput.value,
        'Custom Fields Company Email Responsável Granito': ERFInput.value,
        'Custom Fields Company Telefone Responsável Granito': TRFInput.value,
        'Custom Fields Company Primeira Solucao': solucao1Input.value,
        'Custom Fields Company Segunda Solucao': solucao2Input.value,
        'Custom Fields Company Terceira Solucao': solucao3Input.value
    }
    console.log(dados)
    post(url, dados)
}

function enviaFormAutomate() {
    let url = "https://wh.automate.io/webhook/62828d043b431f416883be30"
    dados = {
        'Name': nomeInput.value,
        'Email': emailInput.value,
        'CompanyName': CMInput.value,
        'Custom Fields Company Razao Social': CFInput.value,
        'Company City Name': cidadeInput.value,
        'Company State': estadoInput.value,
        'Company Postal Code': CEPInput.value,
        'Company Region Name': bairroInput.value,
        'Company Address1': logradouroInput.value,
        'Company Address2': numeroInput.value,
        'Custom Fields Company Complemento': complementoInput.value,
        'Custom Fields Company CNPJ': CNPJInput.value,
        'Custom Fields Company Usuário Granito': RFIput.value,
        'Custom Fields Company Email Responsável Granito': ERFInput.value,
        'Custom Fields Company Telefone Responsável Granito': TRFInput.value,
        'Custom Fields Company Primeira Solucao': document.querySelector('select').value,
        'Custom Fields Company Segunda Solucao': solucao2Input.value,
        'Custom Fields Company Terceira Solucao': solucao3Input.value
    }
    console.log(dados)
    post(url, dados)
}

function enviaForm() {
    let url = "https://reqres.in/api/users"
    dados = {
        'Name': nomeInput.value,
        'Email': emailInput.value,
        'CompanyName': `${CMInput.value} - ${bairroInput.value}`,
        'Custom Fields Company Razao Social': CFInput.value,
        'Company City Name': cidadeInput.value,
        'Company State': estadoInput.value,
        'Company Postal Code': CEPInput.value,
        'Company Region Name': bairroInput.value,
        'Company Address1': logradouroInput.value,
        'Company Address2': numeroInput.value,
        'Custom Fields Company Complemento': complementoInput.value,
        'Custom Fields Company CNPJ': CNPJInput.value,
        'Custom Fields Company Usuário Granito': RFIput.value,
        'Custom Fields Company Email Responsável Granito': ERFInput.value,
        'Custom Fields Company Telefone Responsável Granito': TRFInput.value,
        'Custom Fields Company Primeira Solucao': solucao1Input.value,
        'Custom Fields Company Segunda Solucao': solucao2Input.value,
        'Custom Fields Company Terceira Solucao': solucao3Input.value
    }
    console.log(dados)
    post(url, dados)
}

// reload na mensagem de sucesso

msgSucesso.addEventListener("click", event => {
    location.reload()
})


// Consulta de CEP e validações

const showData = (result) => {
    for (const campo in result) {
        if (document.querySelector("#" + campo)) {
            document.querySelector("#" + campo).value = result[campo]
        }
    }
}

CEPInput.addEventListener("keyup", (e) => {
    let search = CEPInput.value.replace("-", "")
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then((response) => {
            response.json()
                .then(data => showData(data))
        })
        .catch(e => console.log('Deu erro'))

    console.log(CEPInput.value)
})

emailInput.addEventListener("blur", () => {
    console.log(emailInput.checkValidity())
    if (!emailInput.checkValidity()) {
        emailInput.style.border = "1px solid red"
        emailInput.style.focus = 'red'
    } else {
        emailInput.style.border = "1px solid black"
    }
})

CNPJInput.addEventListener('keypress', () =>{
   cnpjTamanho = CNPJInput.value.length

   if (cnpjTamanho === 2 || cnpjTamanho === 6){
       CNPJInput.value += '.'
   } else if ( cnpjTamanho === 10){
    CNPJInput.value += '/'
   } else if ( cnpjTamanho === 15){
    CNPJInput.value += '-'
   }
})

for (let campo of fields1) {
    campo.addEventListener("blur", () => {
        console.log(campo.checkValidity())
        if (!campo.checkValidity()) {
            campo.style.border = "1px solid red"
            campo.style.focus = 'red'
        } else {
            campo.style.border = "1px solid black"
        }
    })
}
for (let campo of fields2) {
    campo.addEventListener("blur", () => {
        console.log(campo.checkValidity())
        if (!campo.checkValidity()) {
            campo.style.border = "1px solid red"
            campo.style.focus = 'red'
        } else {
            campo.style.border = "1px solid black"
        }
    })
}
for (let campo of fields3) {
    campo.addEventListener("blur", () => {
        console.log(campo.checkValidity())
        if (!campo.checkValidity()) {
            campo.style.border = "1px solid red"
            campo.style.focus = 'red'
        } else {
            campo.style.border = "1px solid black"
        }
    })
}

function checarValidade(nome) {
    var validade = true
    if (nome.checkValidity() && nome.value.includes(" ")) {
        return validade = true
    } else {
        return validade = false
    }
}
nomeInput.addEventListener("blur", () => {
    if (checarValidade(nomeInput) === false) {
        nomeInput.style.border = "1px solid red"
        nomeInput.style.focus = 'red'
    } else {
        nomeInput.style.border = "1px solid black"
        document.querySelector('.etapa1 p').style.display = 'none'
    }
})

RFIput.addEventListener("blur", () => {
    if (checarValidade(RFIput) === false) {
        RFIput.style.border = "1px solid red"
        RFIput.style.focus = 'red'
    } else {
        RFIput.style.border = "1px solid black"
        document.querySelector('.etapa3 p').style.display = 'none'
    }
})

TRFInput.addEventListener("blur", () => {
    if (TRFInput.value.length !== 15) {
        TRFInput.style.border = "1px solid red"
    } else {
        TRFInput.style.border = "1px solid black"
        document.querySelector('.etapa3 p').style.display = 'none'
    }
})

//funções dos botões

function skip2() {
    var camposInvalidos = 0

    checarValidade(nomeInput)
    console.log(`Resultado checar validade ${checarValidade(nomeInput)}`)

    console.log(`O número de campos invalidos é ${camposInvalidos}`)

    for (var c of fields1) {
        if (!c.checkValidity()) {
            c.style.border = "1px solid red"
            document.querySelector('.etapa1 p').style.display = 'block'
            camposInvalidos = camposInvalidos + 1
        } else {
            c.style.border = "1px solid black"
        }
    }

    if (checarValidade(nomeInput) === false) {
        nomeInput.style.border = "1px solid red"
        document.querySelector('.etapa1 p').style.display = 'block'
        camposInvalidos = camposInvalidos + 1
    } else {
        nomeInput.style.border = "1px solid black"
    }

    if (camposInvalidos === 0) {
        console.log(camposInvalidos)
        document.getElementById('step1').style.display = "none";
        document.getElementById('step2').style.display = "flex";
        document.querySelector('.etapa1 p').style.display = "none";
    }
}

function skip3() {

    var camposInvalidos = 0

    for (var c of fields2) {
        if (!c.checkValidity()) {
            c.style.border = "1px solid red"
            document.querySelector('.etapa2 p').style.display = 'block'
            camposInvalidos = camposInvalidos + 1
        } else {
            c.style.border = "1px solid black"
        }
    } if (camposInvalidos === 0) {
        document.getElementById('step2').style.display = "none";
        document.getElementById('step3').style.display = "flex";
        document.querySelector('.etapa2 p').style.display = 'none';
    }
}

// Botões  de voltar
function back1() {
    document.getElementById('step2').style.display = "none";
    document.getElementById('step1').style.display = "flex";
    document.querySelector('.etapa1 p').style.display = "none"
}
function back2() {
    document.getElementById('step3').style.display = "none";
    document.getElementById('step2').style.display = "flex";
}

// Evento submit

const submitButton = document.querySelector('#btn-enviar')

submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var camposInvalidos = 0
    checarValidade(RFIput)
    console.log(checarValidade(RFIput))

    for (const c of fields3) {
        if (!c.checkValidity()) {
            document.querySelector('.etapa3 p').style.display = 'block'
            c.style.border = "1px solid red"
            camposInvalidos = camposInvalidos + 1
        } else {
            c.style.border = "1px solid black"
        }
        console.log(c)
    } 

    if (checarValidade(RFIput) === false) {
        RFIput.style.border = "1px solid red"
        document.querySelector('.etapa3 p').style.display = 'block'
        camposInvalidos = camposInvalidos + 1
    }

    if (TRFInput.value.length !== 15){
        TRFInput.style.border = "1px solid red"
        document.querySelector('.etapa3 p').style.display = 'block'
        camposInvalidos = camposInvalidos + 1
    }

    if (camposInvalidos === 0) {
        RFIput.style.border = "1px solid black"
        document.querySelector('.etapa3 p').style.display = 'none'
        // enviaFormAutomate()
        // enviaFormPipz()
        enviaForm()
    }
}) 