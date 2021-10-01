<?php

namespace App\Models;

use App\Traits\HasComments;
use App\Traits\HasUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    use HasUser;
    use HasComments;

    protected $fillable = ['content'];

    public function commentable()
    {
        return $this->morphTo();
    }
}
