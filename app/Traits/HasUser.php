<?php


namespace App\Traits;


use App\Models\User;

trait HasUser
{
    public static function bootHasUser()
    {
        static::creating(function ($model) {
           $model->user_id = auth()->user()->id;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}