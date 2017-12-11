<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddShareToAll extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
         Schema::table('components', function (Blueprint $table) {
             $table->boolean('share')->default(false);
         });

         Schema::table('boards', function (Blueprint $table) {
            $table->boolean('share')->default(false);
        });
     }
 
     /**
      * Reverse the migrations.
      *
      * @return void
      */
     public function down()
     {
         Schema::table('components', function (Blueprint $table) {
             $table->boolean('share');
         });

         Schema::table('boards', function (Blueprint $table) {
            $table->boolean('share');
        });
     }
}
