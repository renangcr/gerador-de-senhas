// Seleção de elementos
const generatePasswordBtn = document.querySelector("#generate-password");
const generatedPassword = document.querySelector("#generated-password");

const openCloseGenerateButton = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordBtn = document.querySelector("#copy-password");
const generatedPasswordButton = document.querySelector("#generate-password-btn");

// Funções
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbols = "@_-$#";

    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
) => {
    
    const passwordLength = +lengthInput.value;
    let password = "";

    const generators = [];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }

    if(numbersInput.checked){
        generators.push(getNumber);
    }

    if(symbolsInput.checked){
        generators.push(getSymbol);
    }

    if(generators.length === 0) return;

    for (let i = 0; i < passwordLength; i++) {
        const randomValue =
            generators[Math.floor(Math.random() * generators.length)]();
        password += `${randomValue}`;
    }

    generatedPassword.style.display = "block";
    generatedPassword.querySelector("h4").innerText = password;
};

// Eventos
generatedPasswordButton.addEventListener("click", () => {
    generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    );
});

generatePasswordBtn.addEventListener('click', () => {
    openCloseGenerateButton.classList.toggle('hide');
})

copyPasswordBtn.addEventListener('click', (e) => {
    const password = generatedPassword.querySelector('h4').innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordBtn.innerText = 'Copiada';
        copyPasswordBtn.style.color = '#81d340';
        copyPasswordBtn.style.borderColor = '#81d340';

        setTimeout(() => {
            copyPasswordBtn.innerText = 'Copiar';
            copyPasswordBtn.style.color = '#0097ff';
            copyPasswordBtn.style.borderColor = '#0097ff';
        },1000)
    })
})