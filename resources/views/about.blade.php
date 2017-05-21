@extends('layouts.landing')

@section('landing_content')


    <!-- Page Content -->
    <div class="container">

        <!-- Introduction Row -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">About Us
                    <small>It's Nice to Meet You!</small>
                </h1>
                <br/>
                <p>
                    PlugBoard est un nouveau support accessible et ludique pour l'électronique.
                </p>
                <p>
                    Plugboard met en avant la progression personnalisée, le partage et la réutilisabilité de composants créés par la communauté.
                </p>
            </div>
        </div>
        <br/>
        <!-- Team Members Row -->
        <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header">Our Team</h2>
            </div>
            <div class="columns">
                <!--  <div class="col-lg-4 col-sm-6 text-center">-->
                <div class="column">
                    <img class="img-responsive img-center" src="{{url('/static/team/chabro.jpg')}}" alt="" height="200" width="200">
                    <h3>Alexande Chabrolin</h3>
                    <p>Le projet qui vous permet de redécouvrir l'électronique et la logique combinatoire !</p>
                </div>
                <div class="column">
                    <!--  <div class="col-lg-4 col-sm-6 text-center">-->
                    <img class="img-responsive img-center" src="{{url('/static/team/cormer.jpg')}}" alt="" height="200" width="200">
                    <h3>Antoine Cormerais</h3>
                    <p>Un projet où la seule limite est votre imagination !</p>
                </div>
                <div class="column">
                    <!--  <div class="col-lg-4 col-sm-6 text-center">-->
                    <img class="img-responsive img-center" src="{{url('/static/team/deutsch.jpg')}}" alt="" height="200" width="200">
                    <h3>Thibault Deutsch</h3>
                    <p>L'oeuvre de ma vie !</p>
                </div>
                <div class="column">
                    <!--  <div class="col-lg-4 col-sm-6 text-center">-->
                    <img class="img-responsive img-center" src="{{url('/static/team/lehuen.jpg')}}" alt="" height="200" width="200">
                    <h3>Arthur Lehuen</h3>
                    <p>Plugboard, le projet où mes rêves de joueurs de Minecraft deviendront réalité !</p>
                </div>
            </div>

        </div>
    </div>
@endsection
