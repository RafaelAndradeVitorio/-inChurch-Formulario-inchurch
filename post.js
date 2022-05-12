
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

const fields1 = document.querySelectorAll('.etp1[required]')
const fields2 = document.querySelectorAll('.etp2[required]')
const fields3 = document.querySelectorAll('.etp3[required]')

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


function enviaForm() {
    let url = "https://reqres.in/api/users"
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

// reload na mensagem de sucesso

msgSucesso.addEventListener("click", event =>{
    location.reload()
})


// Consulta de CEP e validação do CNPJ

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

CNPJInput.addEventListener("keyup", e => {
    CNPJInput.value = CNPJInput.value.replace(".", "")
    CNPJInput.value = CNPJInput.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
})

function skip2() {
    var camposInvalidos = 0
    for (var c of fields1) {

        if (!c.checkValidity() || !nomeInput.value.includes(" ")) {
            document.querySelector('.etapa1 p').style.display = 'block'
            camposInvalidos = camposInvalidos + 1
        }
    }
    if (camposInvalidos === 0) {
        console.log(camposInvalidos)
        document.getElementById('step1').style.display = "none";
        document.getElementById('step2').style.display = "flex";
        document.querySelector('.etapa1 p').style.display = "none";
    }
}

function skip3() {
    for (const c of fields2) {
        var camposInvalidos = 0
        if (!c.checkValidity() || document.querySelector("#cep").value.length > 9) {
            document.querySelector('.etapa1 p').style.display = 'block'
            camposInvalidos = camposInvalidos + 1
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

    for (const c of fields3) {
        var camposInvalidos = 0

        if (!c.checkValidity() || document.querySelector("#CustomFieldsCompanyCNPJ").value.length < 16) {
            document.querySelector('.etapa3 p').style.display = 'block'
            camposInvalidos = camposInvalidos + 1
        }

    } if (camposInvalidos === 0) {
        document.querySelector('.etapa3 p').style.display = 'none'
        enviaForm()
    }
})