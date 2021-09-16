window.addEventListener('DOMContentLoaded', function() {
  
    const UserText = document.getElementById('text-to-work'); // достаю ввод пользователя
    const UserSelectStap = document.getElementById('encrypt-step'); // выбор сдвига
    let UserStep = Number(UserSelectStap.value); // преобразую ввод сдвига в число
    const result = document.getElementById('output'); // Вывод результата
    const Encrypt = document.getElementById('encrypt-btn'); // зашифровать
    const Decrypt = document.getElementById('decrypt-btn'); // дешифровать
    const Reset = document.getElementById('btn-reset'); // очистить
    let TextToWork; // переменная для работы с вводом по клику
    let pos; // позиция элемента для дешифровки
    
    const OtherSymbols = [' ',',','.',':',';','!','?','-','_','=','+','(',')','[',']','@','`',"'",'"','<','>','|','/','%','$','^','&','*','~'];
    const Numbers = ['0','1','2','3','4','5','6','7','8','9'];
    const RusAlfUp = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
    const RusAlfLower = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
    const EngAlfUp = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const EngAlfLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','m','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    let RusAlfUpEncrypt = Array(33);
    let RusAlfLowerEncrypt = Array(33);
    let EngAlfUpEncrypt = Array(26); 
    let EngAlfLowerEncrypt = Array(26);

    let NumbersEncrypt = Array(10);
    
    initEncrypt();
    
    UserSelectStap.addEventListener('change', function() {
      UserStep = Number(this.value);
      initEncrypt();
    });
    
    function initEncrypt() {
      RusAlfUpEncrypt = CezarEncrypt(UserStep, RusAlfUp);
      RusAlfLowerEncrypt = CezarEncrypt(UserStep, RusAlfLower);
      NumbersEncrypt = CezarEncrypt(UserStep, Numbers);
      EngAlfUpEncrypt = CezarEncrypt(UserStep, EngAlfUp);
      EngAlfLowerEncrypt = CezarEncrypt(UserStep, EngAlfLower);
    }

    
    function CezarEncrypt(step, arr) {
      let CopyAlf = arr.slice();
      let i = 0;
      
      while ((i + step) < (CopyAlf.length)) {
        let buff = CopyAlf[i];
        CopyAlf[i] = CopyAlf[i + step];
        CopyAlf[i + step] = buff;
        i++;     
      }
      return CopyAlf;
    }
    
    
    function contains(symb, arr) {
      var letter = symb;
      pos = 0;
      for (let i = 0; i < arr.length; i++) {
        if (letter === arr[i]) {
          pos = i;
          return true;
          break;
        }
      }
    }
    
    function encrypt(text) {
      let result = '';
      for (let i = 0; i <= text.length; i++) {
        let symbol = text[i];
        if (contains(symbol, OtherSymbols)) {
          result += symbol;
        }
        if (contains(symbol, Numbers)) {
          symbol = NumbersEncrypt[pos];
          result += symbol;
        }
        if (contains(symbol, RusAlfUp)) {
            symbol = RusAlfUpEncrypt[pos];
            result += symbol;
        }
        if ((contains(symbol, RusAlfLower))) {
            symbol = RusAlfLowerEncrypt[pos];
            result += symbol;
        }
        if (contains(symbol, EngAlfUp)) {
            symbol = EngAlfUpEncrypt[pos];
            result += symbol;
        }
        if ((contains(symbol, EngAlfLower))) {
            symbol = EngAlfLowerEncrypt[pos];
            result += symbol;
        }
      }
      return result;
    }
    
    function decrypt(text) {
      let result = '';
      for (let i = 0; i <= text.length; i++) {
        let symbol = text[i];
        if (contains(symbol, OtherSymbols)) {
          result += symbol;
        }
        if (contains(symbol, NumbersEncrypt)) {
          symbol = Numbers[pos];
          result += symbol;
        }
        if (contains(symbol, RusAlfUpEncrypt)) {
            symbol = RusAlfUp[pos];
            result += symbol;
        }
        if ((contains(symbol, RusAlfLowerEncrypt))) {
            symbol = RusAlfLower[pos];
            result += symbol;
        }
        if (contains(symbol, EngAlfUpEncrypt)) {
            symbol = EngAlfUp[pos];
            result += symbol;
        }
        if ((contains(symbol, EngAlfLowerEncrypt))) {
            symbol = EngAlfLower[pos];
            result += symbol;
        }
      }
      return result;
    }
  
    Encrypt.addEventListener('click', function() {
      TextToWork = UserText.value;
      result.value = encrypt(TextToWork);
    });
    Decrypt.addEventListener('click', function() {
      TextToWork = UserText.value;
      result.value = decrypt(TextToWork);
    });
    Reset.addEventListener('click', function() {
      UserText.value = '';
      result.value = '';
    });
    
  });