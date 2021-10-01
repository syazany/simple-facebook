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

        for($j = 0; $j < 20 ; $j++) {

            $comment = Comment::factory()->create();
            $comment2 = Comment::factory()
                ->create(['commentable_type' => get_class(new Comment()), 'commentable_id' => $comment->id]);

            for ($i = 0; $i < 5; $i++) {
                $comment2 = Comment::factory()
                    ->create(['commentable_type' => get_class(new Comment()), 'commentable_id' => $comment2->id]);
            }
        }

        Comment::has('descendants')
            ->with(['descendants'])
            ->get();
    }
}
