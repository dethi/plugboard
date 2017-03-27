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

        window.GravatarUrl = "{{$gravatar_url}}";
    </script>
</head>
<body>
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
</body>
</html>
