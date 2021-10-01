<?php

namespace App\Traits;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;

trait HasComments
{
    public function comments()
    {
        /** @var Model $this */
        return $this->morphMany(Comment::class, 'commentable');
    }
}