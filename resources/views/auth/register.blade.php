@extends('layouts.base')

@section('content')
<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="card is-fullwidth">
          <header class="card-header">
            <p class="card-header-title">Register</p>
          </header>

          <div class="card-content">
            <div class="content">
              <form class="control" role="form" method="POST" action="{{ url('/register') }}">
                {{ csrf_field() }}

                <div class="field">
                  <div class="control has-icon">
                    <input class="input {{ $errors->has('name') ? 'is-danger' : '' }}"
                      name="name"
                      value="{{ old('name') }}"
                      type="text"
                      placeholder="Name"
                      required autofocus
                    />

                    <span class="icon is-small">
                      <i class="fa fa-user"></i>
                    </span>

                    @if ($errors->has('name'))
                      <span class="help is-danger">{{ $errors->first('name') }}</span>
                    @endif
                  </div>
                </div>

                <div class="field">
                  <div class="control has-icon">
                    <input class="input {{ $errors->has('email') ? 'is-danger' : '' }}"
                      name="email"
                      value="{{ old('email') }}"
                      type="email"
                      placeholder="Email"
                      required
                    />

                    <span class="icon is-small">
                      <i class="fa fa-envelope"></i>
                    </span>

                    @if ($errors->has('email'))
                      <span class="help is-danger">{{ $errors->first('email') }}</span>
                    @endif
                  </div>
                </div>

                <?php
                $password_error = $errors->hasAny(['password', 'password_confirmation'])
                  ? $errors->first('password') ?? $errors->first('password_confirmation')
                  : ''
                  ;
                ?>

                <div class="field">
                  <div class="control has-icon">
                    <input
                      class="input {{ $password_error ? 'is-danger' : '' }}"
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                    />

                    <span class="icon is-small">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <div class="control has-icon">
                    <input
                      class="input {{ $password_error ? 'is-danger' : '' }}"
                      name="password_confirmation"
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />

                    <span class="icon is-small">
                      <i class="fa fa-lock"></i>
                    </span>

                    @if ($password_error)
                      <span class="help is-danger">
                        {{ $password_error }}
                      </span>
                    @endif
                  </div>
                </div>

                <div class="control">
                  <button class="button is-primary is-fullwidth uppercase" type="submit">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection