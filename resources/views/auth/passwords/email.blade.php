@extends('layouts.base')

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
              <form class="control" role="form" method="POST" action="{{ route('password.email') }}">
                {{ csrf_field() }}
                <div class="field">
                  <div class="control has-icon">
                    <input class="input {{ $errors->has('email') ? 'is-danger' : '' }}"
                          name="email"
                          value="{{ $email or old('email') }}"
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
                  <div class="control">
                    <button class="button is-primary is-fullwidth uppercase" type="submit">Send Password Reset Link</button>
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
