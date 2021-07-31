<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\PostCreateRequest;
use App\Http\Resources\Post\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        return PostResource::collection($request->user()->posts()->paginate());
    }

    public function store(PostCreateRequest $request)
    {
        return new PostResource($request->user()->posts()->create([$request->validated()]));
    }

   public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(PostCreateRequest $request, Post $post)
    {
        return new PostResource(tap($post)->update($request->validated()));
    }

    public function destroy(Post $post)
    {
        $post->delete();
    }
}