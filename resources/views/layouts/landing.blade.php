@extends('layouts.master')

@section('content')
    <div id="landing">
        <section class="hero is-fullheight is-dark">

            @include('layouts.partials._navbar')

            @yield('landing_content')

            @include('layouts.partials._footer')
        </section>
    </div>
@endsection