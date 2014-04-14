app.controller('UserRegisterCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.success=false;

  $scope.submit = function () {
    $scope.success=false;

    $http.post('/user/store', {
      login_name: $scope.login_name,
      email: $scope.email,
      password: $scope.password
    }).success(function(data){
      if(data.success == undefined || data.success == null) {
        $scope.errors = data;
      } else {
        $scope.success = true;
      }
    });
  }
}]);

app.controller('ChatCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
  $scope.messages = [{answer: 'E aí, cara. Fala algo comigo!', author_name: 'Van', author_id: 0}];

  /* Respostas que já foram dadas ao usuário. */
  $scope.answers = [];

  /* Se o sistema está esperando por uma confirmação do usuário. */
  var waitingConfirmation = 0;
  
  /*
    Vai no banco de dados e faz um query para retirar todas
    as respostas e armazenar nesta variável.
  */
  $http.get('/answers').success(function(data){
    answers = [];
    angular.copy(data, answers);
  });

  $scope.sendMessage = function (message) {
    var $input = document.getElementById('message-box');
    $input.value='';
    $input.select();
    
    var $chat_box = document.getElementById('chat-box');
    $chat_box.scrollTop = $chat_box.scrollHeight;

    if(message == null || message == '')
      return false;

    /* Adiciona o texto enviado pelo usuário. */
    addMessage({answer: message});

    /*
      Adiciona a resposta para a pergunta
      feita pelo usuário.
    */
    var response = calcAnswer(message); // Processa a resposta de acordo com o texto digitado pelo usuário.
    var answer = {};
    angular.copy(response, answer);

    /*
      Caso a resposta tenha o caractere \ significa
      que esta resposta pode ser retornada de várias maneiras.

      Então nós quebramos a resposta a cada \ e selecionamos
      randômicamente a resposta que retornaremos.
    */
    if(answer.answer.search('//') > -1) {
      var resps = answer.answer.split('//');
      var index = Math.floor(Math.random() * resps.length);

      answer.answer = resps[index];
    }

    /*
      Caso a resposta tenha o caractere | entre o
      texto de retorno, significa que ela será
      enviada por mais de uma vez, ou seja, ele
      quebra a resposta a cada | e passa a adicionar
      de acordo com o ponteiro do for().
    */
    if(answer.answer.search('|') > -1) {
      var answrs = answer.answer.split('|');

      for(var i in answrs)
        addMessage({id: response.id, author_id:0, answer: answrs[i]});
    }
    else
      addMessage(answer);
  }

  var addMessage = function(message) {
    if(message.id>0) {
      message.author_id=0;
      message.author_name='Van';
    }
    else
      message.author_name='Você';

    $scope.messages.push(message);
  }

  /* Procura keyword em array. */
  findInArray = function (array, keyword) {
    for(var i in array) {
      var key = array[i];

      if(key == keyword)
        return true;
    }

    return false;
  }

  /* Esta parte do script calcula uma boa resposta para o usuário. */
  var calcAnswer = function (message) {
    var ret;
    var words = message.split(/[\.,-\/#!$%\^&\*;:{}=\-_`~()\s]/g);
    words = fixWords (words);

    if(waitingConfirmation > 0 && findInArray(words, 'sim')) {
      ret = getAnswerById(waitingConfirmation);
      waitingConfirmation = 0;
    } else {
      ret = compareKw(answers, words);

      if(ret.yes > 0)
        waitingConfirmation = ret.yes;
    }

    return ret;
  }

  /*
    Esta função compara todas as palavras-chave de todas as respostas
    armazenadas no banco de dados e compara com @words.

    A cada palavra de compatibilidade, um ponto de similaridade é adicionado
    a resposta, a cada palavra não encontrada, um ponto é descontado.
  */
  var compareKw = function (answers, words) {
    for(var i in answers) {
      if(answers[i] instanceof Object) {
        var answer = answers[i];

        answer.similarity=0;
        answer.dissimilarity=0;
        
        /* Listando palavras-chave. */
        var keywords=answer.keywords.split('|');
        for(var ind in keywords) {
          var kw = keywords[ind];

          /*
            Listando palavras digitadas pelo usuário
            para testar a compatibilidade entre as duas arrays.
          */
          for(var index in words) {
            var wrd = words[index];

            /*
              Se a palavra do ponteiro atual que foi digitada pelo usuário, for igual a
              palavra atual que está no banco de dados de palavras-chave da resposta do
              ponteiro atual.
            */
            if(wrd == kw)
              answer.similarity++;
            else
              answer.dissimilarity++;
          }
        }
      }
    }

    return chooseAnswer(answers);
  }

  /* Deleta palavras repetidas, se elas forem escritas uma após a outra. (Exemplo: 'qual qual qual qual qual') */
  /* Retira todas as abreviações das palavras, ou seja, substitui 's' por 'sim', 'n' por 'não'*/
  var fixWords = function (words) {
    /*
      Se a próxima palavra for igual a esta palavra atual, ela será ignorada
      pelo contador.
    */
    for(var i in words) { 
      var word = words[i];

      var next_i = parseInt(i) + parseInt(1);
      var nextWord = words[next_i];

      if(nextWord != undefined) {
        if(nextWord == word)
          words.splice(words.indexOf(nextWord), 1);
      }

      /* Limpa todas as abreviações das palavras. */
      switch(word) {
        case 'n':
        case 'ñ':
        case 'nao':
        case 'no':
        case 'nops':
          words[i] = 'não';
          break;
        case 'si':
        case 's':
        case 'yes':
        case 'yep':
        case 'yeah':
          words[i] = 'sim';
          break;
        case 'vc':
        case 'vs':
          words[i] = 'você';
          break;
        case 'pq':
        case 'pk':
        case 'puq':
          words[i] = 'porque';
          break;
      }
    }
    return words;
  }

  /* Query functions. */
  var getAnswerById = function (id) {
    for(var i in answers) {
      var obj = answers[i];

      if(obj.id==id) {
        return obj;
      }
    }

    return false;
  }

  /*
    Escolhe a resposta com maiores pontos de similaridade.
  */
  var chooseAnswer = function (answers) {
    var high = {similarity: 0, dissimilarity: 0};

    for(var i in answers) {
      var answer = answers[i];

      if(
        answer.similarity > high.similarity
      ) {
        high = answer;
      } else if (high.similarity == 0 && high.answer == null)
        high = answer;
      else if (i == answers.length && high.answer == null)
        high = answer;
    }

    if (high.similarity<1 && high.dissimilarity>0 && i == answers.length - 1)
      high = getAnswerById(100);

    return high;
  }
}]);