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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// register
Route::post('/register', App\Http\Controllers\Api\RegisterController::class)->name('register');
// login
Route::post('/login', App\Http\Controllers\Api\LoginController::class)->name('login');
// logout
Route::post('/logout', App\Http\Controllers\Api\LogoutController::class)->name('logout');
// middleware auth:api
Route::middleware('auth:api')->group(function () {
    // get user
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('user');

    // get foods
    Route::get('/foods', [App\Http\Controllers\Api\FoodController::class, 'index'])->name('foods');

    // create food
    Route::post('/foods', [App\Http\Controllers\Api\FoodController::class, 'store'])->name('foods.store');
    // get all ready foods
    Route::get('/foods/ready', [App\Http\Controllers\Api\FoodController::class, 'getReadyFoods'])->name('foods.ready');
    // get unready foods
    Route::get('/foods/unready', [App\Http\Controllers\Api\FoodController::class, 'getUnreadyFoods'])->name('foods.unready');
    // get food
    Route::get('/foods/{food}', [App\Http\Controllers\Api\FoodController::class, 'show'])->name('foods.show');
    // update food
    Route::put('/foods/{food}', [App\Http\Controllers\Api\FoodController::class, 'update'])->name('foods.update');
    // delete food
    Route::delete('/foods/{food}', [App\Http\Controllers\Api\FoodController::class, 'destroy'])->name('foods.destroy');

});
