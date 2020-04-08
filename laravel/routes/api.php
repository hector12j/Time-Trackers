<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/tasks', function (Request $request) {
//     return $request->task();
// });

Route::group(['guard' => 'api'], function () {
    Route::group(['prefix' => 'v1'], function () {
    	Route::group(['prefix' => 'tasks'], function () {
	    	Route::get('/', 'TaskController@index');
			Route::get('/time', 'TaskController@tasksWithTime');
			Route::post('/', 'TaskController@create');
    	});
    	Route::group(['prefix' => 'trackers'], function () {
	    	Route::get('/', 'TimeTrackerController@index');
			Route::post('/', 'TimeTrackerController@create');
			// Route::put('/', 'TaskController@update');
			// Route::delete('/{id}', 'TaskController@delete');
			// Route::get('/{id}', 'TaskController@show');
    	});
    });
});