<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHelpToObjectifsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('objectifs', function (Blueprint $table) {
              $table->text('help')->nullable();
        });

         DB::table('objectifs')
            ->where('id', '<=', '4')
            ->update(['help' => 'http://infoindustrielle.free.fr/Logique/Combi_pdf/Cours/Cours_06_32-42.pdf']);

              DB::table('objectifs')
            ->where('id', '>', '4')
            ->update(['help' => 'http://infoindustrielle.free.fr/Logique/Combi_pdf/Cours/Cours_10_69-81.pdf']);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('objectifs', function (Blueprint $table) {
             $table->dropColumn('help');
        });
    }
}
