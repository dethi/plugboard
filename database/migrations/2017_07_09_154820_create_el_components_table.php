<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateElComponentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('el_components', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 30);
            $table->string('spec_name', 30);
            $table->integer('nbInput');
            $table->integer('nbOutput');
            $table->integer('dimX');
            $table->integer('dimY');
            $table->string('color', 10);
            $table->string('truth_table')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('el_components');
    }
}
