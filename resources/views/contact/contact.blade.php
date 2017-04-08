@extends('layouts.base')

@section('content')
<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="card is-fullwidth">
          <header class="card-header">
            <p class="card-header-title">Contact</p>
          </header>

          <div class="card-content">
            <div>
              @if(Session::has('message'))
                <div class="alert alert-info">
                  {{Session::get('message')}}
                </div>
              @endif
            </div>
            <div class="content">
              <form class="control" role="form" method="POST" action="{{ url('/contact') }}" id="contact_form">
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
                    <input class="input {{ $errors->has('subject') ? 'is-danger' : '' }}"
                      name="subject"
                      value="{{ old('subject') }}"
                      type="text"
                      placeholder="Subject"
                      required autofocus
                    />

                    @if ($errors->has('subject'))
                      <span class="help is-danger">{{ $errors->first('subject') }}</span>
                    @endif
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <textarea class="textarea {{ $errors->has('message') ? 'is-danger' : '' }}"
                      form="contact_form"
                      name="message"
                      placeholder="Enter your message here..."
                      required autofocus
                    >{{ old('message') }}</textarea>

                    @if ($errors->has('message'))
                      <span class="help is-danger">{{ $errors->first('message') }}</span>
                    @endif
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <button class="button is-primary is-fullwidth uppercase" type="submit">Send</button>
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
