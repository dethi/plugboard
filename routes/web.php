<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'PageController@index');
Route::get('/app', 'AppController@index');
Route::get('/contact', 'ContactController@get')->name('contact');
Route::post('/contact', 'ContactController@post');
Route::get('/about', 'AboutController@index');
