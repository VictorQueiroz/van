<html ng-app="app">
  <head>
    <title>Van</title>

    <meta name="description" content="Eu sou seu amigo... Ou não.">
    <meta name="keywords" content="victor queiroz,van,inteligência articial,ai,html,js,laravel,4,php,css">
    <meta name="author" content="Victor Queiroz">

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <title>Van - I am your friend.</title>

    <script type="text/javascript" src="/js/base.min.js"></script>

    <link rel="stylesheet" type="text/css" href="/css/style.css">

    <style type="text/css">
      .fa {
        margin-right: 2px;
      }
    </style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
    @section('topbar')
    <div class="container">
      <div class="sixteen columns">
        <div class="van-logo">
          Van
        </div>
      </div>
    </div>
    <div class="container">
      <div class="sixteen columns">
        <nav class="topbar">
          <button class="topbar-collapse">
            <i class="collapse-icon"></i>
          </button>

          <ul class="topbar-left">
            <li><a href="#home"><i class="fa fa-home fa-lg"></i> Início</a></li>
            <li><a href="https://github.com/victorqueiroz/van"><i class="fa fa-github fa-lg"></i> Github</a></li>
            <li><a href="#"><i class="fa fa-facebook fa-lg"></i> Facebook</a></li>
            <li><a href="#"><i class="fa fa-bookmark fa-lg"></i> Sobre</a></li>
          </ul>

          <ul class="topbar-right">
          @if(Auth::check())
            <li><a href="#profile">{{Auth::getUser()->login_name}}</a></li>
          @if(Permission::find(Auth::getUser()->id)->permission == 2)
            <li><a href="#adm/index">Administração</a></li>
          @endif
          @else
            <li><a href="#login"><i class="fa fa-key fa-lg"></i> Conectar-se</a></li>
            <li><a href="#register"><i class="fa fa-pencil fa-lg"></i> Registrar-se</a></li>
          @endif
          </ul>
        </nav>
      </div>
    </div>
    @show

    @section('container')
      @section('content')
        <div ng-view></div>
      @show
    @show

    @section('footer')
      <div class="container">
        <div class="sixteen columns">
          <footer class="footer">
            Desenvolvido por Victor Queiroz 
          </footer>
        </div>
      </div>
    @show
  </body>
</html>