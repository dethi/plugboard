<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="favicon.png">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Styles -->
  <link href="{{ mix('vendor.css') }}" rel="stylesheet">

  <!-- Scripts -->
  <script defer src="{{ mix('manifest.js') }}"></script>
  <script defer src="{{ mix('vendor.js') }}"></script>
  <script defer src="{{ mix('app.js') }}"></script>

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <script>
    window.Laravel = {!! json_encode([
      'csrfToken' => csrf_token(),
    ]) !!};

    window.GravatarUrl = "{{ $gravatar_url }}";
  </script>
</head>
<body>

<div id="app">
  <nav class="nav has-shadow app-main-nav">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item">
          <img src="/static/Plugboard-Green.png" alt="Plugboard logo">
        </a>
      </div>
      <div class="nav-right nav-menu">
        @if (Auth::guest())
          <a class="nav-item is-tab" href="{{ action('Auth\RegisterController@register') }}">
            Register
          </a>
          <a class="nav-item is-tab" href="{{ action('Auth\LoginController@login') }}">
            Login
          </a>
        @else
          <a class="nav-item is-tab">
            <figure class="image is-24x24" style="margin-right: 8px;">
              <img src="{{$gravatar_url}}">
            </figure>
            Profile
          </a>

          <a class="nav-item is-tab" href="{{route('logout')}}"
              onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
              Log out
          </a>
          <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
          </form>
        @endif
      </div>
    </div>
  </nav>

  <div id="root">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <span class="icon is-large">
            <i class="fa fa-spinner fa-pulse"></i>
          </span>
        </div>
      </div>
    </section>
  </div>
</div>
</body>
</html>
