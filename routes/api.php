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

Route::group(['prefix' => 'board', 'middleware' => 'auth:api'], function () {
    Route::get('', 'BoardController@index');
    Route::get('{id}', 'BoardController@show');
    Route::post('', 'BoardController@create');
    Route::post('{id}/version', 'BoardController@add_version');
});
