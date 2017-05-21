<div class="hero-head">
    <div class="container">
        <nav class="nav">
            <div class="container">
                <div class="nav-left">
                    <a class="nav-item" href="{{action('PageController@index')}}">
                        <img src="/static/Plugboard-White.png" alt="Plugboard">
                    </a>
                </div>
                <span class="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>
                <div class="nav-right nav-menu">
                    <a class="nav-item" href="{{action('AboutController@index')}}">
                        About
                    </a>
                    <a class="nav-item">
                        FAQ
                    </a>
                    <a class="nav-item" href="{{action('ContactController@index')}}">
                        Contact
                    </a>
                    <span class="nav-item">
                <a class="button is-default" href="{{action('Auth\LoginController@login')}}">
                  Login
                </a>
              </span>
                </div>
            </div>
        </nav>
    </div>
</div>