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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, explicabo dolores ipsam aliquam inventore corrupti eveniet quisquam quod totam laudantium repudiandae obcaecati ea consectetur debitis velit facere nisi expedita vel?</p>
            </div>
        </div>

        <!-- Team Members Row -->
        <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header">Our Team</h2>
            </div>
            <div class="columns">
                <!--  <div class="col-lg-4 col-sm-6 text-center">-->
                <div class="column">
                    <img class="img-responsive img-center" src="{{url('/media/team/chabro.jpg')}}" alt="" height="200" width="200">
                    <h3>Alexande Chabrolin</h3>
                    <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
                </div>
                <div class="column">
                    <!--  <div class="col-lg-4 col-sm-6 text-center">-->
                    <img class="img-responsive img-center" src="{{url('/media/team/cormer.jpg')}}" alt="" height="200" width="200">
                    <h3>Antoine Cormerais</h3>
                    <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
                </div>
                <div class="column">
                    <!--  <div class="col-lg-4 col-sm-6 text-center">-->
                    <img class="img-responsive img-center" src="{{url('/media/team/deutsch.jpg')}}" alt="" height="200" width="200">
                    <h3>Thibault Deutsch</h3>
                    <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
                </div>
                <div class="column">
                    <!--  <div class="col-lg-4 col-sm-6 text-center">-->
                    <img class="img-responsive img-center" src="{{url('/media/team/lehuen.jpg')}}" alt="" height="200" width="200">
                    <h3>Arthur Lehuen</h3>
                    <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
                </div>
            </div>

        </div>
    </div>
@endsection
