<?php

namespace App\Models;

use App\Traits\HasComments;
use App\Traits\HasUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\LaravelAdjacencyList\Eloquent\HasRecursiveRelationships;

class Comment extends Model
{
    use HasRecursiveRelationships;
    use HasFactory;
    use HasUser;
    use HasComments;

    protected $fillable = ['content'];

    public function commentable()
    {
        return $this->morphTo();
    }

    public function getParentKeyName()
    {
        return 'commentable_id';
    }
}
