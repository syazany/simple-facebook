<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Post $post)
    {
        return $post->likes()->create([]);
    }

    public function destroy(Post $post, Request $request)
    {
        $post->likes()->where(['user_id' => $request->user()->id])->first()->delete();
    }
}
