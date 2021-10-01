<?php

use App\Http\Controllers\API\PostController;
use App\Http\Controllers\CommentController;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\LikeController;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('hello', function() {
//    $result = Comment::has('descendants')
//        ->with(['descendants'])
//        ->get()->toArray();
//
//    dd ($result);
    $result = [2,5,3,3];

    ddd([...$result]);
});

Route::middleware('auth:api')->group(function() {

    Route::apiResources([
        'posts' => PostController::class
    ]);

    Route::resource('posts.comments', CommentController::class)
        ->only(['index', 'store'])
        ->shallow();
    Route::post('posts/{post}/likes', [LikeController::class, 'store']);
    Route::delete('posts/{post}/likes', [LikeController::class, 'destroy']);
});
