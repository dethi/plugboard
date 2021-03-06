<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth', 'middleware' => ['guest:api']], function () {
    Route::post('/login', 'AuthController@login');
    Route::post('/register', 'AuthController@register');
});

Route::group(['prefix' => 'auth', 'middleware' => ['auth:api']], function () {
    Route::post('/update', 'AuthController@update');
});

Route::group(['prefix' => 'board', 'middleware' => 'auth:api'], function () {
    Route::get('', 'BoardController@index');
    Route::get('{id}', 'BoardController@show');
    Route::post('', 'BoardController@create');
    Route::post('{id}/version', 'BoardController@add_version');
    Route::delete('{id}', 'BoardController@destroy');
});

Route::group(['prefix' => 'objectif'], function () {
    Route::get('', 'ObjectifController@index');
});

Route::group(['prefix' => 'score', 'middleware' => 'auth:api'], function () {
    Route::get('scores', 'ScoreController@getScoresByUser');
    Route::post('', 'ScoreController@setScore');
    Route::post('scores', 'ScoreController@setScores');
});

Route::group(['prefix' => 'component'], function () {
    Route::get('elementaire', 'ComponentController@get_elementaire');
});

Route::group(['prefix' => 'component', 'middleware' => 'auth:api'], function () {
    Route::get('', 'ComponentController@index');
    Route::get('selected', 'ComponentController@get_selected');
    Route::get('shared', 'ComponentController@get_shared');
    Route::get('imported', 'ComponentController@get_imported');
    Route::get('{id}', 'ComponentController@show');
    Route::post('', 'ComponentController@create');
    Route::post('{id}/select', 'ComponentController@select');
    Route::post('{id}/share', 'ComponentController@share');
    Route::post('{id}/version', 'ComponentController@add_version');
    Route::delete('{id}', 'ComponentController@destroy');
    Route::post('import/{id}', 'ComponentController@import');
});


