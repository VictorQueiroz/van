<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');

Route::get('/answers', function(){
	return Response::json(Answer::all()->toArray());
});

Route::get('/conversations', function(){
	return Response::json(Conversation::all()->toArray());
});

Route::group(array('before' => 'guest'), function(){
	Route::post('/user/store', 'UsersController@store');
	Route::post('/user/auth', 'UsersController@auth');
});

Route::group(array('before' => 'auth.adm'), function(){
	Route::get('/check/permission', function(){ return Response::json(Permission::find(Auth::getUser()->id)->toArray()); });
});