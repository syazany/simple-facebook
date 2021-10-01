<?php

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPolymorphicFieldsToCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->nullableMorphs('commentable');
        });

        Comment::all()->each(function (Comment $comment) {
            $comment->update(['commentable_type' => Post::class,'commentable_id' => $comment->post_id]);
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign(['post_id']);
            $table->dropColumn(['post_id']);
        });
    }

    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
            //
        });
    }
}
