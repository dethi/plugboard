<?php

use Illuminate\Database\Seeder;
use App\Objectif;

class ObjectifsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $objectif = new Objectif();
        $objectif->title = 'Porte Non-ET';
        $objectif->description = 'Réalisez une porte non-et';
        $objectif->nbInput = 2;
        $objectif->nbOutput = 1;
        $objectif->truth_table = '[[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 0]]';
        $objectif->save();
    }
}
