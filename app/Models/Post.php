<?php

namespace App\Models;

use App\Traits\HasComments;
use App\Traits\HasUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    use HasUser;
    use HasComments;

    protected $fillable = ['content', 'user_id'];

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function likedByUser()
    {
        return $this->hasOne(Like::class)
            ->where('user_id', optional(auth()->user())->id);
    }
}
