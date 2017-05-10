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

// 'middleware' => 'auth:api'
Route::group(['prefix' => 'boards'], function () {
    Route::get('', 'BoardController@index');
    Route::get('{id}', 'BoardController@show');
    Route::post('', 'BoardController@store');
    Route::post('{id}/versions', 'BoardController@add_version');
});
