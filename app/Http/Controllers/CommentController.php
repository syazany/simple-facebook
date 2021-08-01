<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\CommentCreateRequest;
use App\Http\Resources\Comment\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Post $post)
    {
        return CommentResource::collection(response()->json($post->comments()->with(['user'])->get()));
    }

    public function store(Post $post, CommentCreateRequest $request)
    {
        return $post->comments()->create($request->validated());
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();
    }
}
