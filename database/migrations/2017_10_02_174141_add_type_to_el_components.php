<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTypeToElComponents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('el_components', function (Blueprint $table) {
            $table->integer('type')->default(3);
        });

        DB::table('el_components')
            ->where('spec_name', 'INPUT')
            ->update(['type' => 0]);

        DB::table('el_components')
            ->where('spec_name', 'OUTPUT')
            ->update(['type' => 1]);

        DB::table('el_components')
            ->whereIn('spec_name', ['GATE_NOT', 'GATE_OR', 'GATE_AND'])
            ->update(['type' => 2]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('el_components', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
}
