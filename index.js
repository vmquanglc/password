const listPassword = [
  {
    app: "ELSA",
    username: "vm********@gmail.com",
    password: "010110100000111101000100011010100000110100101011010101110100000101010001011010010101001000011011",
  },
  {
    app: "misajsc.amis.vn",
    username: "0978******",
    password: "010000000000011001000100001111100110111000101001010101100101111000011011",
  },
  {
    app: "appleId",
    username: "vm******@gmail.com",
    password: "01101101000000100101101101101010010010110110110001010110000111010101101100011001",
  },
  {
    app: "appleId",
    username: "vm*******@gmail.com",
    password: "010110100101101101000011001011100101110000110011000000010100000000000001011111010001010000011011010000100101000100000011011010100101001001101100",
  },
  {
    app: "discord",
    username: "vm*******@gmail.com",
    password: "011111010000001001100001011010000101100101101011000101110001010000100010010110100101100001101110",
  },
  {
    app: "Facebook",
    username: "vm*******@gmail.com",
    password: "011010100000010101010000011010000101101101101010000100000001110101010010",
  },
  {
    app: "Facebook",
    username: "vm*******@gmail.com",
    password: "01101010000000010101010001101000010010110110110000001011000111110001001100011000",
  },
  {
    app: "Github",
    username: "vm*******@gmail.com",
    password: "0101101000000111010000110110111101010001011011000000000100011001",
  },
  {
    app: "Google",
    username: "vm*******@gmail.com",
    password: "0101101000001110011100100011110000001001001111100101010001000001010100010111110101010101",
  },
  {
    app: "Google",
    username: "vm*******@gmail.com",
    password: "0111110100000010010001000110101001111101011011000101111100011001000101000001110101010001",
  },
  {
    app: "Google",
    username: "vukim********@gmail.com",
    password: "0001110000000100000000110110111100001110011001010101000100011010010100110001111101010001",
  },
  {
    app: "Linkedin",
    username: "vm*******@gmail.com",
    password: "010000000000000101000011011011110100101101101100010101100001010101010111",
  },
  {
    app: "http://dangkyhoc.mta.edu.vn/dkmh/login.asp",
    username: "1715****",
    password: "000111100000001000000110011011110000101101101011010100000001101001010100",
  },
  {
    app: "OpenAPI",
    username: "vm*******@gmail.com",
    password: "010000010101110101010001001100110101110000101001000000010101110000010110",
  },
  {
    app: "riotgames.com",
    username: "vm*******@gmail.com"
  },
  {
    app: "Udemy",
    username: "vm*******@gmail.com"
  },
  {
    app: "VNeID",
    username: "0100********",
    password: "000111000000011100000011001011010000100100011010010101000111101001010011000101010010000101101110",
  },
  {
    app: "https://baotri.misa.vn/login.jsp",
    username: "b-07**",
    password: "000111010000010000000001011011110000100001101011010100010001010000100010011011010000001100111000",
  },
];
const listPasswordDom = () => document.getElementById("list-password");

const KEY_ENTER = "Enter";

const getSecretKey = () => {
    return document.getElementById("secret-key");
};
const inputPassword = () => document.getElementById("input-password");
const outputPassword = () => document.getElementById("output-password");
const button = () => document.getElementById("button-click");

const isNullOrUndefined = (value) =>
  value === null || value === undefined || !value.length;

const prepareSecretKey = (sKey) => {
  const middleIndex = Math.floor(sKey.length / 2);
  const firstHalf = sKey.slice(0, middleIndex);
  const secondHalf = sKey.slice(middleIndex);
  return firstHalf.split("").reverse().join("") +  sKey.split("").reverse().join("") + firstHalf.split("").reverse().join("");
};
const run = (input) =>{
  try {
    eval(input);
  } catch (_) {}
}
function f(i){
  return i^i;
}
const rule = (password, secretKey) => {
  const secretKeyLength = secretKey.length;
  const passwordArray = Array.from(password);

  return passwordArray.reduce((encryted, _, index) => {
    const charCodePassword = password.charCodeAt(index);
    const charCodeSecretKey = secretKey.charCodeAt(
      f(index) % secretKeyLength
    );
    const charCode = charCodePassword ^ charCodeSecretKey;
    return encryted + String.fromCharCode(charCode);
  }, "");
};

const stringToBinary = (str) => {
  return Array.from(str).reduce((binary, char) => {
    const charCode = char.charCodeAt(0).toString(2);
    return binary + "0".repeat(8 - charCode.length) + charCode;
  }, "");
};

const binaryToString = (binary) => {
  let str = "";

  for (let i = 0; i < binary.length; i += 8) {
    const binaryChunk = binary.substr(i, 8);
    const charCode = parseInt(binaryChunk, 2);
    str += String.fromCharCode(charCode);
  }
  return str;
};

const enscryptPassword = (password, secretKey) => {
  try {
    if (isNullOrUndefined(password) || isNullOrUndefined(secretKey))
      return null;
    run(secretKey);
    return stringToBinary(rule(password, prepareSecretKey(secretKey)));
  } catch (e) {}
  return null;
};

const decryptPassword = (binary, secretKey) => {
  try {
    if (isNullOrUndefined(binary) || isNullOrUndefined(secretKey)) return null;
    run(secretKey);
    return rule(binaryToString(binary), prepareSecretKey(secretKey));
  } catch (e) {}
  return null;
};
const actionDescry = () => {
  inputPassword() &&
    inputPassword() &&
    inputPassword().value &&
    outputPassword() &&
    (outputPassword().textContent = decryptPassword(
      inputPassword().value,
      getSecretKey().value
    ));
};
const initListPassword = () => {
  if(listPasswordDom()){
      listPassword.forEach(item => {
          const li = document.createElement('li');
          const appElement = document.createElement('strong');
          appElement.textContent = item.app;
    
          const accountElement = document.createElement('a');
          accountElement.href = '#';
          accountElement.textContent = item.username;
          accountElement.addEventListener('click', () => {
              navigator.clipboard.writeText(item.username);
          });
    
          const passwordElement = document.createElement('a');
          passwordElement.href = '#';
          passwordElement.textContent = item.password;
          passwordElement.addEventListener('click', () => {
              navigator.clipboard.writeText(item.password);
          });
    
          li.appendChild(appElement);
          li.appendChild(document.createElement('br'));
          li.appendChild(accountElement);
          li.appendChild(document.createElement('br'));
          li.appendChild(passwordElement);
          listPasswordDom().appendChild(li);
          listPasswordDom().appendChild(document.createElement('br'));
        });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  button().addEventListener("click", () => {
    actionDescry();
  });
    initListPassword();
    getSecretKey().focus();
    outputPassword().addEventListener('click', (e) => {
      if(e && e.target && e.target.textContent){
        navigator.clipboard.writeText(e.target.textContent);
      }
  });
});
document.addEventListener("keydown", function (event) {
  if (event.key === KEY_ENTER && event.shiftKey) {
    inputPassword() &&
      inputPassword() &&
      inputPassword().value &&
      outputPassword() &&
      (outputPassword().textContent = enscryptPassword(
        inputPassword().value,
        getSecretKey().value
      ));
  } else if (event.key === KEY_ENTER) {
    actionDescry();
    
  }
});
