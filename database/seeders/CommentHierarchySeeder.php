<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentHierarchySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0; $i < 5; $i++) {
            foreach(Comment::all() as $comment) {
                Comment::factory()->create(['commentable_type' => get_class(new Comment()), 'commentable_id' => $comment->id]);
            }
        }
    }
}
