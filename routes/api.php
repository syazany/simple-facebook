<?php

use App\Http\Controllers\API\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function() {

    Route::apiResources([
        'posts' => PostController::class
    ]);

    Route::resource('posts.comments', \App\Http\Controllers\CommentController::class)->only(['index', 'store'])->shallow();
});
