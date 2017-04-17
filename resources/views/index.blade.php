@extends('layouts.landing')

@section('landing_content')

    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title is-1 is-spaced">
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

@endsection
