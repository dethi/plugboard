@extends('layouts.base')

@section('content')
  <section class="hero is-fullheight is-dark">
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
              <a class="nav-item">
                About
              </a>
              <a class="nav-item">
                FAQ
              </a>
              <a class="nav-item">
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

    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns">
          <div class="column">
            <h1 class="title is-1">
              It's time to learn combinatory logic
            </h1>
            <h2 class="subtitle is-4">
              Create, assemble, share.
            </h2>
            <a class="button is-medium is-primary uppercase" href="{{action('AppController@index')}}">
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <div class="container">
        <div class="tabs is-centered">
          <ul>
            <li><a>Copyright {{date('Y')}} Plugboard</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
@endsection