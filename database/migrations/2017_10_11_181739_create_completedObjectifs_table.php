<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompletedObjectifsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   public function up()
    {
        Schema::create('completed_objectifs', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')
                ->on('users')->onDelete('cascade');

            $table->integer('objectif_id')->unsigned()->index();
            $table->foreign('objectif_id')->references('id')
                ->on('objectifs')->onDelete('cascade');

            $table->integer('score');
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('completed_objectifs');
    }
}
