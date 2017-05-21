@extends('layouts.master')

@section('content')
<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="card is-fullwidth">
          <header class="card-header">
            <p class="card-header-title">Reset Password</p>
          </header>

          @if (session('status'))
            <div class="notification is-success">
              {{ session('status') }}
            </div>
          @endif

          <div class="card-content">
            <div class="content">
              <form class="control" role="form" method="POST" action="{{ route('password.request') }}">
                {{ csrf_field() }}

                <input type="hidden" name="token" value="{{ $token }}">

                <div class="field">
                  <div class="control has-icon">
                    <input class="input {{ $errors->has('email') ? 'is-danger' : '' }}"
                          name="email"
                          value="{{ old('email') }}"
                          type="email"
                          placeholder="Email"
                          required autofocus
                    />

                    <span class="icon is-small">
                      <i class="fa fa-envelope"></i>
                    </span>

                    @if ($errors->has('email'))
                      <span class="help is-danger">{{ $errors->first('email') }}</span>
                    @endif
                  </div>
                </div>

                <div class="field">
                  <div class="control has-icon">
                    <input class="input {{ $errors->has('password') ? 'is-danger' : '' }}"
                          name="password"
                          type="password"
                          placeholder="Password"
                          required
                    />

                    <span class="icon is-small">
                      <i class="fa fa-lock"></i>
                    </span>

                    @if ($errors->has('password'))
                      <span class="help is-danger">{{ $errors->first('password') }}</span>
                    @endif
                  </div>
                </div>

                <div class="field">
                  <div class="control has-icon">
                    <input class="input {{ $errors->has('password_confirmation') ? 'is-danger' : '' }}"
                          name="password_confirmation"
                          type="password"
                          placeholder="Confirm Password"
                          required
                    />

                    <span class="icon is-small">
                      <i class="fa fa-lock"></i>
                    </span>

                    @if ($errors->has('password_confirmation'))
                      <span class="help is-danger">{{ $errors->first('password_confirmation') }}</span>
                    @endif
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <button class="button is-primary is-fullwidth uppercase" type="submit">Reset Password</button>
                  </div>
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